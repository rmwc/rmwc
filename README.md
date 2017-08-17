# RMDC - React Material Design Components
A thin React wrapper for Material Design (Web) Components

## Goals
- To create the thinnest, lightest, and spec compliant wrapper around Google Material Design Components for the Web
- To utilize the Foundation javascript classes and expose their api for consumption
- To be as unobtrusive and sensible as possible.

## Why?
There are many different Material UI implementations in both Angular and React. The last thing we need is another one... In React land there has been a lot of great work done, but you eventually end up in one of the following situations:
 - The library is heavy or extremely inflexible (crazy api, opinionated styling)
 - The library is an opinionated representation of material or it isn't very polished
 - The library has been abandoned
 
**The solution:** Use the Google sanctioned javascript Material Design Components and get out of their way.

## Status: in development
RMDC is in development and iterating rapidly. Going to flesh out the entire api surface and then get to some tests. Check indicates at least base features of component are implemented. Looking for help to end this React + Material nightmare.

- [ ] Animation
- [ ] Buttons
  - [x] Standard
  - [ ] FABS
  - [x] Icon Toggles
- [ ] Cards
- [ ] Dialogs
- [ ] Drawers
- [ ] Elevation
- [ ] Grid Lists
- [ ] Inputs and Controls
  - [x] Checkboxes
  - [ ] Form Fields
  - [x] Radio Buttons
  - [x] Select Menus
  - [ ] Sliders
  - [x] Switches
  - [x] Text Fields
- [x] Layout Grids
- [ ] Linear Progress
- [x] Lists
- [x] Menu
- [ ] Ripples
- [ ] Snack Bars
- [ ] Tabs
- [x] Toolbars
- [x] Typography

## Installation
- `npm install git://github.com/jamesmfriedman/rmdc.git#master --save`
- requires the following babel-transforms
  - transform-object-rest-spread
  - ["transform-class-properties", { "spec": true }]
- if you're using Webpack and the babel-loader, make sure to explicity include node_modules/rmdc. This will be rectified with the V1 release

## Usage
```javascript
import React from 'react';
import { Button } from 'rmdc';

const HelloWorld = props => <Button>Easy</Button>
```
