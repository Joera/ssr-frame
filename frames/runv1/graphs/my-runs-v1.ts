import { breakpoints } from "../../../graphs/src/graph-modules/_styleguide";
import { GraphControllerV3 } from "../../../graphs/src/graph-modules/core/graph-v3";
import { IGroupMappingV2, IGroupCtrlr, GroupObject } from "../../../graphs/src/graph-modules/interfaces";
import { IFrameController } from "../../../graphs/src/graph-modules/frame";
import { Bars, DataObject } from "../../../graphs/src/graph-modules/types_graphs";
import { ChartBarsBandRounded } from "../elements/chart-bars-band-rounded";

const graphHeight = 360;

// can this be a wrapper for multiple graphcontrollers?
export class MyRunsV1 extends GraphControllerV3 {

    main;
    bars;

    constructor(
        public slug:  string,
        public frame: IFrameController, 
        public group: GroupObject, 
        public mapping: IGroupMappingV2,
        public segment: string, 
        public index: number
    ){
        super(slug, frame, group, mapping) 
        this.pre();
    }

    pre() {

        
        this._addMargin(0,0,0,0);
        this._addPadding(0,0,0,0);

        this._addScale('x','band','horizontal-reverse','local_time');
        this._addScale('y','linear','vertical-reverse','moving_time');

    
        // this._addAxis('x','x','bottom');
        // this._addAxis('y','y','left');
    }

    html() {

        this.graphEl = super._html();

        this.graphEl.style.position = 'relative';
        this.graphEl.style.display = 'block';
        this.graphEl.style.gridRow = '10 / span 3';
        this.graphEl.style.gridColumn = '2 / span 10';
        
    }

    async init() {

        
        await super._init();

        if (this.graphEl != null) super._svg(this.graphEl);

        this.config.paddingInner = .05;
        this.config.paddingOuter = 0

        this.bars = new ChartBarsBandRounded(this);
        
        this.update(this.group.data,this.segment, false);

        return;
    }

    prepareData(data: DataObject): DataObject {

            data.bars = [];

            for (let a of data.comparison) {

                data.bars.push(
                    {
                        label: a.title,
                        xValue: a.local_time,
                        yValue: a[this.mapping[0][0].column],
                        colour: "white",
                        selected: a.local_time == data.activity.local_time ? true : false 
                    }
                )
            }

            console.log(data);

            return data;
    }

    async draw(data: any) {


        this.scales.x.set(data.bars.map( (d) => d.xValue));
        this.scales.y.set(data.bars.map( (d) => d.yValue).concat([0]));
        
        this.bars.draw(data.bars);
    }


    async redraw(data: any, range: number[]) {
    
        await super.redraw(data);    
        this.bars.redraw(this.dimensions);
    }

    
    async update(data: any, segment: string, update: boolean, range?: number[]) {

       await super._update(data,segment,update, range);
    } 
}
