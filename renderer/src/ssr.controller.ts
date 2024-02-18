import puppeteer from 'puppeteer-core';
import { ConsoleMessage, Page, JSHandle } from 'puppeteer';
import chalk from 'chalk';
import { html } from './html.factory'
//import { BucketService, IBucketService } from './bucket.service';
import fs from 'fs';

interface Size {
    width: number,
    height: number
}

export interface IRenderer {
    create: (cid: string, flavor: string) => void,
    window: Window
}

export class SsrController implements IRenderer {

    window
    frame

    constructor() { }

    // describe = (jsHandle) => {
    //   return jsHandle.executionContext().evaluate((obj) => {
    //     // serialize |obj| however you want
    //     return `OBJ: ${typeof obj}, ${obj}`;
    //   }, jsHandle);
    // }
  

    async create(raw_eas: any, flavor: string) : Promise<any> {

      const size = [1910,1000];
      const frameSlug = "runV1";
      const _html = html(frameSlug, JSON.stringify(raw_eas));

      try {

        let browser = await puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3000' });
        let page = await browser.newPage();

        await page.setViewport({
          width: size[0],
          height: size[1],
          deviceScaleFactor: 1,
        });

        await page.setContent(_html, {
          timeout: 3000,
          waitUntil: 'networkidle0' // | 'networkidle2'
        });

     
        const img =  `${frameSlug}/${raw_eas.sig.uid}.png`
        await fs.writeFileSync(`/opt/images/${img}`, await page.screenshot(),'binary');

        return { image : img };
      } 


      catch(error) {
          return { error };
      }

      

    }
}