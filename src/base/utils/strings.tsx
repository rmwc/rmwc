export const toCamel = (str: string) =>
  str.replace(/(-[a-z])/g, $1 => $1.toUpperCase().replace('-', ''));

export const toDashCase = (str: string) => {
  return str.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase());
};
