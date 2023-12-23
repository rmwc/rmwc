import generateAliasesResolver from 'esm-module-alias';
const aliases = {
  '../../../doc-utils/src/lib/doc-utils.mjs':
    './dist/readmes/utils/doc-utils-markdown/index.mjs'
};
export const resolve = generateAliasesResolver(aliases);
