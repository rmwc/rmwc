# Contributing to RMWC

RMWC is open source and if you're reading this, it's your job to make it better.

## Development Process

We strive to make developing RMWC as frictionless as possible, both for ourselves and for our community. This section should get you up and running working on the RMWC codebase. Before beginning development, you may want to dive into the source code to get an overall understanding of structure.

### Setting up your development environment

You'll need a recent version of [nodejs](https://nodejs.org/en/) to work on RMWC. We test using the latest node versions, so use the latest where possible. The dev environment is verified to work with Node versions 7 and up.

> **NOTE**: If you expect to commit updated or new dependencies, please ensure you are using npm 5, which will
> also update `package-lock.json` correctly when you install or upgrade packages.

Once node is installed, simply clone our repo (or your fork of it) and run `npm install`. You'll notice you have to install react and react-dom with the no-save option. These are peer dependencies that are not installed automatically.

```
git@github.com:jamesmfriedman/rmwc.git # or a path to your fork
cd rmwc && npm i
```

### Building Components

Each component requires the following items in order to be complete:

* A **index.js** file containing the bulk of the component code. This makes importing easier.
* A **story** using Storybook. This is where the component can be developed in isolation.
* A **test** using enzyme
* A **README.md** named the same as the component with working code examples

### Running development server

#### Local development server

```
npm run start
open http://localhost:3000
```

### Building RMWC

RMWC has a process which runs the components through Babel, and moves them into the root directory before publishing. This allows consumers to import from `rmwc/Button` instead of `rmwc/lib/Button`. The docs are built using Create React Apps build process.

To "build" the library for distribution

```
npm run build
```

To build the umd module

```
npm run build:lib
```

To build the docs

```
npm run build:docs
```

#### Running Tests

Make sure you have the devDependencies installed and then just use `npm test`. This should launch the tests in watch mode and continuously look for changed files to run.

```
npm test
```

### Coding Style

Our entire coding style is enforced automatically through the use of eslint and prettier. You need to use an IDE that supports these plugins or have a way to post process the files with prettier-eslint. VSCode is free and a breeze to use.

### Submitting Pull Requests

When submitting PRs, make sure you're following our commit message conventions.

RMWC uses [generate-changelog](https://www.npmjs.com/package/generate-changelog) to build the CHANGELOG.md file. All commits should only complete a single task and be formatted like the following. Use the most relevant label from generate-changelog, i.e. fix, breaking, docs, chore, etc.

```
type(category): description [flags]

fix(Button): Fixed some terrible bug

chore(Slider): Did something tedious
```

When submitting PRs for large changes, be sure to include an adequate background in the description
so that reviewers of the PR know what the changes entail at a high-level, the motivations for making
these changes, and what they affect.

If you've done some experimental work on your branch/fork and committed these via `git commit --no-verify`, you can rebase them into one correctly-formatted commit before submitting.

Finally, it helps to make sure that your branch/fork is up to date with what's currently on master. You can ensure this by running `git pull --rebase origin master` on your branch.

> **NOTE**: Please do _not merge_ master into your branch. _Always_ `pull --rebase` instead. This ensures a linear history by always putting the work you've done after the work that's already on master, regardless of the date in which those commits were made.
