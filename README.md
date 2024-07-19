![tests](https://github.com/rmwc/rmwc/actions/workflows/unit-test.yml/badge.svg)
[![codecov](https://codecov.io/gh/rmwc/rmwc/branch/master/graph/badge.svg)](https://codecov.io/gh/rmwc/rmwc)
[![npm](https://img.shields.io/npm/v/rmwc.svg)](https://www.npmjs.com/package/rmwc)
[![npm](https://img.shields.io/npm/dm/@rmwc/base.svg)](https://www.npmjs.com/package/rmwc)
[![npm](https://img.shields.io/npm/l/rmwc.svg)](https://github.com/rmwc/rmwc/blob/master/LICENSE)
[![Chat](https://img.shields.io/discord/490680848979591168.svg)](https://discord.gg/4BSUxCW)

# RMWC - React Material Web Components

RMWC is a React UI Kit built on Google's official Material Components Web library v14.x.x
[https://rmwc.io/](https://rmwc.io/)

Features:

- [x] Uses Google's official material-components-web library
- [x] Includes Addon components for ones missing from the official spec
- [x] Works in React 16.8.x and up
- [x] First class Typescript Support
- [x] Server side rendering support
- [x] Individually packaged and released components

## Try it in the Code Sandbox

> - Javascript Sandbox https://codesandbox.io/s/rmwc-sandbox-o0s0d
> - Typescript Sandbox https://codesandbox.io/s/rmwc-typescript-sandbox-y7516

## Special credit 🥇

RMWC was created by [James Friedman](https://github.com/jamesmfriedman).

Check out his other work at https://github.com/jamesmfriedman.

## Recent updates

v14.3.1 is here! This release includes:

- support for material-components-web v14
- support for react 18
- a new and improved tooltip adhering to the Material Design principles (the old tooltip is renamed to rc-tooltip in favor for the new)
- a new segmented button component
- migrated from Lerna to Nx and Vite ⚡
- various bugfixes introduced in v14.0.0
- accessibility improvements
- the old chip as we know it + the new chip from material v 14.0.0 (currently experimental)
- an improved API for the MDC Tooltip that stays true to the documentation from material-components-web. This also meant removing backwards compatibility to the "old" tooltip that is now known as RCToolip from the RMWC package. This change was for the better, as the Tooltip was buggy due to trying to make two entirely different components compatible. 

View the changelog for detailed updates: [https://github.com/rmwc/rmwc/blob/master/CHANGELOG.md](https://github.com/rmwc/rmwc/blob/master/CHANGELOG.md)

## Goals

- To create the thinnest, lightest, and spec compliant wrapper around Google
  Material Design Components for the Web
  [https://material.io/components/web/](https://material.io/components/web/)
- To utilize the Foundation javascript classes from material-components-web
- To be as unobtrusive and sensible as possible.
- To fill the gaps in material-components-web with custom React community driven components.

## Installation

- `npm i rmwc --save` or `yarn add rmwc`

Additional information is available in the [Installation Guide](https://rmwc.io/installation)

## Usage

Read the docs on how to [Usage](https://rmwc.io/usage)

## Why?

Read the docs on [Methodology](https://rmwc.io/methodology)

## About Breaking Changes

RMWC avoids them at all costs!
Read the docs on [Methodology](https://rmwc.io/methodology)

## To run the tests

- `npm test`

## To run the docs / contribute

- `git clone https://github.com/rmwc/rmwc.git`
- `cd rmwc`
- `npm install`
- `npm start`

## Contributions

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/rmwc/rmwc/graphs/contributors">
<img src="https://contrib.rocks/image?repo=rmwc/rmwc" />
</a>
