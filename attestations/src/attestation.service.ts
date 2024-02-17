import { EAS, PartialTypedDataConfig, Offchain, OffchainAttestationVersion, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { request, gql } from 'graphql-request'

const singleWorkout = "string title,string sport_type,string type,uint64 moving_time,uint64 distance,string average_speed,uint64 elevation_gain,string timezone,string local_time,uint64 utc_time,string map,bool strava_single_activity,string data_source";

export class Attestation {

    _provider
    _contract;
    _receipt;
    _schemaEncoder;

    constructor (raw_eas: any) {

        this._receipt = raw_eas;
        this._schemaEncoder = new SchemaEncoder(singleWorkout);
        this._contract = new EAS("0x4200000000000000000000000000000000000021");
        this._provider = ethers.getDefaultProvider("base",{ 'alchemy' : 'qDWSiMn6X92Ir6sHkz2E85wO22dUt60Y'});
        this._contract.connect(this._provider);
    }

    async attestations(recipient) {

        console.log(recipient)

        const query = gql`
        query Attestations($where: AttestationWhereInput) {
            attestations(where: $where) {
                attester
                decodedDataJson
                isOffchain
                ipfsHash
                schemaId
                timeCreated
                time
                txid
            }
        }
        `

    // address needs to be forced to lowercase! 

        const vars = {
            "where": {
              "AND": [
                {
                  "recipient": {
                    "equals": recipient
                               
                  }
                },
                {
                  "schemaId": {
                    "equals": "0x48d9973eb6863978c104f85dc6864e827fc0f72c4083dd853171e0bf034f8774"
                  }
                }
              ]
            }
          }
        
        const res = await request('https://base.easscan.org/graphql', query, vars);

        const activities = [];

        for (let a of res["attestations"]) {

            activities.push(
                this.parseActivityData(JSON.parse(a.decodedDataJson))
            )
        }

        return activities; 

    }

    async getAttestation(uid: string) {
        
        // DOES NOT WORK
        this._receipt = await this._contract.getAttestation(uid)
      
    }

    mock () {

        this._receipt = {"signer":"0x77a3b79a2De700AfcfC761fED837a67D7d8fAe1B","sig":{"domain":{"name":"EAS Attestation","version":"1.0.1","chainId":8453,"verifyingContract":"0x4200000000000000000000000000000000000021"},"primaryType":"Attest","message":{"recipient":"0xb6ca51ca72c689b720235aca37e579f821fa05ee","expirationTime":0,"time":1706791801,"revocable":true,"version":1,"nonce":0,"schema":"0x48d9973eb6863978c104f85dc6864e827fc0f72c4083dd853171e0bf034f8774","refUID":"0xaa56fc2757acbcbb010dbd6dd132f66eb9ac37e5cf67896c6057670ede35d958","data":"0x00000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000015040000000000000000000000000000000000000000000000000000000000003e8f0000000000000000000000000000000000000000000000000000000000000260000000000000000000000000000000000000000000000000000000000000000d00000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000002e00000000000000000000000000000000000000000000000000000018d4a76fee8000000000000000000000000000000000000000000000000000000000000032000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000340000000000000000000000000000000000000000000000000000000000000000a4d69646461676c6f6f7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000352756e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000352756e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005322e393737000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c28474d542b30313a303029204575726f70652f416d7374657264616d000000000000000000000000000000000000000000000000000000000000000000000014323032342d30312d32375431313a32383a34395a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000067374726176610000000000000000000000000000000000000000000000000000"},"types":{"Attest":[{"name":"version","type":"uint16"},{"name":"schema","type":"bytes32"},{"name":"recipient","type":"address"},{"name":"time","type":"uint64"},{"name":"expirationTime","type":"uint64"},{"name":"revocable","type":"bool"},{"name":"refUID","type":"bytes32"},{"name":"data","type":"bytes"}]},"signature":{"v":28,"r":"0xf3563d063f124a1360523b9a48ffb88e8127cc4e99238c0d6426d70ef8a53437","s":"0x02a913876071e388243ae2d1904997a6f812c133ae6c23407c4d2cc995d838d6"},"uid":"0xcbc28ac601589e07471fa0e09b5af93b804b6db6d77465d5e7ebf4cf64510c38"}};
    }

    chainIdToBigInt(a: any) {
        a.sig.domain.chainId = BigInt(a.sig.domain.chainId)
        return a;
    }

    _chainIdToBigInt(id: string) {
        return BigInt(id)
    }

    receipt () {

        return this._receipt;
    }

    verify () {

        const EAS_CONFIG: PartialTypedDataConfig = {
            address: this._receipt.sig.domain.verifyingContract,
            version: this._receipt.sig.domain.version,
            chainId: this._chainIdToBigInt(this._receipt.sig.domain.chainId),
        };

        const offchain = new Offchain(EAS_CONFIG, OffchainAttestationVersion.Version1, this._contract);
        const isValidAttestation = offchain.verifyOffchainAttestationSignature(
        this._receipt.signer,
        this._receipt.sig
        );
        
        return isValidAttestation;
    }

    data() {

        return this.parseActivityData(
            this._schemaEncoder.decodeData(this._receipt.sig.message.data)
        );
    }

    parseActivityData(data) {

        let activity = {};
        
        for (let prop of data) {
            activity[prop["name"]] = prop.type == 'uint64' ? Number(prop.value.value) : prop.value.value;
        };

        return activity;
    }
}