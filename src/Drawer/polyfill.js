// This scotch tapes an issue where SSR wont work with Drawers
// because MDC contains top level code thats browser specific
const tsxSafeGlobal: any = global;
if (tsxSafeGlobal && tsxSafeGlobal.Element === undefined) {
  tsxSafeGlobal.Element = function() {};
}
