
export interface IDataService {
    fetch: (string) => Promise<any>
}


const DOMAIN = "http://ssr_attestations:3011";
const APIBASE = "";


export class DataService implements IDataService{

    _collection = {};

    constructor () {

    }


    async fetch(attestation_cid: string) : Promise<any> {

        return new Promise ( async (resolve, reject) => {

                const endpoint = "/eas?cid=" + attestation_cid;

                // @ts-ignore
                const url = DOMAIN + APIBASE + endpoint;

                const response = await fetch(url);

                if(response.ok) {
                    resolve(response.json())
                } else {
                    reject()
                }
            
        });
        
    }
}