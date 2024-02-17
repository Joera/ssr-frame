
export interface IDataService {
    verifyAndParse: (string) => Promise<any>
}


const DOMAIN = "http://ssr_attestations:3011";
const APIBASE = "";


export class DataService implements IDataService{

    _collection = {};

    constructor () {}

    async verifyAndParse(raw_eas: any) : Promise<any> {

        return new Promise ( async (resolve, reject) => {

                const endpoint = "/eas";

                // @ts-ignore
                const url = DOMAIN + APIBASE + endpoint;

                fetch(url, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(raw_eas)
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {
                    resolve(result);
                })
                .catch (function (error) {
                    reject(error);
                });            
        });
        
    }
}