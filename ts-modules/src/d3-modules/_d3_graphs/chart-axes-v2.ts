import { localTime } from '@local/d3-services';
import * as d3 from "d3";
import { getMonthFromNumber} from "@local/img-services";
import { convertToCurrency } from '@local/d3-services';
import { Dimensions } from '@local/d3_types';
import { DataPart, GraphData } from '@local/d3_types';
import { breakpoints } from '@local/styleguide';

export default class ChartAxesV2 {

    axis;
    axisGroup;

    constructor(
        private ctrlr,
        private config
    ) {
        this.draw();
    }

    draw () {

        this.axisGroup = this.ctrlr.svg.layers.axes.append("g");

        switch (this.config.position) {

            case 'bottom' :
            case 'belowBottom':

                this.axisGroup
                    .attr('class', 'x-axis');

                this.axis = d3.axisBottom(this.ctrlr.scales[this.config.scale]);

                break;

            case 'center' :

                this.axisGroup
                    .attr('class', 'x-axis');

                this.axis = d3.axisBottom(this.ctrlr.scales[this.config.scale]);

                break;

            case 'top' :

                this.axisGroup
                    .attr('class', 'x-axis');

                this.axis =  d3.axisTop(this.ctrlr.scales[this.config.scale]);

                break;

            case 'left' :

                this.axisGroup
                    .attr('class', 'y-axis');

                this.axis = d3.axisLeft(this.ctrlr.scales[this.config.scale]);

                break;

            case 'right' :

                this.axisGroup
                    .attr('class', 'y-axis');

                this.axis = d3.axisRight(this.ctrlr.scales[this.config.scale]);

                break;

            default :

                return false;
        }
    }

