import express from 'express';
import { DataController} from './data.controller';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()
const port = 3011;
const ctrlr = new DataController();
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


app.post('/eas', async (req, res) => {
  res.send(await ctrlr.fetch(req.body));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


