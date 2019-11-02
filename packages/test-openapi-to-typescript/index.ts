// tslint:disable: no-implicit-dependencies
import axios from 'axios';
import fs from 'fs';
import { GenerateTypings } from 'openapi-to-typescript';
import yargs from 'yargs';

const uri = yargs.argv._.shift() || `http://localhost:3000/swagger-json`;

async function fetchSpec(): Promise<any> {
  try {
    const response = await axios(uri);
    if (response.status !== 200) {
      throw response;
    }
    return response.data;
  } catch (res) {
    process.stdout.write(`Cannot reach API! status ${res.status}. Is ${uri} correct ?\n`);
    throw res;
  }
}

async function main() {
  try {
    const spec = await fetchSpec();
    const generatedTypescriptCode = await GenerateTypings(spec);
    fs.writeFileSync('dist/index.d.ts', generatedTypescriptCode);
  } catch {
    process.exit(0);
  }
}

main();
