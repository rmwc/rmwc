"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var React = require("react");
var base_1 = require("@rmwc/base");
var ripple_1 = require("@rmwc/ripple");
var icon_1 = require("@rmwc/icon");
/**
 * The Button component. Buttons also accepts all of the props from the Ripple component.
 */
exports.Button = ripple_1.withRipple({
    surface: false
})(base_1.componentFactory({
    displayName: 'Button',
    tag: 'button',
    classNames: function (props) { return [
        'mdc-button',
        {
            'mdc-button--dense': props.dense,
            'mdc-button--raised': props.raised,
            'mdc-button--unelevated': props.unelevated,
            'mdc-button--outlined': props.outlined
        }
    ]; },
    consumeProps: [
        'dense',
        'raised',
        'unelevated',
        'outlined',
        'primary',
        'accent',
        'unbounded'
    ],
    defaultProps: {
        dense: false,
        raised: false,
        unelevated: false,
        outlined: false
    },
    render: function (_a, ref, Tag) {
        var icon = _a.icon, label = _a.label, children = _a.children, rest = __rest(_a, ["icon", "label", "children"]);
        return (<Tag {...rest} ref={ref}>
          {!!icon && <exports.ButtonIcon icon={icon}/>}
          <span className="mdc-button__label">
            {label}
            {children}
          </span>
        </Tag>);
    }
}));
/** An icon that goes inside of buttons. This is an instance of the Icon component. */
exports.ButtonIcon = base_1.componentFactory({
    displayName: 'ButtonIcon',
    tag: icon_1.Icon,
    classNames: ['mdc-button__icon']
});
