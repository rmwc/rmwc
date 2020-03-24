/**
 * A helper for when we have multiple requestion animation frames
 * Usage:
 *  raf(() => doSomething, 3);
 */
export const raf = (
  callback: () => void,
  frames: number = 1,
  _iteration = 1
) => {
  window.requestAnimationFrame(() => {
    _iteration >= frames ? callback() : raf(callback, frames, _iteration + 1);
  });
};
