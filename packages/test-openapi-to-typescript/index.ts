// tslint:disable: no-implicit-dependencies
import fs from 'fs';
import { GenerateTypings } from 'openapi-to-typescript';
import getSwaggerConf from '../api/swagger-conf';

async function main() {
  try {
    const spec = await getSwaggerConf();
    const generatedTypescriptCode = await GenerateTypings(spec);
    fs.writeFileSync('dist/index.d.ts', generatedTypescriptCode);
  } catch {
    process.exit(0);
  }
}

main();
