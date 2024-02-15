import { GroupControllerV1 } from "../../../graphs/src/graph-modules/group";
import { IGroupMappingV2 } from "../../../graphs/src/graph-modules/interfaces";
import { DataObject } from "../../../graphs/src/graph-modules/types_graphs";
import { ElevationIcon } from "../elements/elevation-icon";
import { MainNumbers } from "../elements/main-numbers";
import { SingleHeader } from "../elements/single-header";
import { TypeIcon } from "../elements/type-icon";


export class RunGroupV1 extends GroupControllerV1 { 

    main;
    header;
    typeIcon;
    elevationIcon;

    constructor(
        public page: any,
        public data: any,
        public config: IGroupMappingV2,
        public index: number
    ){
        super(page,config, index);
    }

    async init(htmlContainer: HTMLElement) {

        const groupEl = super.html(htmlContainer)
        groupEl.classList.add("graph-container-grid");
        groupEl.style.backgroundColor = "#f4f2d2";

        this.typeIcon = new TypeIcon(groupEl, window)
        this.header = new SingleHeader(groupEl, window)
        this.elevationIcon = new ElevationIcon(groupEl, window)
        this.main = new MainNumbers(groupEl, window)

        this.update(this.data,this.segment, false);

    }

    prepareData(data: any) : any {

        // let activity = {} 
        
        // for (let prop of data) {
        //     activity[prop["name"]] = prop.value.value
        // };

        // return {
        //     activity
        // }

        return data;
    }

    draw(data) {

        this.header.draw(data.activity);
        this.typeIcon.draw(data.activity);
        this.elevationIcon.draw(data.activity);
        this.main.draw(data.activity);
    }

    async update(data: DataObject, segment: string, update: boolean) {

        super.update(data,segment,update)
    }  
}
