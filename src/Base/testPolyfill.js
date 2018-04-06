export default () => {
  if (global.window) {
    const { ValidityState } = require('hyperform');

    const defineValidity = {
      get() {
        return ValidityState(this);
      },
      configurable: true
    };

    Object.defineProperty(
      global.HTMLInputElement.prototype,
      'validity',
      defineValidity
    );
    Object.defineProperty(
      global.HTMLTextAreaElement.prototype,
      'validity',
      defineValidity
    );

    Object.defineProperty(window.HTMLElement.prototype, 'dataset', {
      writable: true,
      value: {}
    });

    Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
      writable: true,
      value: () => ({
        font: '',
        measureText: () => ({ width: 0 })
      })
    });

    window.MutationObserver =
      window.MutationObserver || require('mutation-observer');
  }
};
