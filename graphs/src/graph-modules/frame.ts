import { GroupObject } from "./interfaces";
import * as d3 from "d3";

export interface IFrameController {
    init: (config, group, graphs, htmlContainer, data) => void;
}

export class FrameCtrlr implements IFrameController {

    frameConfig: any[] = [];

    constructor() {}

    async init(config, groups, graphs, htmlContainer, data) {

      //  this.renderer.window.d3 = d3;

        for (let mapping of config) {

            let j = 0; 

            const group: GroupObject = {
                slug: mapping.slug,
                splice: mapping.splice,
                ctrlr: new groups[mapping.ctrlr](this, data, mapping, j),
                graphs: [],
                config: mapping,
                element: null,
                data: {}
            }

            group.element = group.ctrlr.html(htmlContainer);

            let i = 0;

            for (const graph of mapping.graphs) {

              group.graphs.push({
                slug : graph.slug,
                multiples: graph.multiples == undefined || !graph.multiples ? false : graph.multiples,
                ctrlrName: graph.ctrlr,
                mapping: graph.parameters,
                ctrlr : new graphs[this, graph.ctrlr](graph.slug, this, group, graph.parameters, i)
              }) 
            
              i++;

            } 

            j++; 

            this.frameConfig.push(group) 
        }
      
        this.prepareData(data);
        this.initGroups(htmlContainer);
        this.initGraphs();

    }

    prepareData(data) {

        for (const group of this.frameConfig) {
            group.data = group.ctrlr.prepareData(data);
        }
    }

    initGroups(htmlContainer: HTMLElement) {
       
        for (const group of this.frameConfig) {
            if (group.ctrlr == null ) return;
            group.ctrlr.init(htmlContainer);
        }
    }

    initGraphs() {
       
        for (const group of this.frameConfig) {
            for (const graph of group.graphs) {
                if (graph.ctrlr == null ) return;
                graph.ctrlr.html();
                graph.ctrlr.init();
            }
        }
    }

}