export default () => {
  if ((global as any)['window']) {
    const hyperform = require('hyperform');
    hyperform(window);

    Object.defineProperty((window as any)['HTMLElement'].prototype, 'dataset', {
      writable: true,
      value: {}
    });

    if (!(window as any)['HTMLCanvasElement']) {
      Object.defineProperty(
        (window as any)['HTMLCanvasElement'].prototype,
        'getContext',
        {
          writable: true,
          value: () => ({
            font: '',
            measureText: () => ({ width: 0 })
          })
        }
      );
    }

    (window as any)['MutationObserver'] =
      (window as any)['MutationObserver'] || require('mutation-observer');
  }
};
