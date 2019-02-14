[![CircleCI](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master.svg?style=shield)](https://circleci.com/gh/jamesmfriedman/rmwc/tree/master)
[![codecov](https://codecov.io/gh/jamesmfriedman/rmwc/branch/master/graph/badge.svg)](https://codecov.io/gh/jamesmfriedman/rmwc)
[![npm](https://img.shields.io/npm/v/rmwc.svg)](https://www.npmjs.com/package/rmwc)
[![npm](https://img.shields.io/npm/l/rmwc.svg)](https://github.com/jamesmfriedman/rmwc/blob/master/LICENSE)
[![Chat](https://img.shields.io/discord/490680848979591168.svg)](https://discord.gg/4BSUxCW)
[![Backers on Open Collective](https://opencollective.com/rmwc/backers/badge.svg)](#backers) 
[![Sponsors on Open Collective](https://opencollective.com/rmwc/sponsors/badge.svg)](#sponsors) 

# RMWC - React Material Web Components

A React wrapper for the official Material Design (Web) Components v0.44.0
[https://jamesmfriedman.github.io/rmwc/](https://jamesmfriedman.github.io/rmwc/)

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

## Recent updates

V5 is officially out! RMWC has been completely rewritten in Typescript while also knocking out about a years worth of tech debt and improving things across the board. You can expect better typing, better performance, better integration with material-components-web, and just better everything. All of this was done with as few breaking changes as possible, so upgrading should be relatively painless. A few caveats:

Your quick migration guide:

- React 16.3 is the new min version to take advantage of React Fragments, Ref Forwarding, and the new Context Api. If you need React 15 support, you'll have to stay on 4.x.x and below.
- The library has been rewritten in Typescript instead of Flow. At this time, Flow types are no longer supported. Please comment on issue #407 If you're interested in bringing these back
- Changelog couldn't be generated for this release, see the release notes for the full details 🚀 https://opencollective.com/rmwc/updates/5-0-0-a-giant-leap-for-rmwc

*View all release notes* 👉 https://opencollective.com/rmwc/updates

View the changelog for detailed updates: [https://github.com/jamesmfriedman/rmwc/blob/master/CHANGELOG.md](https://github.com/jamesmfriedman/rmwc/blob/master/CHANGELOG.md)

## Goals

* To create the thinnest, lightest, and spec compliant wrapper around Google
  Material Design Components for the Web
  [https://material.io/components/web/](https://material.io/components/web/)
* To utilize the Foundation javascript classes from material-components-web
* To be as unobtrusive and sensible as possible.
* To fill the gaps in material-components-web with custom React community driven components.

### *Doesn't Google have their own React Wrapper?*

Yes, and here are the differences.

* [x] RMWC is feature complete! It contains all of the components in the MDC catalog.
* [x] RMWC Includes Addon components for ones missing from the official spec
* [x] RMWC 4.x.x and below supports React 15
* [x] RMWC 4.x.x includes Flow support
* [x] RMWC has tested server side rendering support
* [x] RMWC favors deprecations over breaking changes whenever possible
* [x] RMWC has interactive polished documentation
* [x] RMWC is about 8 months older than Google's.
* [x] RMWC is being used by by companies of all sizes with all sorts of use cases, it's not going anywhere.

The MDC team has been nothing but collaborative and kind, even in pursuing their own React wrapper. Both libraries individually package components, so you can use this one, that one, or a mix of both if you want to. There are multiple production apps running RMWC, so this library will continue to exist and be improved. Hopefully in the future there can be a convergence point, but in the meantime you can weigh both libraries on their own merits.

## Installation

* `npm i rmwc --save` or `yarn add rmwc`

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

