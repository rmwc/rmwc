import { glob } from 'glob';
import { validateWorkflow } from '@action-validator/core';
import { readFileSync } from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../');

let exitCode = 0;

const files = await glob(`${root}/.github/workflows/*.yml`);

files.forEach((file) => {
  const actionSource = readFileSync(file, 'utf8');
  const state = validateWorkflow(actionSource);
  if (state.errors.length === 0) {
    console.log('✅', file, 'is valid');
  } else {
    exitCode++;
    console.log('❌', file, 'is not valid');
  }
});

process.exit(exitCode);
