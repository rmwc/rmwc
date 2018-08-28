// This scotch tapes an issue where SSR wont work with Drawers
// because MDC contains top level code thats browser specific
if (global && global.Element === undefined) {
  global.Element = function() {};
}
