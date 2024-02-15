
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

    async fetch(_attestation: any) : Promise<any> {
  
      let a = new Attestation();
      a.mock();

      if(a.verify()) {

          const data = a.data();
          let activity = {};
        
          for (let prop of data) {
              activity[prop["name"]] = prop.type == 'uint64' ? Number(prop.value.value) : prop.value.value;
          };

          return { 
            activity
          };

      } else {
        return "could not verify attestation"
      }
    }
}