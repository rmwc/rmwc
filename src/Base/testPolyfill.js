import MutationObserverPolyfill from 'mutation-observer';

export default () => {
  Object.defineProperty(window.HTMLElement.prototype, 'dataset', {
    writable: true,
    value: {}
  });

  Object.defineProperty(window.HTMLInputElement.prototype, 'validity', {
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

  window.MutationObserver = window.MutationObserver || MutationObserverPolyfill;
};
