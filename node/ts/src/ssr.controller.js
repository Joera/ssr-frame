import { JSDOM } from 'jsdom';
import { html, createGraphGroupElement } from './html.factory';
import { DataService } from '../../../ts-modules/src/img-modules/services';
import { weekFs2 } from '../../../ts-modules/src/configs';
import { BucketService } from './bucket.service';
import fs from 'fs';
// import { generateImage } from "jsdom-screenshot";
import { takeImage, setGlobalOptions } from 'jsdom-to-image'; // ../../node_modules/jsdom-to-image/dist/src/index.js';
export class SsrController {
    data;
    bucket;
    createGraphGroupElement;
    window;
    constructor() {
        this.data = new DataService(this);
        this.bucket = new BucketService();
        this.createGraphGroupElement = createGraphGroupElement;
    }
    async create(week, size) {
        const _size = [800, 300];
        this.window = (new JSDOM(html, { pretendToBeVisual: true })).window;
        global.document = this.window.document;
        global.window = this.window;
        const htmlContainer = this.window.document.querySelector("[data-img-graph-preset='dashboard']");
        const renderedhtml = await this.data.call(null, weekFs2, 'all', false, htmlContainer, _size);
        console.log(renderedhtml);
        //  const r = await fs.writeFileSync('../svg/jsdom.html',renderedhtml)
        // const svg = this.window.document.querySelector('svg');
        // const fileData = svg.outerHTML;
        // await this.bucket.writeFile(fileData,"test.svg");
        // const r = await       fs.writeFileSync('../svg/test.svg',fileData,null)
        // let response = await convert('../svg/test.svg',"../svg/test.png");
        // const fileStream = fs.createReadStream("../svg/test.png");
        // await this.bucket.writeFile(fileStream,"test.png");
        // to gif
        //to svg
        setGlobalOptions({
            connectOptions: {
                browserWSEndpoint: 'ws://localhost:9090',
            }
        });
        try {
            const imgBuffer = await takeImage({ selector: '[data-img-graph-preset="dashboard"]' });
            const rr = await fs.writeFileSync('../rendered/screenshot.png', imgBuffer, 'binary');
            await this.bucket.writeFile('../rendered/screenshot.png', "test.png");
        }
        catch (error) {
            console.log(error);
        }
        //    
        //     
    }
}
