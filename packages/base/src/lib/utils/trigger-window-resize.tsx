export const triggerWindowResize = () => {
  window.dispatchEvent(new Event('resize'));
};
