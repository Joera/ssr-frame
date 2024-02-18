import express from 'express';
import { SsrController} from './ssr.controller';
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config()

const ctrlr = new SsrController();
const app = express();
app.use(express.json());
const port = 3009;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.post('/create', async (req, res) => {

  const flavor = "runV1";
  const r = await ctrlr.create(req.body, flavor);
  res.send(r);
});

app.get('/frame', async (req, res) => {

    console.log("reachable");

    const domain = "frames.autonomous-times.com"; // localhost:8880

    if(req.query.flavor != undefined && req.query.uid != undefined ) {

      const image_name = req.query.flavor + "/" + req.query.uid + ".png"

      res.status(200).send(`
      
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="https://${domain}/frames/${image_name}" />
              <meta property="og:image" content="https://${domain}/frames/${image_name}" />
              <meta property="fc:frame:button:1" content="receipt"/> 
              <meta property="fc:frame:button:1:action" content="link"/> 
              <meta property="fc:frame:button:1:target" content="https://base.easscan.org/offchain/attestation/view/${req.query.uid}"/> 
            </head>
          </html>
      
      `);

    } else {

      res.status(500)
    }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


