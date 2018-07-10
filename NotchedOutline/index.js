"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotchedOutlineIdle = exports.NotchedOutline = undefined;

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var NotchedOutline = exports.NotchedOutline = function NotchedOutline() {
  return React.createElement(
    "div",
    { className: "mdc-notched-outline" },
    React.createElement(
      "svg",
      null,
      React.createElement("path", { className: "mdc-notched-outline__path" })
    )
  );
};

var NotchedOutlineIdle = function NotchedOutlineIdle(_ref) {
  var rest = _objectWithoutProperties(_ref, []);

  return React.createElement("div", Object.assign({}, rest, { className: "mdc-notched-outline__idle" }));
};
exports.NotchedOutlineIdle = NotchedOutlineIdle;
