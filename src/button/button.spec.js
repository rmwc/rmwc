"use strict";
exports.__esModule = true;
var React = require("react");
var enzyme_1 = require("enzyme");
var _1 = require("./");
describe('Button', function () {
    it('renders', function () {
        var btn = enzyme_1.mount(<_1.Button />);
        expect(!!~btn.html().search('mdc-button')).toEqual(true);
    });
    it('can have an icon', function () {
        enzyme_1.mount(<_1.Button>
        <_1.ButtonIcon icon="favorite"/>
        Button
      </_1.Button>);
    });
    it('can be raised', function () {
        var btn = enzyme_1.mount(<_1.Button raised/>);
        expect(!!~btn.html().search('mdc-button--raised')).toEqual(true);
    });
    it('can be unelevated', function () {
        var btn = enzyme_1.mount(<_1.Button unelevated/>);
        expect(!!~btn.html().search('mdc-button--unelevated')).toEqual(true);
    });
    it('can be outlined', function () {
        var btn = enzyme_1.mount(<_1.Button outlined/>);
        expect(!!~btn.html().search('mdc-button--outlined')).toEqual(true);
    });
    it('can be dense', function () {
        var btn = enzyme_1.mount(<_1.Button dense/>);
        expect(!!~btn.html().search('mdc-button--dense')).toEqual(true);
    });
    it('can ripple', function () {
        var btn = enzyme_1.mount(<_1.Button ripple/>);
        expect(!!~btn.html().search('mdc-button')).toEqual(true);
    });
    it('can not ripple', function () {
        var btn = enzyme_1.mount(<_1.Button ripple={undefined}/>);
        expect(!!~btn.html().search('mdc-button')).toEqual(true);
    });
    it('can have custom classnames', function () {
        var el = enzyme_1.mount(<_1.Button className={'my-custom-classname'}/>);
        expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
});
