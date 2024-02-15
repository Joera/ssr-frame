import { breakpoints } from "../../../graphs/src/graph-modules/_styleguide";
import { GraphControllerV3 } from "../../../graphs/src/graph-modules/core/graph-v3";
import { IGroupMappingV2, IGroupCtrlr, GroupObject } from "../../../graphs/src/graph-modules/interfaces";
import { IFrameController } from "../../../graphs/src/graph-modules/frame";
import { DataObject } from "../../../graphs/src/graph-modules/types_graphs";
import { SingleHeader } from "../elements/single-header";
import { TypeIcon } from "../elements/type-icon";
import { ElevationIcon } from "../elements/elevation-icon";
import { MainNumbers } from "../elements/main-numbers";

const graphHeight = 360;

// can this be a wrapper for multiple graphcontrollers?
export class RunV1 extends GraphControllerV3 {

    main;
    header;
    typeIcon;
    elevationIcon;

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

        const bottom = window.innerWidth < breakpoints.sm ? 120 : 90;
        
        // this._addMargin(0,bottom,0,0);
        // this._addPadding(40,60,30,0);

        // this._addScale('x','band','horizontal','year');
        // this._addScale('y','linear','vertical','value');
    
        // this._addAxis('x','x','bottom');
        // this._addAxis('y','y','left');
    }

    html() {


     //   if(this.frame.element == null ) return;

        this.graphEl = super._html();

        this.graphEl.style.width = "100%";
        this.graphEl.style.height = "100%";
        
    }

    async init() {

        
        await super._init();

        if (this.graphEl != null) super._svg(this.graphEl);

        // this.typeIcon = new TypeIcon(this.graphEl, this.frame.renderer.window)
        // this.header = new SingleHeader(this.graphEl, this.frame.renderer.window)
        // this.elevationIcon = new ElevationIcon(this.graphEl, this.frame.renderer.window)
        // this.main = new MainNumbers(this.graphEl, this.frame.renderer.window)
        
        this.update(this.group.data,this.segment, false);

        return;
    }

    prepareData(data: DataObject): DataObject {

     //   data.graph = data.graphs[this.index];

        // let activity = {} 
        
        // for (let prop of data) {
        //     activity[prop["name"]] = prop.value.value
        // };

        // return {
        //     activity
        // }
    }

    async draw(data: any) {

        // this.header.draw(data.activity);
        // this.typeIcon.draw(data.activity);
        // this.elevationIcon.draw(data.activity);
        // this.elevationIcon.draw(data.activity);
        // this.main.draw(data.activity);

        // this.scales.x.set(data.graph.map( (d) => d.year));
        // this.scales.y.set(data.graph.map( (d) => d.value).concat([0]));
        
        // this.bars.draw(data.graph);
    }


    async redraw(data: any, range: number[]) {
    
        await super.redraw(data.activity);    
      //  this.bars.redraw(this.dimensions);
    }

    
    async update(data: any, segment: string, update: boolean, range?: number[]) {

       await super._update(data,segment,update, range);
    } 
}
