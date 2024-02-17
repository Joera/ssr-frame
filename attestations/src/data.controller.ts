
import fs from 'fs';
import { Attestation } from './attestation.service';

interface Size {
    width: number,
    height: number
}

export interface IDataCtrlr {

}

export class DataController implements IDataCtrlr {

    constructor() {}

    async fetch(raw_eas: any) : Promise<any> {

      console.log(raw_eas);
  
      let a = new Attestation(raw_eas);

      console.log(a.receipt());

      if(a.verify()) {

          const activity = a.data();
      
          let comparison = await a.attestations(a.receipt()["sig"]["message"]["recipient"])
          
          return { 
            activity,
            comparison
          };

      } else {
        return { error : "could not verify attestation" }
      }
    }
}