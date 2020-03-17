[![CircleCI](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master.svg?style=shield)](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master)
[![codecov](https://codecov.io/gh/jamesmfriedman/rmwc/branch/master/graph/badge.svg)](https://codecov.io/gh/jamesmfriedman/rmwc)
[![npm](https://img.shields.io/npm/v/rmwc.svg)](https://www.npmjs.com/package/rmwc)
[![npm](https://img.shields.io/npm/dm/@rmwc/base.svg)](https://www.npmjs.com/package/rmwc)
[![npm](https://img.shields.io/npm/l/rmwc.svg)](https://github.com/jamesmfriedman/rmwc/blob/master/LICENSE)
[![Chat](https://img.shields.io/discord/490680848979591168.svg)](https://discord.gg/4BSUxCW)
[![Backers on Open Collective](https://opencollective.com/rmwc/backers/badge.svg)](#backers) 
[![Sponsors on Open Collective](https://opencollective.com/rmwc/sponsors/badge.svg)](#sponsors) 

# RMWC - React Material Web Components

RMWC is a React UI Kit built on Google's official Material Components Web library v3.x.x
[https://rmwc.io/](https://rmwc.io/)

Features:

* [x] Uses Google's official material-components-web library
* [x] Includes Addon components for ones missing from the official spec
* [x] Works in React 16.3.x and up
* [x] First class Typescript Support
* [x] Server side rendering support
* [x] Individually packaged and released components

## Try it in the Code Sandbox
> - Javascript Sandbox https://codesandbox.io/s/kpy13vqnr
> - Typescript Sandbox https://codesandbox.io/s/kl0w4xp95

## Like this project? Try out some of my others 😎
- A library for simplified Redux development: https://github.com/jamesmfriedman/redux-state-branch
- Feature Flagging made Easy: https://github.com/jamesmfriedman/flagg

## Recent updates
v6.0.0 is coming!

TL;DR
- `npm i rmwc@next` or `npm i @rmwc/button@next`.
- Release is close. Will be switching from alpha to RC within the next week.

Since the creation of RMWC, React and Javascript have continued their blazing pace of change. For context, this project was initially written in FlowTyped with a bunch of classes, and Google's part was plain old JS. Fast forward 2.5 years and React has undergone a paradigm shift with hooks while Typescript continues to expand... Also, a while back, Google released their own React wrapper that was very similar to this project. It was recently declared abandonware which has lead to an increase in interest in RMWC since it should be a relatively simple migration. Needless to say, RMWC needs some love! It's time for some spring cleaning.

The goals of V6 are simple.

- A full internal API rewrite to hooks
- A full internal conversion of components to idiomatic functional React components. Currently there is an abstraction called 'componentFactory' which is a barrier to entry for 3rd party contributors. With this change, anyone wanting to contribute should be able to jump in and get going.
- Removal of all existing deprecations.
- Smaller bundle size
- Better performance
- Some new components :)
- More exhaustive testing

Will it be hard to migrate?

- No, breaking changes will still be kept to a minimum and documented in the migration guide / changelog
- The removal of previously deprecated features will always be considered a breaking change.
- While unit test coverage is fairly high, the change in paradigm from classes to hooks does open up the possibility for unexpected bugs.
- Some of the more enterprising folks that have hacked around the internals of this library to fix or subvert behaviors, so those hacks can't be guaranteed to continue working.

Feel free to kick the tires and get in any feature requests or bugs in the meantime. 5.7.x will continue to receive minor patches and bugfixes until the v6 release.

v5.7.2 is a maintenance release fixing a few non critical bugs

v5.7.0 is out with some great new features and fixes!
- A new Tooltip component has been added
- The Typography component can now use semantic tags defined by RMWCProvider
- Added a fading tab transition as well as tab indicators
- Bugfixes for Selects, Sliders, Lists, and Chips
- Updated all dependencies
- See the changelog for more details.

*View all release notes* 👉 https://opencollective.com/rmwc/updates

View the changelog for detailed updates: [https://github.com/jamesmfriedman/rmwc/blob/master/CHANGELOG.md](https://github.com/jamesmfriedman/rmwc/blob/master/CHANGELOG.md)

## Goals

* To create the thinnest, lightest, and spec compliant wrapper around Google
  Material Design Components for the Web
  [https://material.io/components/web/](https://material.io/components/web/)
* To utilize the Foundation javascript classes from material-components-web
* To be as unobtrusive and sensible as possible.
* To fill the gaps in material-components-web with custom React community driven components.

## Installation

* `npm i rmwc --save` or `yarn add rmwc`

Additional information is available in the [Installation Guide](https://jamesmfriedman.github.io/rmwc/installation)

## Usage

Read the docs on how to [Usage](https://jamesmfriedman.github.io/rmwc/usage)

## Why?

Read the docs on [Methodology](https://jamesmfriedman.github.io/rmwc/methodology)

## About Breaking Changes

RMWC avoids them at all costs!
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

