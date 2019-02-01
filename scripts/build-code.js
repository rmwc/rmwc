process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const getPackageDirs = require('./get-package-dirs');
const path = require('path');
const fs = require('fs-extra');
const { exec, execSync } = require('child_process');
const glob = require('glob');

// Babels and copies the file to its new directory
const writeBuiltFile = (inputFile, outputFile) => {
  const cmd = `NODE_ENV=production ./node_modules/.bin/babel ${inputFile} -o ${outputFile} --copy-files`;
  exec(cmd);
};

// Writes a typescript version of the file
const writeFlowFile = (inputFile, outputFile, pkgName) => {
  execSync(`cp ${inputFile} ${outputFile}`);
  const content = fs.readFileSync(outputFile, 'utf8');
  let newContent = content;

  const [imports, typeImports] = newContent.split('\n').reduce(
    (acc, line) => {
      if (line.trim().startsWith('import')) {
        if (/import \{(.*?)\} from(.*)/g.test(line)) {
          line.replace(/import \{(.*?)\} from(.*)/g, (match, p1, p2) => {
            const parts = p1.split(',');

            const types = [];
            const nonTypes = [];

            parts.forEach(p => {
              p = p.trim();
              if (p.endsWith('T') || p.endsWith('Props')) {
                types.push(p);
              } else {
                nonTypes.push(p);
              }
            });

            nonTypes.length &&
              acc[0].push(`import { ${nonTypes.join(', ')} } from${p2}`);

            types.length &&
              acc[1].push(`import type { ${types.join(', ')} } from${p2}`);
            return '';
          });
        } else {
          acc[0].push(line);
        }
      }
      return acc;
    },
    [[], []]
  );

  let isModuleDeclaration = outputFile.includes(path.join(pkgName, 'index.js'));
  isModuleDeclaration = outputFile.includes('base/index.js')
    ? false
    : isModuleDeclaration;

  if (isModuleDeclaration) {
    newContent = newContent
      // Fix exports and declares
      .replace(/^export declare const/gm, 'export var')
      .replace(/^export declare/gm, 'export')
      .replace(/^export/gm, 'declare export')
      .replace(/^interface/gm, 'declare interface');
  } else {
    newContent = newContent
      // Fix exports and declares
      .replace(/^export declare const/gm, 'export var')
      .replace(/^export declare/gm, 'export');
  }

  newContent = newContent

    // .replace(/export const/g, 'export var')
    .replace(/(export class .*){[\S\s\n]*?^}/gm, '$1{}')
    .replace(/^import.*/gm, '')
    .replace(/React\.CSSProperties/g, 'Object')
    .replace(/React\.HTMLAttributes/g, 'React.Element')
    .replace(/React\.AllHTMLAttributes<.*?>/g, 'Object')

    // Corrects extends
    // <P extends {}> -> <P: {}>
    .replace(/<.*?(?!extends).+?>/g, match => {
      return match.replace(/ extends /g, ': ');
    })

    // Corrects keyof
    // keyof B -> $Keys<B>
    .replace(/keyof ([\S\s]+?)([,>])/g, '$Keys<$1>$2')
    .replace(/Partial</g, '$Shape<')
    .replace(/React\.ReactNode/g, 'React.Node')
    .replace(/React\.HTMLProps<(.*?)>/g, 'Object')
    .replace(/JSX\.Element/g, 'React.Node')
    .replace(/React\.ReactElement/g, 'React.Element')
    .replace(/undefined/g, 'typeof undefined')

    // CustomEvent isn't polymorphic in flow
    .replace(/CustomEvent<T>/g, 'CustomEvent')

    // MergeInterfaces is a way to get around TS issues with incompatible extends
    // Flow doesn't care, so just make it an intersection
    .replace(
      /export type MergeInterfacesT<A, B>.*?;/,
      'export type MergeInterfacesT<A, B> = A & B'
    )
    .replace(
      /export interface ThemeProviderProps extends.*>/,
      'export interface ThemeProviderProps extends RMWC.ComponentProps'
    )
    .replace(/declare type ExtractProps.*/, '')

    // Eliminates Rest spread list of props from TS def
    // ({foo, baz, bar, ...rest}: PropsT) -> (props: PropsT)
    .replace(/\({.*?\}(\?)?:/g, '(props$1:')

    // .replace(/componentDidMount\(\): void;/g, 'componentDidMount(): void {}')
    // .replace(
    //   /getDefaultFoundation\(\): any;/g,
    //   'getDefaultFoundation(): any {}'
    // )
    //displayName
    //.replace(/static displayName.+?;/g, '')
    //events
    .replace(/React\.SyntheticEvent<(.*?)>/g, 'SyntheticEvent<$1>')
    .replace(/React\.KeyboardEvent<(.*?)>/g, 'SyntheticKeyboardEvent<$1>')
    .replace(/React\.KeyboardEvent/g, 'SyntheticKeyboardEvent<any>')
    .replace(/React\.MouseEvent<(.*?)>/g, 'SyntheticMouseEvent<$1>')
    .replace(/React\.MouseEvent/g, 'SyntheticMouseEvent<any>')
    .replace(/React\.FocusEvent<(.*?)>/g, 'SyntheticFocusEvent<$1>')
    .replace(/React\.FocusEvent/g, 'SyntheticFocusEvent<any>')
    .replace(/React\.TransitionEvent/g, 'SyntheticTransitionEvent<any>')
    .replace(/React\.InputEvent<(.*?)>/g, 'SyntheticInputEvent<$1>')
    .replace(/React\.InputEvent/g, 'SyntheticInputEvent<any>')
    .replace(/React\.TouchEvent<(.*?)>/g, 'SyntheticTouchEvent<$1>')
    .replace(/React\.TouchEvent/g, 'SyntheticTouchEvent<any>')
    .replace(/React\.ChangeEvent<(.*?)>/g, 'SyntheticInputEvent<$1>')
    .replace(/React\.ChangeEvent/g, 'SyntheticInputEvent<any>')
    .replace(
      /\/\/\/ <reference types="react" \/>/g,
      "import * as React from 'react';"
    );

  if (isModuleDeclaration) {
    const moduleName = `@rmwc/${pkgName}`;

    newContent = [
      '// @flow',
      imports.join('\n'),
      `\ndeclare module '${moduleName}' {\n`,
      typeImports.map(l => '  ' + l).join('\n'),
      newContent
        .split('\n')
        .map(l => '  ' + l)
        .join('\n'),
      '\n}'
    ].join('\n');
  }

  fs.writeFileSync(outputFile, newContent, 'utf8');
};

// Simply copies the file
const copyFile = (inputFile, outputFile) => {
  exec(`cp -R ${inputFile} ${outputFile}`);
};

const root = path.resolve(__dirname, '../');

execSync(
  `./node_modules/.bin/tsc --project ${root}/tsconfig-build.json --target es5 --module CommonJS`,
  {
    stdio: [0, 1, 2]
  }
);

execSync(
  `./node_modules/.bin/tsc --project ${root}/tsconfig-build.json --target es5 --module esnext --outDir ${root}/build/next`,
  {
    stdio: [0, 1, 2]
  }
);

glob(
  `build/dist/**/*.d.ts`,
  { cwd: root, ignore: 'build/dist/rmwc/**/*' },
  (err, files) => {
    files.forEach(f => {
      const input = path.resolve(root, f);
      const outDir = path.resolve(path.dirname(input), 'flow-typed');
      const pkg = f.split(path.sep).slice(2, 3)[0];
      const restPath = f.split(path.sep).slice(3);

      if (pkg.includes('.')) {
        return;
      }

      const output = path
        .resolve('src', 'types', 'flow-typed', pkg, ...restPath)
        .replace('.d.ts', '.js');

      execSync(`mkdir -p ${path.dirname(output)}`);

      writeFlowFile(input, output, pkg);
    });
  }
);

const promises = getPackageDirs().map(d => {
  return new Promise((resolve, reject) => {
    copyFile(
      path.resolve(root, 'build', 'dist', d),
      path.resolve(root, 'src', d, 'dist')
    );

    copyFile(
      path.resolve(root, 'build', 'next', d),
      path.resolve(root, 'src', d, 'next')
    );

    resolve();
  });
});

// Compile the TS
Promise.all(promises).then(() => {
  console.log('Done');
});
