[![CircleCI](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master.svg?style=shield)](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master)
[![codecov](https://codecov.io/gh/jamesmfriedman/rmwc/branch/master/graph/badge.svg)](https://codecov.io/gh/jamesmfriedman/rmwc)
[![npm](https://img.shields.io/npm/v/rmwc.svg)](https://www.npmjs.com/package/rmwc)
[![npm](https://img.shields.io/npm/l/rmwc.svg)](https://github.com/jamesmfriedman/rmwc/blob/master/LICENSE)
[![Chat](https://img.shields.io/discord/490680848979591168.svg)](https://discord.gg/4BSUxCW)
[![Backers on Open Collective](https://opencollective.com/rmwc/backers/badge.svg)](#backers) 
[![Sponsors on Open Collective](https://opencollective.com/rmwc/sponsors/badge.svg)](#sponsors) 

# RMWC - React Material Web Components

A React (15 / 16) wrapper for the official Material Design (Web) Components v0.39.0
[https://jamesmfriedman.github.io/rmwc/](https://jamesmfriedman.github.io/rmwc/)

Features:

* [x] Uses Google's official material-components-web library
* [x] Includes Addon components for ones missing from the official spec
* [x] Works in any version of React from 15.5.x to 16.5.x
* [x] First class Typescript (Beta) and Flow Support
* [x] Server side rendering support
* [x] Individually packaged and released components


## Recent updates

*View all release notes* 👉 https://opencollective.com/rmwc/updates

New in 2.2.0: RMWC Addons!

While the primary goal of wrapping material-components-web remains the same, they simply don't currently (or aren't planning on) supporting the entire spec. New functionality:

- Circular Progress
- Icon Sizing
- Data Tables

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
* To fill the gaps in material-components-web with custom React community driven components.

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
* Add the class `mdc-theme--background` to the `<body>`

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

## Contributions

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/jamesmfriedman/rmwc/graphs/contributors"><img src="https://opencollective.com/rmwc/contributors.svg?width=890&button=false" /></a>


### Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/rmwc#backer)]

<a href="https://opencollective.com/rmwc#backers" target="_blank"><img src="https://opencollective.com/rmwc/backers.svg?width=890"></a>


### Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/rmwc#sponsor)]

<a href="https://opencollective.com/rmwc/sponsor/0/website" target="_blank"><img src="https://opencollective.com/rmwc/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/rmwc/sponsor/1/website" target="_blank"><img src="https://opencollective.com/rmwc/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/rmwc/sponsor/2/website" target="_blank"><img src="https://opencollective.com/rmwc/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/rmwc/sponsor/3/website" target="_blank"><img src="https://opencollective.com/rmwc/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/rmwc/sponsor/4/website" target="_blank"><img src="https://opencollective.com/rmwc/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/rmwc/sponsor/5/website" target="_blank"><img src="https://opencollective.com/rmwc/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/rmwc/sponsor/6/website" target="_blank"><img src="https://opencollective.com/rmwc/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/rmwc/sponsor/7/website" target="_blank"><img src="https://opencollective.com/rmwc/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/rmwc/sponsor/8/website" target="_blank"><img src="https://opencollective.com/rmwc/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/rmwc/sponsor/9/website" target="_blank"><img src="https://opencollective.com/rmwc/sponsor/9/avatar.svg"></a>

