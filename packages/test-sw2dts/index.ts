// tslint:disable: no-implicit-dependencies
import fs from 'fs';
import * as sw2dts from 'sw2dts';
import getSwaggerConf from '../api/swagger-conf';

async function main() {
  try {
    const spec = await getSwaggerConf();
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
