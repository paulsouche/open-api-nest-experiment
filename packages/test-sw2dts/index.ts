// tslint:disable: no-implicit-dependencies
import axios from 'axios';
import fs from 'fs';
import * as sw2dts from 'sw2dts';
import yargs from 'yargs';

const uri = yargs.argv._.shift() || `http://localhost:3000/swagger-json`;

async function fetchSpec(): Promise<sw2dts.SwaggerSpec> {
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
    const options: sw2dts.ConverterOptions = {
      namespace: 'api',
    };
    const generatedTypescriptCode = await sw2dts.convert(spec, options);
    fs.writeFileSync('dist/index.d.ts', generatedTypescriptCode);
  } catch (e) {
    process.exit(0);
  }
}

main();
