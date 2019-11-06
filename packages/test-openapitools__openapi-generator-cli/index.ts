import fs from 'fs';
import path from 'path';
import getSwaggerConf from '../api/swagger-conf';

async function main() {
  try {
    const spec = await getSwaggerConf();
    fs.writeFileSync(path.join('src', 'dist', 'swagger.json'), JSON.stringify(spec));
  } catch {
    process.exit(0);
  }
}

main();
