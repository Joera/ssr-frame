import puppeteer from 'puppeteer-core';
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

    async create(_attestation: any, flavor: string) : Promise<void> {

      const size = [1910,1000];

      const frameSlug = "runV1";
  
      const attestation_cid  = "QmTaNZCue4Y8rSVCe5btdwccK8e37LxdgTQgSGW94Si4Cy"

      const _html = html(frameSlug, attestation_cid);

      try {

        let browser = await puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3000' });
        let page = await browser.newPage()

        await page.setViewport({
          width: size[0],
          height: size[1],
          deviceScaleFactor: 1,
        });

        await page.setContent(_html, {
          timeout: 5000,
          waitUntil: 'networkidle0' // | 'networkidle2'
        });
        await fs.writeFileSync(`/opt/images/${frameSlug}/${attestation_cid}.png`, await page.screenshot(),'binary');
      }

      catch(error) {
          console.log(error);
      }
}