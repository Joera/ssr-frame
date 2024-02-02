import fetch from 'node-fetch-polyfill';
global.fetch = fetch;
import express from 'express';
import { SsrController } from './ssr.controller';
import dotenv from 'dotenv';
dotenv.config();
const ctrlr = new SsrController();
const app = express();
app.use(express.json());
const port = 3009;
// create new db .. with web_a non role .. and populate with latest backup 
app.post('/ssr', async (req, res) => {
    res.send(await ctrlr.create(req.body.week, { width: req.body.width, height: req.body.height }));
});
app.get('/frame', async (req, res) => {
    // render img
    //  await ctrlr.create(req.body.week,{ width: req.body.width, height: req.body.height})
    const image_name = 'screenshot.png';
    res.status(200).send(`
    
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="http://0.0.0.0:3007/${image_name}"
        </html>
    
    `);
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
