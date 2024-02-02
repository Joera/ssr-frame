import * as _ from "lodash";
import { ChartAvgLine, ChartBackgroundAreas, ChartRaggedLine, ChartGridMonth } from '@local/elements';
import { HtmlCircle } from '@local/elements';
import { getNeededColumnsForHistory, getNeededColumnsForHistoryV2, groupByMonths} from "@local/img-services";
import { GraphControllerV2 } from "@local/d3_graphs";
import { IGraphMapping, DataPart, GraphData  } from "@local/d3_types";
import { flattenColumn } from "@local/d3-services";

export default class CijfersMonths extends GraphControllerV2  {

    chartLine;
    chartBackgroundAreas;
    chartGrid;
    chartAvgLine;
    htmlCircle;

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

    pre() {

        this._addScale("x","time","horizontal","_date");
        this._addScale("y","linear","vertical",flattenColumn(this.mapping.parameters[0][1].column))
        this._addPadding(0,0,0,0);
        this._addMargin(0, 0,10,10);
    }

    init() {

        super._init();

        // create svg elements without data
        this.chartLine = new ChartRaggedLine(this);
        this.chartBackgroundAreas = new ChartBackgroundAreas(this);
        this.chartGrid = new ChartGridMonth(this);
        this.chartAvgLine = new ChartAvgLine(this);
        this.htmlCircle = new HtmlCircle(this);

        this.htmlCircle.draw();

        const svgId = "svg-wrapper-" + this.mapping.slug
        const container = document.createElement('section');
        container.style.height = "100px";
        container.style.width = "100%";
        container.style.marginBottom = '3rem';
        container.id = svgId;
        this.element.appendChild(container);

        super._svg(container);

        this.config.extra.decimal = true;
      
        if(this.data.map( (i) => i[this.firstMapping['column']]).filter( (i) => i !== null && i !== undefined).length > 2) {
            this.chartAvgLine.draw();
        }

        this.update(this.data,this.segment,false);
    }

    prepareData(data: DataPart[]) : GraphData  {

        const neededColumns = getNeededColumnsForHistoryV2(data, this.mapping);
        const history = groupByMonths(data,neededColumns);

        this.main.dataStore.setGraph(this.mapping.slug, history)

        return { 
            "history" : history,
            "latest" : data[0], 
            "slice" : history.slice(0,8), 
        };
    }

    redraw(data: GraphData) {

        super.redraw(data);

        this.htmlCircle.redraw([data.latest],this.firstMapping['column']);

        if (data.slice.map( (i) => i[this.firstMapping['column']]).filter( (i) => i !== null && i !== undefined).length > 2) {

            this.chartBackgroundAreas.redraw(data.slice, this.firstMapping['colour']);
            this.chartGrid.redraw(data.slice, this.firstMapping['colour']);
            this.chartLine.redraw(data.slice, this.firstMapping['colour']);
            this.chartAvgLine.redraw(data);
        }
    }

    draw(data: GraphData) {

        this.scales.x.set(data.slice.map(d => d[this.parameters.x]));
        const minValue = (this.config.extra.period === 'monthly') ? 7 : 0
        this.scales.y.set(data.history.map( d => d[this.parameters.y]), minValue);

        if(data.slice.map( (i) => i[this.firstMapping['column']]).filter( (i) => i !== null && i !== undefined).length > 2) {
            this.chartBackgroundAreas.draw(data.slice);
            this.chartLine.draw(data.slice);
            this.chartGrid.draw(data.slice);
        }

        // this.popup.attachData([data.latest])

    }

    update(data: GraphData, segment: string, update: boolean) {

        super._update(data,segment,update);

    }
}
