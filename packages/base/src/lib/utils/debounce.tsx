export const debounce = function(func: Function, wait: number) {
  var timeout: NodeJS.Timeout | null;
  return function() {
    // @ts-ignore
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };

    timeout !== null && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
