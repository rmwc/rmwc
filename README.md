[![CircleCI](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master.svg?style=shield)](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master)
[![npm](https://img.shields.io/npm/v/rmwc.svg)]()
[![npm](https://img.shields.io/npm/l/rmwc.svg)]()
[![Join the chat at https://gitter.im/react-material-web-components/Lobby](https://badges.gitter.im/react-material-web-components/Lobby.svg)](https://gitter.im/react-material-web-components/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# RMWC - React Material Web Components

A React (15 / 16) wrapper for Material Design (Web) Components v0.30.0
[https://jamesmfriedman.github.io/rmwc/](https://jamesmfriedman.github.io/rmwc/)

## Recent updates

RMWC has been updated to MDC 0.30.0 which has several new features but some breaking changes.

* Feature: Chip
  There is a new Chip and ChipSet component for you to use.
* Feature: Standard and Box Select
  There are new stylings for the Select component
* Feature: ButtonIcon
  You can now use the ButtonIcon component to render an Icon inside of a Button
* Breaking Change: cssOnly Select Removal
  MDC has completely removed cssOnly selects. If you relied on the cssOnly Select for mobile, guidance is to wrap the select in your own component that returns a standard CSS select.
* Breaking Change: Menu
  MDC renamed SimpleMenu has been renamed to Menu. In addition to this, RMWC uses the "Simple"Component naming convention and has added a SimpleMenu component that manages state. To upgrade, just rename your exising SimpleMenu components to Menu, or see the new SimpleMenu usage and adjust accordingly.
* Breaking Change: Cards
  MDC has completely reworked their card layouts to be much more minimal. Guidance on this is to use your own CSS to style the content appropriately.
* Breaking Change: Dark Theme
  The automatic dark theme styling and themeDark props have been entirely removed from MDC. Guidance on this is to use your own CSS to style things in a dark theme context.

## Goals

* To create the thinnest, lightest, and spec compliant wrapper around Google
  Material Design Components for the Web
  [https://material.io/components/web/](https://material.io/components/web/)
* To utilize the Foundation javascript classes and expose their api for
  consumption
* To be as unobtrusive and sensible as possible.

## Installation

Required steps

* `npm i rmwc --save` or `yarn add rmwc`
* [material-components-web](https://github.com/material-components/material-components-web) should be installed automatically as a peer dependency. Include `node_modules/material-components-web/dist/material-components-web.min.css` in your project via your method of choice (using a link tag, a css-loader, etc.).

Optional steps

* If you would like to use the default **Roboto font**:
  * add `<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />`
  * add the class `mdc-typography` to the body `<body className="mdc-typography">...</body>`
* If you would like to use the **material-icons** font:
  * add `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
* Add global settings by using the optional `<RMWCProvider />` component at the root of your project. See the 'Provider' section for more info.

Additional information is available in the [Installation Guide](https://jamesmfriedman.github.io/rmwc/installation)

## Usage

Read the docs on how to [Usage](https://jamesmfriedman.github.io/rmwc/usage)

## Why?

Read the docs on [Methodology](https://jamesmfriedman.github.io/rmwc/methodology)

## About Breaking Changes

Read the docs on [Methodology](https://jamesmfriedman.github.io/rmwc/methodology)

## To run the tests

* On MacOS Sierra and higher, install watchman to fix a filesystem issue with
  Jest. `brew install watchman`
* `npm test`

## To run the docs / contribute

* `git clone https://github.com/jamesmfriedman/rmwc.git`
* `cd rmwc`
* `npm install`
* `npm start`
