import { env } from './src/config/env.js';
import app from './src/server.js';
import fs from 'node:fs';

const port = env.port;
const versionAPP = JSON.parse(fs.readFileSync('./package.json', { encoding: "utf-8" })).version;

app.listen(port, () => {
  console.log('------------------------')
  console.log('------ Versión APP -------')
  console.log(`------- ${versionAPP} ---------`)
  console.log('----- SERVER INITILIZED ------')
  console.log(`------------Application running in port ${port}------------`)
  console.log('------------------------')
})