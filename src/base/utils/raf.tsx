export const raf = (
  callback: () => void,
  frameCount: number = 1,
  frame: number = 0
) => {
  requestAnimationFrame(() => {
    frame++;
    if (frame >= frameCount) {
      callback();
    } else {
      raf(callback, frameCount, frame);
    }
  });
};
