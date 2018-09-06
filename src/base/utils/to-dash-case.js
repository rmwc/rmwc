// @flow

export const toDashCase = (str: string) => {
  return str.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase());
};
