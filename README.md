[![CircleCI](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master.svg?style=shield)](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master)
[![codecov](https://codecov.io/gh/jamesmfriedman/rmwc/branch/master/graph/badge.svg)](https://codecov.io/gh/jamesmfriedman/rmwc)
[![npm](https://img.shields.io/npm/v/rmwc.svg)](https://www.npmjs.com/package/rmwc)
[![npm](https://img.shields.io/npm/l/rmwc.svg)](https://github.com/jamesmfriedman/rmwc/blob/master/LICENSE)
[![Join the chat at https://gitter.im/react-material-web-components/Lobby](https://badges.gitter.im/react-material-web-components/Lobby.svg)](https://gitter.im/react-material-web-components/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# RMWC - React Material Web Components

A React (15 / 16) wrapper for the official Material Design (Web) Components v0.39.0
[https://jamesmfriedman.github.io/rmwc/](https://jamesmfriedman.github.io/rmwc/)

Features:

* [x] Implements Google's official material-components-web library
* [x] Tested in all versions of React ranging from 15.5.x to 16.5.x
* [x] First class Flow Type Support, no extra configuration needed
* [x] First class Typescript support (Beta)
* [x] Server side rendering support
* [x] Individually packaged and released components


## Recent updates

New in 2.0.0: Individually packaged and released components!

2.0.0 does not contain any changes to the components themselves, but it's a major refactor of how RMWC is packaged and deployed. All components have been broken apart into their own npm packages. What this means for you:

- From now on RMWC will honor Semver. Any breaking change to a component (aka prop interface) will bump the major version. This should alleviate some issues people have had with npm greedily auto updating.
- Components can now be individually installed which means they can also be individually upgraded. This further alleviates the pain of a breaking changes by allowing you to upgrade one component at a time at your leisure. 
- Please note that all components will still be versioned and released to together. This means that if any component has a breaking change, the version will be bumped on ALL components, even though they don't contain a breaking change. This is the safest way to guarantee cohesive releases of the library. You'll know that all 3.x.x components are intended to work together.
- The docs have been updated to reflect importing from the new modules, but work has been done to make sure importing from the old syntax (rmwc/Button) still works for the time being. It is recommended that you upgrade to the new syntax at your convenience (@rmwc/button).

View the changelog for detailed updates: [https://github.com/jamesmfriedman/rmwc/blob/master/CHANGELOG.md](https://github.com/jamesmfriedman/rmwc/blob/master/CHANGELOG.md)

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
