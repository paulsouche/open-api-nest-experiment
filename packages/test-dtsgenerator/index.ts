// tslint:disable: no-implicit-dependencies
import dtsgenerator from 'dtsgenerator';
import fs from 'fs';
import getSwaggerConf from '../api/swagger-conf';

async function main() {
  try {
    const spec = await getSwaggerConf();
    const generatedTypescriptCode = await dtsgenerator({
      contents: [spec],
    });
    fs.writeFileSync('dist/index.d.ts', generatedTypescriptCode);
  } catch (e) {
    process.exit(0);
  }
}

main();
