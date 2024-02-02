
import { ChartStackedBarsNormalized } from '@local/elements';
import * as d3 from 'd3';
import _ from 'lodash';
import { HtmlLegendDots } from "@local/elements";
import { parseGroups } from '@local/d3-services';
import { GraphControllerV2 } from '@local/d3_graphs';
import { IGraphMapping, DataPart, GraphData  } from '@local/d3_types';

export default class NormalisedBars extends GraphControllerV2  {

    keys : string[];
    labels : string[];
    legend;
    chartMultiBars;
    chartAxisGrid;
    chartStackedBarsNormalized;
    normalizedStack;
    stack;

    constructor(
        public main: any,
        public data : any,
        public element : HTMLElement,
        public mapping: IGraphMapping,
        public segment: string  
    ){
        super(main,data,element,mapping,segment) 
        this.pre();
    }

    pre(){
        this._addScale('x','linear','horizontal', 'group');
        this._addScale('y','band','vertical-reverse', 'group');
        this._addMargin(0,30,0,0);
        this._addPadding(0,0,0,0);
    }

    init() {

        let self = this;

        this.config.paddingInner = .5;
        this.config.paddingOuter = .5;

        super._init();

        const svgId = "svg-wrapper-" + this.mapping.slug
        const container = document.createElement('section');
        container.style.height = "280px";
        container.style.width = "100%";
        container.id = svgId;
        this.element.appendChild(container);

        super._svg(container);

        this.chartStackedBarsNormalized = new ChartStackedBarsNormalized(this);
        
        this.legend = new HtmlLegendDots(this);
        
        this.update(this.data, this.segment, false);
    }

    prepareData(data: DataPart[]) : GraphData {

        const grouped = parseGroups(this.mapping, data)

        // voor y-axis ... we groeperen op tijdsduur (=group .. duh) 
        this.labels = grouped.map( g => g.label);
       //  keys for stacking dit zijn de procedurestappen 
        this.keys = Object.keys(grouped[0]).filter( k => k != 'label');

        this.normalizedStack = d3.stack()
            .offset(d3.stackOffsetExpand)
            .keys(this.keys);

            console.log(this.keys);

            console.log(grouped);

        return { 
            "history" : null,
            "latest":  null, 
            "slice" : null,
            "grouped": grouped,
            "stacked": this.normalizedStack(grouped)
        };

        // serie is grouping for stacked --> ontvangst, opname, etc -- niet de data groepering
        // rijen corresponderen met data groupings 

    }

    draw(data: GraphData) {

        // with data we can init scales
        this.scales.x.set([0,1]);
        // we need one system for yscale ..
        this.scales.y.set(this.labels);
        // width data we can draw items
        this.chartStackedBarsNormalized.draw(data);

    }

    redraw(data: GraphData) {

       super.redraw(data);

       this.chartStackedBarsNormalized.redraw();
    }

    update(data: GraphData, segment: string, update: boolean) {
        super._update(data,segment,update);
    } 
}
