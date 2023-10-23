/**
 * Generates a pseudo random string for DOM ids
 * Will return 'test' in the NODE test-env so things like storyshots doesnt break.
 */
export const randomId = (prefix?: string): string => {
  const id =
    import.meta.env.MODE === 'test'
      ? 'test'
      : (Math.random() + Math.random() + 1).toString(36).substring(2);
  return `${prefix}-${id}`;
};
