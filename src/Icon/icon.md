# Icons

> Material icons use geometric shapes to visually represent core ideas, capabilities, or topics.

import from **rmwc/Icon**

Icons are not part of the official material-components-web spec, but they are referenced many times in the documentation. RMWC provides a declarative way to use icons. Note that RMWC does not ship with any icons of its own. You can include [Material Icons](https://material.io/icons/), any other font icon set, use SVGs, or your own images.

Note, the `use` prop is identical in functionality to passing `children` in all strategies.

## Setup

`RMWCProvider` provides options for setting global defaults for your icon setup. After finding the appropriate stategy to use, you'll likely want to set the defaults here. Please see the "Provider" section for more detail.

## Ligatures

This is for icon fonts that support ligatures like material-icons. This is the default strategy if nothing is set and doesn't require any additional setup if you are using material-icons.

```jsx render
import { Icon } from 'rmwc/Icon';
<Icon strategy="ligature">favorite</Icon>
<Icon strategy="ligature" use="favorite_outline" />
<Icon strategy="ligature" use="star" />
```

## URLs

This is for icons that are accessible via HTTP(S) and will be loaded directly into an `<img>` tag.

```jsx render
import { Icon } from 'rmwc/Icon';
<Icon stategy="url" use="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon" />
```

## Components (Inline SVGs)

This will render a child component inside of the icon. This is useful for all sorts of customizations and for rendering inline SVGs. The following example shows rendering an SVG, as well as an arbitrary `div`.

```jsx render
import { Icon } from 'rmwc/Icon';
<Icon
  strategy="component"
  use={<div style={{ background: 'green', width: '24px', height: '24px', borderRadius: '100px' }} />}
/>
<Icon>
  <svg strategy="component" style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
    <path fill="#60dbfb" d="M12,10.11C13.03,10.11 13.87,10.95 13.87,12C13.87,13 13.03,13.85 12,13.85C10.97,13.85 10.13,13 10.13,12C10.13,10.95 10.97,10.11 12,10.11M7.37,20C8,20.38 9.38,19.8 10.97,18.3C10.45,17.71 9.94,17.07 9.46,16.4C8.64,16.32 7.83,16.2 7.06,16.04C6.55,18.18 6.74,19.65 7.37,20M8.08,14.26L7.79,13.75C7.68,14.04 7.57,14.33 7.5,14.61C7.77,14.67 8.07,14.72 8.38,14.77C8.28,14.6 8.18,14.43 8.08,14.26M14.62,13.5L15.43,12L14.62,10.5C14.32,9.97 14,9.5 13.71,9.03C13.17,9 12.6,9 12,9C11.4,9 10.83,9 10.29,9.03C10,9.5 9.68,9.97 9.38,10.5L8.57,12L9.38,13.5C9.68,14.03 10,14.5 10.29,14.97C10.83,15 11.4,15 12,15C12.6,15 13.17,15 13.71,14.97C14,14.5 14.32,14.03 14.62,13.5M12,6.78C11.81,7 11.61,7.23 11.41,7.5C11.61,7.5 11.8,7.5 12,7.5C12.2,7.5 12.39,7.5 12.59,7.5C12.39,7.23 12.19,7 12,6.78M12,17.22C12.19,17 12.39,16.77 12.59,16.5C12.39,16.5 12.2,16.5 12,16.5C11.8,16.5 11.61,16.5 11.41,16.5C11.61,16.77 11.81,17 12,17.22M16.62,4C16,3.62 14.62,4.2 13.03,5.7C13.55,6.29 14.06,6.93 14.54,7.6C15.36,7.68 16.17,7.8 16.94,7.96C17.45,5.82 17.26,4.35 16.62,4M15.92,9.74L16.21,10.25C16.32,9.96 16.43,9.67 16.5,9.39C16.23,9.33 15.93,9.28 15.62,9.23C15.72,9.4 15.82,9.57 15.92,9.74M17.37,2.69C18.84,3.53 19,5.74 18.38,8.32C20.92,9.07 22.75,10.31 22.75,12C22.75,13.69 20.92,14.93 18.38,15.68C19,18.26 18.84,20.47 17.37,21.31C15.91,22.15 13.92,21.19 12,19.36C10.08,21.19 8.09,22.15 6.62,21.31C5.16,20.47 5,18.26 5.62,15.68C3.08,14.93 1.25,13.69 1.25,12C1.25,10.31 3.08,9.07 5.62,8.32C5,5.74 5.16,3.53 6.62,2.69C8.09,1.85 10.08,2.81 12,4.64C13.92,2.81 15.91,1.85 17.37,2.69M17.08,12C17.42,12.75 17.72,13.5 17.97,14.26C20.07,13.63 21.25,12.73 21.25,12C21.25,11.27 20.07,10.37 17.97,9.74C17.72,10.5 17.42,11.25 17.08,12M6.92,12C6.58,11.25 6.28,10.5 6.03,9.74C3.93,10.37 2.75,11.27 2.75,12C2.75,12.73 3.93,13.63 6.03,14.26C6.28,13.5 6.58,12.75 6.92,12M15.92,14.26C15.82,14.43 15.72,14.6 15.62,14.77C15.93,14.72 16.23,14.67 16.5,14.61C16.43,14.33 16.32,14.04 16.21,13.75L15.92,14.26M13.03,18.3C14.62,19.8 16,20.38 16.62,20C17.26,19.65 17.45,18.18 16.94,16.04C16.17,16.2 15.36,16.32 14.54,16.4C14.06,17.07 13.55,17.71 13.03,18.3M8.08,9.74C8.18,9.57 8.28,9.4 8.38,9.23C8.07,9.28 7.77,9.33 7.5,9.39C7.57,9.67 7.68,9.96 7.79,10.25L8.08,9.74M10.97,5.7C9.38,4.2 8,3.62 7.37,4C6.74,4.35 6.55,5.82 7.06,7.96C7.83,7.8 8.64,7.68 9.46,7.6C9.94,6.93 10.45,6.29 10.97,5.7Z" />
  </svg>
</Icon>
```

## Classnames

Some font icon sets like Ion Icons and Glyph Icons render based on a className that is set. RMWC docs doesn't include extra icon fonts so there is no example to render, but the below code should give you an approximation.

```jsx
import { Icon } from 'rmwc/Icon';
{
  /* Ion Icons <i class="icon ion-star"></i> */
}
<Icon strategy="className" basename="icon" prefix="ion-" use="star" />;

{
  /* Glyphicons <span class="glyphicons glyphicons-heart"></span> */
}
<Icon
  strategy="className"
  basename="glyphicons"
  prefix="glyphicons-"
  use="heart"
/>;
```

## Custom Rendering

Sometimes, you just need to do your own thing. Maybe you have a legacy project that already has icons and you want to incorporate them with RMWC. If none of the other strategies are what you need, then you can hijack the whole thing.

A simplistic example...

```jsx render
import { Icon } from 'rmwc/Icon';
<Icon
  strategy="custom"
  render={({content, ...rest}) => <div>Hello + {content}</div>}
  use="favorite"
  />
```

A more relevant example. Say your app already has a custom Icon component.

```jsx
// 1) Your app has an icon component you use
import { MyIconComponent } from '../Icon';
<MyIconComponent name="search" />;

// 2) Now you are using RMWC, lots of components are instances of Icons
// You could do this, but it would be verbose
import { TextFieldIcon } from 'rmwc/TextField';
import { MyIconComponent } from '../Icon';
<TextFieldIcon use={<MyIconComponent name="search" />} />;

// 3) Instead, you should set the custom strategy to be your default
// and add your own handling with RMWCProvider
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App'; // your main app component
import { RMWCProvider } from 'rmwc/Provider';
import { MyIconComponent } from '../Icon';

const iconRenderHandler = ({ content, className, ...rest }) => {
  // content is the "use" prop

  // className is the fully processed className taking into account the basename and prefix defaults
  // it's important to include this because MDC often has classes like text-field-icon directly
  // on the component for alignment

  // rest is just any other props
  return <MyIconComponent className={className} name={content} {...rest} />;
};

ReactDOM.render(
  <RMWCProvider iconStrategy="custom" iconRender={iconRenderHandler}>
    <App />
  </RMWCProvider>,
  document.getElementById('root'),
);

// 4) Now anywhere in your app that an Icon instance is used, it will be
// delegated to your handler
import { TextFieldIcon } from 'rmwc/TextField';
<TextFieldIcon use="search" />;
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Icon" />
```
