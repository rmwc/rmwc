/**
 * Generates a pseudo random string for DOM ids
 * Will return 'test' in the NODE test-env so things like storyshots doesnt break.
 * */
export const randomId = prefix => {
  const id =
    process.env.NODE_ENV === 'test' ?
      'test' :
      (Math.random() + Math.random() + 1).toString(36).substring(2);
  return `${prefix}-${id}`;
};
