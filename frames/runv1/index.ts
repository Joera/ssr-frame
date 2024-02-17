import { config } from "./config";
import groups from "./groups";
import graphs from "./graphs";
import { FrameCtrlr } from  "../../graphs/src/graph-modules/frame";
import { DataService } from "../../graphs/src/graph-modules/data.service";

const data = new DataService();
const frame = new FrameCtrlr();
const size = [1910,1000];

class Main {
    
    constructor(){}

    async run(raw_eas: any) {

        const htmlContainer = window.document.querySelector("[data-graph-preset='frame']") as HTMLElement;
        htmlContainer.style.width = size[0].toString + 'px';
        htmlContainer.style.height = size[1].toString + 'px';

        let d = await data.verifyAndParse(raw_eas);

        await frame.init(
            config, 
            groups, 
            graphs, 
            htmlContainer, 
            d
        );

        console.log('finished')

    }
}

const main = new Main();
