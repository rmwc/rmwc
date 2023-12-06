export const toCamel = (str: string) =>
  str.replace(/(-[a-z])/g, ($1) => $1.toUpperCase().replace('-', ''));

export const toDashCase = (str: string) => {
  return str
    .replace(/(^[a-z]+|[A-Z][a-z]*|\d+)/g, ($1) => '-' + $1.toLowerCase())
    .slice(1);
};
