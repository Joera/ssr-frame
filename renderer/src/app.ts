import express from 'express';
import { SsrController} from './ssr.controller';
import dotenv from 'dotenv'
dotenv.config()

const ctrlr = new SsrController();
const app = express();
app.use(express.json());
const port = 3009;

app.post('/create', async (req, res) => {

  // ucan
  const attestation_cid  = "QmTaNZCue4Y8rSVCe5btdwccK8e37LxdgTQgSGW94Si4Cy"
  const flavor = "runV1";

  await ctrlr.create(attestation_cid, flavor);
  
  res.send();


});

app.get('/frame', async (req, res) => {

  // hoe kan ik bewijzen dat ie van mij is? 
  // ideally creation happens at cast time .. including an ownership check with fid. 
  // seems not possible yet. So we need an external frontend for frame creation. 
  // const fid = ""

  // render img
  //  await ctrlr.create(req.body.week,{ width: req.body.width, height: req.body.height})

    const image_name = 'screenshot.png';

    res.status(200).send(`
    
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="http://0.0.0.0:3007/${image_name}"
          </head>
        </html>
    
    `);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


