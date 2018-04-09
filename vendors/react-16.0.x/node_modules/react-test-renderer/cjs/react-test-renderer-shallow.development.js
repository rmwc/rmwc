/** @license React v16.0.0
 * react-test-renderer-shallow.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';


if (process.env.NODE_ENV !== "production") {
(function() {

'use strict';

var objectAssign = require('object-assign');
var checkPropTypes = require('prop-types/checkPropTypes');
var react = require('react');
var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reactProdInvariant
 * 
 */

/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule describeComponentFrame
 */

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getComponentName
 * 
 */

function getComponentName(instanceOrFiber) {
  if (typeof instanceOrFiber.getName === 'function') {
    // Stack reconciler
    var instance = instanceOrFiber;
    return instance.getName();
  }
  if (typeof instanceOrFiber.tag === 'number') {
    // Fiber reconciler
    var fiber = instanceOrFiber;
    var type = fiber.type;

    if (typeof type === 'string') {
      return type;
    }
    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
  }
  return null;
}

var getComponentName_1 = getComponentName;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }










var ReactShallowRenderer = function () {
  function ReactShallowRenderer() {
    _classCallCheck(this, ReactShallowRenderer);

    this._context = null;
    this._element = null;
    this._instance = null;
    this._newState = null;
    this._rendered = null;
    this._rendering = false;
    this._updater = new Updater(this);
  }

  ReactShallowRenderer.prototype.getMountedInstance = function getMountedInstance() {
    return this._instance;
  };

  ReactShallowRenderer.prototype.getRenderOutput = function getRenderOutput() {
    return this._rendered;
  };

  ReactShallowRenderer.prototype.render = function render(element) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyObject;

    !react.isValidElement(element) ? invariant(false, 'ReactShallowRenderer render(): Invalid component element.%s', typeof element === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : '') : void 0;
    !(typeof element.type !== 'string') ? invariant(false, 'ReactShallowRenderer render(): Shallow rendering works only with custom components, not primitives (%s). Instead of calling `.render(el)` and inspecting the rendered output, look at `el.props` directly instead.', element.type) : void 0;

    if (this._rendering) {
      return;
    }

    this._rendering = true;
    this._element = element;
    this._context = context;

    if (this._instance) {
      this._updateClassComponent(element.props, context);
    } else {
      if (shouldConstruct(element.type)) {
        this._instance = new element.type(element.props, context, this._updater);

        if (element.type.hasOwnProperty('contextTypes')) {
          currentlyValidatingElement = element;

          checkPropTypes(element.type.contextTypes, context, 'context', getName(element.type, this._instance), getStackAddendum);

          currentlyValidatingElement = null;
        }

        this._mountClassComponent(element.props, context);
      } else {
        this._rendered = element.type(element.props, context);
      }
    }

    this._rendering = false;

    return this.getRenderOutput();
  };

  ReactShallowRenderer.prototype.unmount = function unmount() {
    if (this._instance) {
      if (typeof this._instance.componentWillUnmount === 'function') {
        this._instance.componentWillUnmount();
      }
    }

    this._context = null;
    this._element = null;
    this._newState = null;
    this._rendered = null;
    this._instance = null;
  };

  ReactShallowRenderer.prototype._mountClassComponent = function _mountClassComponent(props, context) {
    this._instance.context = context;
    this._instance.props = props;
    this._instance.state = this._instance.state || emptyObject;
    this._instance.updater = this._updater;

    if (typeof this._instance.componentWillMount === 'function') {
      var beforeState = this._newState;

      this._instance.componentWillMount();

      // setState may have been called during cWM
      if (beforeState !== this._newState) {
        this._instance.state = this._newState || emptyObject;
      }
    }

    this._rendered = this._instance.render();
    // Intentionally do not call componentDidMount()
    // because DOM refs are not available.
  };

  ReactShallowRenderer.prototype._updateClassComponent = function _updateClassComponent(props, context) {
    var oldProps = this._instance.props;

    if (oldProps !== props && typeof this._instance.componentWillReceiveProps === 'function') {
      this._instance.componentWillReceiveProps(props, context);
    }

    // Read state after cWRP in case it calls setState
    // Fallback to previous instance state to support rendering React.cloneElement()
    var state = this._newState || this._instance.state || emptyObject;

    if (typeof this._instance.shouldComponentUpdate === 'function') {
      if (this._instance.shouldComponentUpdate(props, state, context) === false) {
        this._instance.context = context;
        this._instance.props = props;
        this._instance.state = state;

        return;
      }
    }

    if (typeof this._instance.componentWillUpdate === 'function') {
      this._instance.componentWillUpdate(props, state, context);
    }

    this._instance.context = context;
    this._instance.props = props;
    this._instance.state = state;

    this._rendered = this._instance.render();
    // Intentionally do not call componentDidUpdate()
    // because DOM refs are not available.
  };

  return ReactShallowRenderer;
}();

ReactShallowRenderer.createRenderer = function () {
  return new ReactShallowRenderer();
};

var Updater = function () {
  function Updater(renderer) {
    _classCallCheck(this, Updater);

    this._renderer = renderer;
  }

  Updater.prototype.isMounted = function isMounted(publicInstance) {
    return !!this._renderer._element;
  };

  Updater.prototype.enqueueForceUpdate = function enqueueForceUpdate(publicInstance, callback, callerName) {
    this._renderer.render(this._renderer._element, this._renderer._context);

    if (typeof callback === 'function') {
      callback.call(publicInstance);
    }
  };

  Updater.prototype.enqueueReplaceState = function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
    this._renderer._newState = completeState;
    this._renderer.render(this._renderer._element, this._renderer._context);

    if (typeof callback === 'function') {
      callback.call(publicInstance);
    }
  };

  Updater.prototype.enqueueSetState = function enqueueSetState(publicInstance, partialState, callback, callerName) {
    if (typeof partialState === 'function') {
      partialState = partialState(publicInstance.state, publicInstance.props);
    }

    this._renderer._newState = objectAssign({}, publicInstance.state, partialState);

    this._renderer.render(this._renderer._element, this._renderer._context);

    if (typeof callback === 'function') {
      callback.call(publicInstance);
    }
  };

  return Updater;
}();

var currentlyValidatingElement = null;

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function getStackAddendum() {
  var stack = '';
  if (currentlyValidatingElement) {
    var name = getDisplayName(currentlyValidatingElement);
    var owner = currentlyValidatingElement._owner;
    stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName_1(owner));
  }
  return stack;
}

function getName(type, instance) {
  var constructor = instance && instance.constructor;
  return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
}

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isReactComponent);
}

var ReactShallowRendererEntry = ReactShallowRenderer;

module.exports = ReactShallowRendererEntry;

})();
}
