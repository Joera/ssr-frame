import { IGroupCtrlr, IGroupMappingV2 } from "./interfaces";
import * as d3 from 'd3';

export class GroupControllerV1 implements IGroupCtrlr{

    slug;
    segment


    constructor(
        public frame: any,
        public config: IGroupMappingV2,
        public index: number,
    ){
        this.slug = config.slug;
        this.segment = config.segment;
        window.d3 = d3;
    }


    html (htmlContainer: HTMLElement) : HTMLElement {

        const element =  document.createElement("article");
        element.classList.add('group')
        element.style.position = "absolute";
        element.style.top = "0";
        element.style.bottom = "0";
        element.style.height = "100%";
        element.style.width = "100%";
        // element.style.display = "flex";
        // a.style.background = "#dded4e";
        htmlContainer.appendChild(element);
        return element;
        
    }



    prepareData(data: any) {

        return data;
    } 

    draw(data) {

    }

    async update (newData: any, segment: string, update: boolean) {

        const self = this;

        const data = self.prepareData(newData);
        // //  needed within multiples .. why ??? 
        const preparedData = Object.assign({}, data);

        await self.draw(preparedData);

    }



}