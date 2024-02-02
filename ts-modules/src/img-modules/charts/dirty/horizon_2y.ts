import { ChartBarHorizonY2, ChartFocus } from '@local/elements';
import { flattenColumn } from '@local/d3-services';
import { filterWeeks, getNeededColumnsForHistoryV2  } from '@local/img-services';

import { HtmlLegendDotsLines } from '@local/elements';
import { GraphControllerV2 } from '@local/d3_graphs';
import { IGraphMapping,  DataPart, GraphData } from '@local/d3_types';
import * as d3 from 'd3';
import { breakpoints } from '@local/styleguide';

export default class Horizon2Y extends GraphControllerV2   {

    y2Parameter;
    y3Parameter;
    chartBars;
    chartFocus;
    legend;

    constructor(
        public main: any,
        public data : any,
        public element : HTMLElement,
        public mapping: IGraphMapping,
        public segment: string  
    ) {
        super(main,data,element,mapping,segment);
        this.pre();
    }

    pre() {

        this._addScale('x','linear','horizontal','_index');
        this._addScale('y','linear','vertical', flattenColumn(this.mapping.parameters[1][0]['column']));
        this._addScale('y2','linear','vertical', flattenColumn(this.firstMapping['column']));
        this._addAxis('x','x','bottom','yearly');
        this._addAxis('y','y','left');
        
        if (window.innerWidth > breakpoints.sm ) {
            this._addAxis('y2','y2','left');
            this._addPadding(0,0,60,0);
            this._addMargin(80,30,20,0);
        
        } else {
            this._addMargin(20,0,0,0);
            this._addPadding(0,0,30,0);
        }
        
        
    }

    init() {

        let self = this;

        this._init();

        const svgId = "svg-wrapper-" + this.mapping.slug
        const container = document.createElement('section');
        container.style.height = "400px";
        container.style.width = "100%";
        container.id = svgId;
        this.element.appendChild(container);

        this._svg(container)

        // this.parameters.y2 = this.mapping.parameters[0][1].column;
        // afgehandeld
        this.parameters.y3 = flattenColumn(this.mapping.parameters[0][1].column);
        // ves aanvragen
        this.parameters.y4 = flattenColumn(this.mapping.parameters[0][2].column);
        // ves besluiten
        this.parameters.y5 = flattenColumn(this.mapping.parameters[0][3].column);

        this.chartBars = new ChartBarHorizonY2(this);
        this.legend = new HtmlLegendDotsLines(this);
        this.chartFocus = new ChartFocus(this);
    
        this.update(this.data,this.segment, false);
    }

    prepareData(data: DataPart[]) : GraphData  {

        const neededColumns = getNeededColumnsForHistoryV2(data,this.mapping)
        let history = filterWeeks(data,neededColumns);

        history = history.filter( (w) => {
            
            return w[this.parameters.y] > 0 || w[this.parameters.y2] > 0;

        });

        let voorraad_bij_eind = history[0][flattenColumn(this.mapping.parameters[1][0].column)];

        history.forEach( (week, i) => { 

            week['_index'] = i;
            
            week['diff'] = week[this.parameters.y] - week[this.y2Parameter]
            week['relative_diff'] = voorraad_bij_eind - week[flattenColumn(this.mapping.parameters[1][0].column)]
            
        });

        return {
            "history" : history.slice(0, history.length),
            "latest" : data[0], 
            "slice" :  history.slice(0, history.length).reverse(),
            "average" : this.average(history)
        } 
    }

    redraw(data: GraphData) {

        const yValues = data.slice.map( d => d[this.parameters.y] * 1.2);

        this.scales.y.set(yValues,0);

        const y2Values = data.slice.map( d => d[this.parameters.y2] * 1);
        const y3Values = data.slice.map( d => -d[this.parameters.y3] * 1);

        this.scales.y2.set(y2Values,d3.min(y3Values));

        super.redraw(data);

        this.scales.y.scale.range([this.dimensions.height / 3, 0]);
        
        let offset = this.scales.y.fn(0) - this.scales.y2.fn(0); // 0 positie van scales.y? 

        this.scales.y2.scale.range([(this.dimensions.svgHeight)+ offset, offset]);

        for (let a of this.config.axes) {
            this.axes[a.slug].redraw(this.dimensions,this.scales[a.scale].scale, data.slice)
        }

        this.axes.x.axisGroup
            .attr("transform", "translate(" + 0 + "," + (this.scales.y.fn(0)) + ")");

        if (window.innerWidth > breakpoints.sm ) {

            this.axes.y.axisGroup
                .attr("transform", "translate(" + -60 + "," + 0 + ")");

        } else {

            this.axes.y.axisGroup
                .attr("transform", "translate(" + -0 + "," + 0 + ")");
        }

        this.chartBars.redraw(data);

        this.chartFocus.redraw(data);

    }

    draw(data: GraphData) {

        const xValues = data.slice.map(d => d[this.parameters.x]);

        this.scales.x.set([xValues[xValues.length - 1] - 1], xValues[0]);
        this.chartBars.draw(data);
        this.chartFocus.draw(data);

    }

    update(data: GraphData, segment: string, update: boolean) {
        super._update(data,segment,update);
    }

    average(data: any[]) : number {

        data = data.filter( (d) => d[this.parameters.y] > 0)

        return (data.reduce((a,b) => { return a + parseInt(b[this.parameters.y]); },0)) / (data.length);
    }
}
