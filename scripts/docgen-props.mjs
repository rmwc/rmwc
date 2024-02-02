import getPackages from './get-packages.js';
import * as path from 'path';
import * as fs from 'fs';
import { Documentalist, TypescriptPlugin } from '@documentalist/compiler';

try {
  const packages = getPackages(['readme']);

  for (const d of packages) {
    fs.mkdirSync(path.resolve('utils', 'readme', 'src', 'generated-props'), {
      recursive: true
    });
    console.log(`Building Docs props for: ${d}`);
    const docs = await new Documentalist()
      .use(/\.tsx?$/, new TypescriptPlugin())
      .documentGlobs(`packages/${d}/**/*`);
    fs.writeFileSync(
      `./utils/readme/src/generated-props/${d}.json`,
      JSON.stringify(docs, null, 2)
    );
  }
} catch (err) {
  console.error(err.toString());
}
