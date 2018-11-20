export default () => {
  if (global['window']) {
    const hyperform = require('hyperform');
    hyperform(window);

    Object.defineProperty(window['HTMLElement'].prototype, 'dataset', {
      writable: true,
      value: {}
    });

    Object.defineProperty(window['HTMLCanvasElement'].prototype, 'getContext', {
      writable: true,
      value: () => ({
        font: '',
        measureText: () => ({ width: 0 })
      })
    });

    window['MutationObserver'] =
      window['MutationObserver'] || require('mutation-observer');
  }
};
