"use strict";
/**
 * @jest-environment node
 */
exports.__esModule = true;
var React = require("react");
var server_1 = require("react-dom/server");
var _1 = require("./");
describe('Button SSR', function () {
    it('renders', function () {
        server_1.renderToString(<_1.Button>
        <_1.ButtonIcon icon="favorite"/>
        Button
      </_1.Button>);
    });
});
