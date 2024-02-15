import express from 'express';
import { DataController} from './data.controller';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()

const ctrlr = new DataController();
const app = express();
app.use(express.json());
app.use(cors())
const port = 3011;


app.get('/eas', async (req, res) => {

  const attestation_cid  = "QmTaNZCue4Y8rSVCe5btdwccK8e37LxdgTQgSGW94Si4Cy"
  
  res.send(await ctrlr.fetch(attestation_cid));

});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


