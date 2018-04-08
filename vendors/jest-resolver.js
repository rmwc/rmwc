const resolver = require('jest-resolve/build/defaultResolver.js');
const ReactTestVersion = process.env.REACT_TEST_VERSION;

module.exports = (moduleName, options) => {
  const resolvedPath = resolver(moduleName, options);

  if (
    ReactTestVersion &&
    ['react', 'react-dom', 'react-test-renderer'].some(p =>
      resolvedPath.includes('node_modules/${}/')
    ) &&
    !resolvedPath.includes('vendors/react')
  ) {
    return resolvedPath.replace(
      'node_modules/',
      `vendors/react-${ReactTestVersion}/node_modules/`
    );
  }

  return resolvedPath;
};
