# Methodology

> RMWC is intended to be an unopinionated React wrapper around [material-components-web](https://github.com/material-components/material-components-web/)

## Project Goals

* To create the thinnest, lightest, and spec compliant wrapper around Google Material Design Components for the Web https://material.io/components/web/
* To utilize the Foundation javascript classes and expose their api for consumption
* To be as unobtrusive and sensible as possible.

## Why?

There are many different Material UI implementations in both Angular and React. The last thing we need is another one... In React land there has been a lot of great work done, but you eventually end up in one of the following situations:

* The library is heavy or extremely inflexible (crazy api, opinionated styling)
* The library is an opinionated representation of material or it isn't very polished
* The library has been abandoned

RMWC's goal is to use the Google sanctioned javascript Material Design Components which are designed, developed, and maintained by Google.

## Breaking Changes

As stated in "Why?", the goal of this library is to be unopinionated, and that includes opinions about breaking changes that come downstream from material-components-web. In the future, steps may be taken to insulate consumers by providing a deprecation path, but for the time being please make sure your keep eyes on the official MDC Changelog and RMWC will do its best to also keep its changelog up to date.

With that said, you can each release of RMWC is bound to a specific release of material-components-web, so you can safely continue running your current version without upgrading.

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
    <ListItemText>
      Two-line item
      <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
</List>
```

## Convenient additions

Even though this is meant to be an unopinionated wrapper, in some areas decisions had to be made to improve utility and the overall developer experience. At the end of the day, if it doesn't make your life easier, what's the point? Any non-standard item will be called out in the docs.

## Something missing from RMWC?

RMWC wraps the entire [material-components-web](https://github.com/material-components/material-components-web) package in React, but because they are different projects with different maintainers, sometimes things can be missed. A lot of components from [material-components-web](https://github.com/material-components/material-components-web) don't require javascript. For these, you can simply use the classNames in your own project. Of course, RMWC wants to cover the entire codebase, so if you see something missing or incorrect, please [file an issue](https://github.com/jamesmfriedman/rmwc/issues/new).

```jsx
/** This will give you a CSS only button and skip RMWC all together */
<button className="mdc-button" />
```