    redraw(dimensions: Dimensions, scale: any, data: DataPart[]) {

           switch (this.ctrlr.scales[this.config.scale].config.type) {

               case 'band' :

                   this.axis
                       .tickFormat( (d,i) => {
                          return (this.ctrlr.config.extra.axisInMonths) ? getMonthFromNumber(d) : d;
                       })
                   break;

               case 'linear' :

                    if (this.config.format === "percentage") {

                        this.axis
                        .ticks(5)
                        .tickFormat( d => d + "%")

                    } else if (this.config.format === "currency") {

                        this.axis
                        .ticks(4)
                        .tickFormat( d => convertToCurrency(d))

                    // } else if (this.config.format === 'monthly') {

                    //     let months = [];
                    //     let ticks = [];

                    //     for (let w of data) {
                    //         if (months.indexOf(w._month) < 0)  {
                    //             months.push(w._month);
                    //             ticks.push(w["_index"]);
                    //         } else {
                    //            console.log(w._date + "-" + w._month);
                    //         }
                    //     };

                    //     console.log(ticks);

                    //     this.axis
                    //         .tickValues(ticks)
                    //         .tickFormat( (d, i) => {
                    //             console.log(d);
                    //             let week = data.find( (w) => w['_index'] == d);
                    //             return week._month;
                    //         });
                    //     break;
                        
                    } else if (this.config.format === 'quarterly') {

                        let starts = data.filter( (w) => [1,14,,27,40].indexOf(w._week) > -1 ).map( (w) => w['_index']);

                        this.axis
                            .tickValues(starts)
                            .tickFormat( (d, i) => {
                                let week = data.find( (w) => w['_index'] == d);
                                if (week) {
                                    return /* 'w' + week['_week'] + ' ' +  */ 'w' + week['_week'] + ' - ' + week['_year']
                                }
                            });
                        break;

                    } else if (this.config.format === 'yearly') {

                        let starts = data.filter( (w) => [1].indexOf(w._week) > -1 ).map( (w) => w['_index']);

                        this.axis
                            .tickValues(starts)
                            .tickFormat( (d, i) => {
                                let week = data.find( (w) => w['_index'] == d);
                                if (week) {
                                    return week['_year']
                                }
                            });
                        break;

                    } else if (this.config.format === 'weekly') {

                    //    let starts = data.filter( (w) => [1].indexOf(w._week) > -1 ).map( (w) => w['_index']);

                        data = data.slice(0,data.length -2);

                        this.axis
                            .tickValues(data.filter( (d,i) => i % 2).map( (d) => d['_index']))
                            .tickFormat( (d, i) => {

                                    // if (window.innerWidth < breakpoints.sm) {

                                    //     if(i % 2) {

                                    //         let week = data.find( (w) => w['_index'] == d);
                                    //         return  'w' + week['_week'];
                                    //     }


                                    // } else {

                                        let week = data.find( (w) => w['_index'] == d);
                                        if (week) {
                                            return  'w' + week['_week'];
                                        }

                                    // }


                                    
                            });
                        break;

                    } else {

                        this.axis
                            .ticks(4);
                    }

                   break;


               case 'time' :

                   let tickOrder, tickSpread;

                //    if(this.ctrlr.config.extra.xScaleTicks === 'quarterly') {

                       tickOrder = 'timeMonth';
                       tickSpread = (window.innerWidth < breakpoints.sm) ? 12 : 3;

                //    } else {

                //        tickOrder = this.ctrlr.config.extra.xScaleTicks;
                //        
                //    }

                   this.axis
                       .ticks(d3[tickOrder].every(tickSpread))
                       .tickFormat( date => (d3.timeYear(date) < date) ? localTime.format('%b')(date) : localTime.format('%Y')(date));

                   break;

               case 'bandTime' :

                   this.axis
                       .ticks(d3[this.ctrlr.config.extra.xScaleTicks].every(1))
                       .tickFormat( date => localTime.format('%d %b')(new Date(date)));
                   break;

               case 'stacked' :

                   this.axis
                       .ticks(10, "%");
                   break;

               case 'stackedNormalized' :

                   this.axis
                       .ticks(10, "%");
                   break;

               default :
           }

            switch (this.config.position) {

                case 'bottom' :

                    this.axisGroup
                        .attr("transform", "translate(" + 0 + "," + (dimensions.height) + ")")
                    break;

                case 'belowBottom' :

                    this.axisGroup
                        .attr("transform", "translate(" + 0 + "," + (dimensions.height + 0) + ")")
                    break;

                case 'top' :

                    this.axisGroup
                        .attr("transform", "translate(" + 0 + "," + 0 + ")");
                    break;

                case 'left' :

                    this.axisGroup
                        .attr("transform", "translate(" + 0 + "," + 0 + ")");
                    break;

                case 'right' :

                    this.axisGroup
                        .attr("transform", "translate(" + (dimensions.width + this.ctrlr.config.padding.right) + "," + 0 + ")");
                    break;

                default :
            }

            this.axisGroup
                .transition()
                .duration(1000)
                .call(this.axis.scale(scale));

            if(this.ctrlr.mapping.args && this.ctrlr.mapping.args[0] === "alternateTicks") {

                if (window.innerWidth < breakpoints.sm) {

                    this.ctrlr.svg.layers.axes.selectAll("g.x-axis g.tick text")
                    .attr("text-anchor","end")
                    .attr("transform","translate(-10,0) rotate(-45)")
                    // .attr("dy", (d,i) => {
                    //     return (i % 2 == 0 ) ? 16 : 32
                    // } );


                } else {

                    this.ctrlr.svg.layers.axes.selectAll("g.x-axis g.tick text")
                    .attr("dy", (d,i) => {
                        return (i % 2 == 0 ) ? 16 : 32
                    } );
                }

                
            }

            if(['weekly','monthly','quarterly','yearly'].indexOf(this.config.format) > -1) {

                const offset = (this.ctrlr.dimensions.width / data.length) / 2;

                this.ctrlr.svg.layers.axes.selectAll("g.x-axis g.tick text")
                    .attr("dx", offset);

                this.ctrlr.svg.layers.axes.selectAll("g.x-axis g.tick line")
                    .attr("x1", offset)
                    .attr("x2", offset)
                ;
            }
    }
}

