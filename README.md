# rmwc - React Material Web Components
A thin React wrapper for Material Design (Web) Components
[https://jamesmfriedman.github.io/rmwc/](https://jamesmfriedman.github.io/rmwc/)

## Goals
- To create the thinnest, lightest, and spec compliant wrapper around Google Material Design Components for the Web [https://material.io/components/web/](https://material.io/components/web/)
- To utilize the Foundation javascript classes and expose their api for consumption
- To be as unobtrusive and sensible as possible.

## Installation
- `npm install rmwc --save`
- material-web-components should be installed automatically as a peer    dependency. Include `node_modules/material-components-web/dist/material-components-web.css` in your webpage via your method of choice.

## Usage
```javascript
import React from 'react';
import { Button } from 'rmwc';

const HelloWorld = props => <Button>Easy</Button>
```
This example is using ES6 modules imports, but the library will work via CommonJS or any other UMD format.


## Why?
There are many different Material UI implementations in both Angular and React. The last thing we need is another one... In React land there has been a lot of great work done, but you eventually end up in one of the following situations:
 - The library is heavy or extremely inflexible (crazy api, opinionated styling)
 - The library is an opinionated representation of material or it isn't very polished
 - The library has been abandoned
 
**The solution:** Use the Google sanctioned javascript Material Design Components and get out of their way.

## Status: Alpha
rmwc is currently in alpha. The majority of the api surface is mapped out and smoke tests have been written to check rendering and basic functionality. The docs will get a fresh coat of polish and additional documentation with the final release.

- [x] Buttons
  - [x] Standard
  - [x] FABs
  - [x] Icon Toggles
- [x] Cards
- [x] Dialogs
- [x] Drawers
- [x] Elevation
- [x] Grid Lists
- [x] Inputs and Controls
  - [x] Checkboxes
  - [x] Form Fields
  - [x] Radio Buttons
  - [x] Select Menus
  - [x] Sliders
  - [x] Switches
  - [x] Text Fields
- [x] Layout Grids
- [x] Linear Progress
- [x] Lists
- [x] Menu
- [x] Ripples
- [x] Snack Bars
- [x] Tabs
- [x] Toolbars
- [x] Typography

## To run the tests
- On MacOS Sierra and higher, install watchman to fix a filesystem issue with Jest.  `brew install watchman`
- `npm test`

## To run the docs / contribute
- `git clone https://github.com/jamesmfriedman/rmwc.git`
- `cd rmwc`
- `npm install`
- `npm start`

