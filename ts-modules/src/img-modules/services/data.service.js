import * as d3 from "d3";
import { graphs } from "@local/charts";
export class DataService {
    ctrlr;
    data;
    graphMethods = {};
    constructor(ctrlr) {
        this.ctrlr = ctrlr;
    }
    async call(params, pageConfig, segment, update, htmlContainer, size) {
        const promises = this._createDashboardCalls(pageConfig, segment, false);
        await Promise.all(promises).then(async (values) => {
            const { weekData, muniData } = this._mergeArrayObjects(values);
            const data = weekData;
            for (let graphMapping of pageConfig) {
                const element = this.ctrlr.createGraphGroupElement(graphMapping, this.ctrlr.window, htmlContainer);
                console.log(graphMapping.graph);
                this.graphMethods[graphMapping.slug] = new graphs[graphMapping.graph](this.ctrlr, data, element, graphMapping, segment, size);
                await this.graphMethods[graphMapping.slug].init();
            }
        });
        return htmlContainer.innerHTML;
    }
    _createDashboardCalls(pageConfig, segment, update) {
        let self = this;
        let promises = [];
        let uniqueEndpoints = [...Array.from(new Set(pageConfig.map((o) => o.endpoint)))];
        // @ts-ignore
        const domain = process.env.DOMAIN;
        // @ts-ignore
        const apibase = process.env.APIBASE;
        for (let endpoint of uniqueEndpoints) {
            if (endpoint) {
                const url = 'https://' + domain + apibase + endpoint + '?gemeente=eq.all';
                console.log(url);
                promises.push(new Promise((resolve, reject) => {
                    d3.json(url)
                        .then((data) => {
                        resolve(data);
                    })
                        .catch((err) => {
                        console.log('api call failed');
                        console.log(err);
                    });
                }));
            }
        }
        return promises;
    }
    _mergeArrayObjects(arrays) {
        const eemsdelta = ['Appingedam', 'Delfzijl', 'Loppersum'];
        let weekData = [];
        let muniData = [];
        // uitzondering for Grid
        if (arrays.length > 0) {
            // hoe herken ik arrays met alle gemeentes
            const arraysWithWeeks = arrays.filter(a => a.length < 2 || a[0].gemeente === a[1].gemeente || eemsdelta.indexOf(a[0].gemeente));
            const arraysWithMunis = arrays.filter(a => a.length > 1 && a[0]._week === a[1]._week);
            // make sure data are merged into array with most weeks ..
            arraysWithWeeks.sort(function (a, b) {
                return b.length - a.length;
            });
            arraysWithWeeks[0].map((item, i) => {
                let o = {};
                if (arraysWithWeeks.length > 1) {
                    for (let i = 1; i < arraysWithWeeks.length; i++) {
                        let objectToMerge = arraysWithWeeks[i].find(object => object.gemeente === item.gemeente && object._date === item._date);
                        o = Object.assign(o, item, objectToMerge);
                    }
                }
                else {
                    o = item;
                }
                weekData.push(o);
            });
            if (arraysWithMunis && arraysWithMunis.length > 0) {
                let recentWeeksOnly = arraysWithMunis[0].filter(o => o['_week'] === arraysWithMunis[0][0]['_week']);
                if (recentWeeksOnly && recentWeeksOnly.length > 0) {
                    recentWeeksOnly.map((item, i) => {
                        let o = {};
                        if (arraysWithMunis.length > 1) {
                            for (let i = 1; i < arraysWithMunis.length; i++) {
                                let objectToMerge = arraysWithMunis[i].find(object => object._date === item._date);
                                o = Object.assign(o, item, objectToMerge);
                            }
                        }
                        else {
                            o = item;
                        }
                        muniData.push(o);
                    });
                }
            }
            // muniData = this.createMapDataForEemsdelta(muniData);
        }
        return { weekData, muniData };
    }
}
