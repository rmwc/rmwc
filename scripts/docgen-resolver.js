/* eslint-disable */
/*
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

const isExportsOrModuleAssignment = require('react-docgen/dist/utils/isExportsOrModuleAssignment')
  .default;
const isReactComponentClass = require('react-docgen/dist/utils/isReactComponentClass')
  .default;
const isReactCreateClassCall = require('react-docgen/dist/utils/isReactCreateClassCall')
  .default;
const isStatelessComponent = require('react-docgen/dist/utils/isStatelessComponent')
  .default;
const normalizeClassDefinition = require('react-docgen/dist/utils/normalizeClassDefinition')
  .default;
const resolveExportDeclaration = require('react-docgen/dist/utils/resolveExportDeclaration')
  .default;
const resolveToValue = require('react-docgen/dist/utils/resolveToValue')
  .default;
const resolveHOC = require('react-docgen/dist/utils/resolveHOC').default;

function ignore() {
  return false;
}

function isSimpleTag(def) {
  return !!(
    def &&
    def.value &&
    def.value.callee &&
    def.value.callee.name === 'simpleTag'
  );
}

function isWithMDC(def) {
  return !!(
    def &&
    def.value &&
    def.value.callee &&
    def.value.callee.callee &&
    def.value.callee.callee.name.indexOf('withMDC') !== -1
  );
}

function isComponentDefinition(path) {
  return (
    isReactCreateClassCall(path) ||
    isReactComponentClass(path) ||
    isStatelessComponent(path) ||
    isSimpleTag(path) ||
    isWithMDC(path)
  );
}

function resolveDefinition(definition, types) {
  if (isReactCreateClassCall(definition)) {
    // return argument
    var resolvedPath = resolveToValue(definition.get('arguments', 0));
    if (types.ObjectExpression.check(resolvedPath.node)) {
      return resolvedPath;
    }
  } else if (isReactComponentClass(definition)) {
    normalizeClassDefinition(definition);
    return definition;
  } else if (isStatelessComponent(definition)) {
    return definition;
  } else if (isSimpleTag(definition)) {
    var resolvedPath = resolveToValue(definition.get('arguments', 0));
    return resolvedPath;
  } else if (isWithMDC(definition)) {
    var resolvedPath = resolveToValue(definition.get('arguments', 0));
    return resolvedPath;
  }

  return null;
}

/**
 * Given an AST, this function tries to find the exported component definitions.
 *
 * The component definitions are either the ObjectExpression passed to
 * `React.createClass` or a `class` definition extending `React.Component` or
 * having a `render()` method.
 *
 * If a definition is part of the following statements, it is considered to be
 * exported:
 *
 * modules.exports = Definition;
 * exports.foo = Definition;
 * export default Definition;
 * export var Definition = ...;
 */
module.exports = function findExportedComponentDefinitions(ast, recast) {
  var types = recast.types.namedTypes;
  var components = [];

  function exportDeclaration(path) {
    var definitions = resolveExportDeclaration(path, types)
      .reduce((acc, definition) => {
        if (isComponentDefinition(definition)) {
          acc.push(definition);
        } else {
          var resolved = resolveToValue(resolveHOC(definition));
          if (isComponentDefinition(resolved)) {
            acc.push(resolved);
          }
        }
        return acc;
      }, [])
      .map(definition => resolveDefinition(definition, types));

    if (definitions.length === 0) {
      return false;
    }
    definitions.forEach(definition => {
      if (definition && components.indexOf(definition) === -1) {
        components.push(definition);
      }
    });
    return false;
  }

  recast.visit(ast, {
    visitFunctionDeclaration: ignore,
    visitFunctionExpression: ignore,
    visitClassDeclaration: ignore,
    visitClassExpression: ignore,
    visitIfStatement: ignore,
    visitWithStatement: ignore,
    visitSwitchStatement: ignore,
    visitCatchCause: ignore,
    visitWhileStatement: ignore,
    visitDoWhileStatement: ignore,
    visitForStatement: ignore,
    visitForInStatement: ignore,

    visitExportDeclaration: exportDeclaration,
    visitExportNamedDeclaration: exportDeclaration,
    visitExportDefaultDeclaration: exportDeclaration,

    visitAssignmentExpression: function(path) {
      // Ignore anything that is not `exports.X = ...;` or
      // `module.exports = ...;`
      if (!isExportsOrModuleAssignment(path)) {
        return false;
      }
      // Resolve the value of the right hand side. It should resolve to a call
      // expression, something like React.createClass
      path = resolveToValue(path.get('right'));
      if (!isComponentDefinition(path)) {
        path = resolveToValue(resolveHOC(path));
        if (!isComponentDefinition(path)) {
          return false;
        }
      }
      const definition = resolveDefinition(path, types);
      if (definition && components.indexOf(definition) === -1) {
        components.push(definition);
      }
      return false;
    }
  });

  return components;
};
