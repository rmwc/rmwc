# Methodology

> RMWC is intended to be an un-opinionated React wrapper around [material-components-web](https://github.com/material-components/material-components-web/)

## Project Goals

* To create the thinnest, lightest, and spec compliant wrapper around Google
  Material Design Components for the Web
  [https://material.io/components/web/](https://material.io/components/web/)
* To utilize the Foundation javascript classes from material-components-web
* To be as unobtrusive and sensible as possible.
* To fill the gaps in material-components-web with custom React community driven components.

## Why?

There are many different Material UI implementations in both Angular and React. The last thing we need is another one... In React land there has been a lot of great work done, but you eventually end up in one of the following situations:

* The library is heavy or extremely inflexible (crazy api, opinionated styling)
* The library is an opinionated representation of material or it isn't very polished
* The library has been abandoned

RMWC's goal is to use the Google sanctioned javascript Material Design Components which are designed, developed, and maintained by Google. Where Google doesn't provide a component, RMWC will include its own React driven components. These will be denoted with an "RMWC Addon" label.

## Breaking Changes

As stated in "Why?", the goal of this library is to be un-opinionated, and that includes opinions about breaking changes that come downstream from material-components-web. While RMWC goes to great lengths to insulate you from  breaking changes through deprecations and warning messages, unfortunately not every breaking change is a candidate for a deprecation.

With that said, you can each release of RMWC is bound to a specific release of material-components-web, so you can safely continue running your current version without upgrading. As of 2.0.0, components are also individually packaged and released. If you have a large code base and want to insulate yourself from change, it is recommended you install one component at a time.

## Basic Layout

Material Components web uses BEM syntax to style and script their components. RMWC directly inherits MDC's naming conventions, so if you can read one, you can infer the other.

Block -> Component
Element -> Components / Children
Modifier -> Props

Here's a TextField example in raw MDC and with RMWC.

```jsx
// The example is from material-components-web
<ul class="mdc-list mdc-list--two-line">
  <li class="mdc-list-item">
    <span class="mdc-list-item__text">
      Two-line item
      <span class="mdc-list-item__secondary-text">Secondary text</span>
    </span>
  </li>
</ul>
```

```jsx
// This is the RMWC version
<List twoLine>
  <ListItem>
    <ListItemPrimaryText>
      Two-line item
    </ListItemPrimaryText>
    <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
  </ListItem>
</List>
```

## Convenience

Even though this is meant to be an un-opinionated wrapper, in some areas decisions had to be made to improve utility and the overall developer experience. At the end of the day, if it doesn't make your life easier, what's the point?

## Something missing from RMWC?

RMWC wraps the entire [material-components-web](https://github.com/material-components/material-components-web) package in React, but because they are different projects with different maintainers, sometimes things can be missed. A lot of components from [material-components-web](https://github.com/material-components/material-components-web) don't require javascript. For these, you can simply use the classNames in your own project. Of course, RMWC wants to cover the entire codebase, so if you see something missing or incorrect, please [file an issue](https://github.com/jamesmfriedman/rmwc/issues/new).

```jsx
/** This will give you a CSS only button and skip RMWC all together */
<button className="mdc-button" />
```
