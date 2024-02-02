import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv';
// import xlsx from 'node-xlsx';
dotenv.config();
export class BucketService {
    client;
    constructor() {
        this.init();
    }
    init() {
        this.client = new S3Client({
            forcePathStyle: false, // Configures to use subdomain/virtual calling format.
            endpoint: "https://" + process.env.SPACES_REGION + ".digitaloceanspaces.com",
            region: process.env.SPACES_REGION,
            credentials: {
                accessKeyId: process.env.SPACES_KEY,
                secretAccessKey: process.env.SPACES_SECRET
            }
        });
    }
    async readFile(fileName) {
        const bucketParams = {
            Bucket: "img-dashboard-backups",
            Key: "invoer/" + fileName
        };
        const response = await this.client.send(new GetObjectCommand(bucketParams));
        return await this._streamToString(response.Body);
    }
    async writeFile(fileStream, fileName) {
        //  
        const input = {
            Body: fileStream,
            Bucket: "img-dashboard-backups",
            Key: "svg/" + fileName
        };
        return await this.client.send(new PutObjectCommand(input));
    }
    // Function to turn the file's body into a string.
    async _streamToString(stream) {
        const chunks = [];
        return new Promise((resolve, reject) => {
            stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
            stream.on('error', (err) => reject(err));
            stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        });
    }
    ;
    async _streamToBuffer(stream) {
        const chunks = [];
        return new Promise((resolve, reject) => {
            stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
            stream.on('error', (err) => reject(err));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
        });
    }
    ;
}
