[![CircleCI](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master.svg?style=shield)](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master)
[![npm](https://img.shields.io/npm/v/rmwc.svg)]()
[![npm](https://img.shields.io/npm/l/rmwc.svg)]()

# RMWC - React Material Web Components

A thin React wrapper for Material Design (Web) Components v0.26.0
[https://jamesmfriedman.github.io/rmwc/](https://jamesmfriedman.github.io/rmwc/)

## Recent updates

RMWC has been tested and works properly with React 15 / 16

## Goals

* To create the thinnest, lightest, and spec compliant wrapper around Google
  Material Design Components for the Web
  [https://material.io/components/web/](https://material.io/components/web/)
* To utilize the Foundation javascript classes and expose their api for
  consumption
* To be as unobtrusive and sensible as possible.

## Installation

* `npm install rmwc --save`
* material-web-components should be installed automatically as a peer
  dependency. Include
  `node_modules/material-components-web/dist/material-components-web.css` in
  your webpage via your method of choice.

## Usage

```javascript
import React from 'react';
import { Button } from 'rmwc/Button';

const HelloWorld = props => <Button>Easy</Button>;
```

This example is using ES6 modules imports, but the library will work via
CommonJS or any other UMD format.

## Why?

There are many different Material UI implementations in both Angular and React.
The last thing we need is another one... In React land there has been a lot of
great work done, but you eventually end up in one of the following situations:

* The library is heavy or extremely inflexible (crazy api, opinionated styling)
* The library is an opinionated representation of material or it isn't very
  polished
* The library has been abandoned

**The solution:** Use the Google sanctioned javascript Material Design
Components and get out of their way.

## About Breaking Changes

As stated in "Why?", the goal of this library is to be unopinionated, and that
includes opinions about breaking changes that come downstream from
`material-components-web`. In the future, steps may be taken to insulate
consumers by providing a deprecation path, but for the time being please make
sure your keep eyes on the official
[MDC Changelog](https://github.com/material-components/material-components-web/blob/master/CHANGELOG.md)
and RMWC will do its best to also keep its changelog up to date.

## Status: RC

RMWC is currently in RC. All of the MDC components are covered and are being
used in various projects. Only bug fixes and doc improvements are planned before
an official V1.

* [x] Buttons _ [x] Standard _ [x] FABs \* [x] Icon Toggles
* [x] Cards
* [x] Dialogs
* [x] Drawers
* [x] Elevation
* [x] Grid Lists
* [x] Inputs and Controls _ [x] Checkboxes _ [x] Form Fields _ [x] Radio Buttons
      _ [x] Select Menus _ [x] Sliders _ [x] Switches \* [x] Text Fields
* [x] Layout Grids
* [x] Linear Progress
* [x] Lists
* [x] Menu
* [x] Ripples
* [x] Snack Bars
* [x] Tabs
* [x] Toolbars
* [x] Typography

## To run the tests

* On MacOS Sierra and higher, install watchman to fix a filesystem issue with
  Jest. `brew install watchman`
* `npm test`

## To run the docs / contribute

* `git clone https://github.com/jamesmfriedman/rmwc.git`
* `cd rmwc`
* `npm install`
* `npm start`
