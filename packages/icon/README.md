# Icon Buttons

Icon buttons allow users to take actions, and make choices, with a single tap.

- Module **@rmwc/icon-button**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/icon-button/styles';
  - Or include stylesheets
    - **'@material/icon-button/dist/mdc.icon-button.css'**
    - **'@rmwc/icon/icon.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/buttons/icon-buttons/](https://material.io/develop/web/components/buttons/icon-buttons/)

## Basic Usage

`IconButton` inherits from the `Icon` component and can be passed icons in the same way.

```jsx
<>
  <IconButton icon="star" label="Rate this!" />

  <IconButton icon="favorite" label="Favorite" disabled />

  <IconButton
    icon="images/icons/twitter.png"
    aria-label="Tweet it!"
    tag="a"
    target="_blank"
    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
      'You should definitely be using RMWC for your next project! https://rmwc.io'
    )}`}
  />
</>
```

## Usage as a Toggle

To use as a toggle, specify an additional toggled on state using 'onIcon'.

```jsx
<>
  <IconButton icon="favorite_border" onIcon="favorite" />
  <IconButton icon="favorite" onIcon="favorite" disabled />
</>
```

```jsx
function Controlled() {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <>
      <IconButton
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        onIcon="star"
        icon="star_border"
      />

      <IconButton
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        onIcon="images/icons/twitter.png"
        icon="images/icons/facebook.png"
      />
    </>
  );
}
```

```jsx
<IconButton
  onIcon={
    <div
      style={{
        background: 'red',
        width: '24px',
        height: '24px'
      }}
    />
  }
  icon={
    <div
      style={{
        background: 'green',
        width: '24px',
        height: '24px',
        borderRadius: '50%'
      }}
    />
  }
/>
```

## IconButton

An IconButton component that can also be used as a toggle.

### Props

| Name            | Type                                      | Description                                                                       |
| --------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| `checked`       | `boolean`                                 | Controls the on / off state of the a toggleable button.                           |
| `disabled`      | `boolean`                                 | Makes the button disabled                                                         |
| `foundationRef` | `Ref<MDCIconButtonToggleFoundation<>>`    | Advanced: A reference to the MDCFoundation. Only for Toggleable buttons.          |
| `icon`          | `IconPropT`                               | Icon for the button                                                               |
| `label`         | `string`                                  | Apply an aria label.                                                              |
| `onChange`      | `(evt: IconButtonOnChangeEventT) => void` | An onChange callback that receives a custom event. evt.detail = { isOn: boolean } |
| `onIcon`        | `IconPropT`                               | If specified, renders a toggle with this icon as the on state.                    |
| `ripple`        | `RipplePropT`                             | Adds a ripple effect to the component                                             |

icon="favorite_outline" />
{/_ Example showing how to set the strategy explicitly _/}
<Icon icon={{ icon: 'star', strategy: 'ligature' }} />
</>

````

## URLs

This is for icons that are accessible via HTTP(S) and will be loaded directly into an `img` tag. This can be auto-detected for things that look like urls. The image will be set as a backgroundImage of the icon. Make sure you impor the RMWC icon css file for this to work properly.

```jsx
<>
  {/** Auto detection */}
  <Icon icon="images/icons/twitter.png" />
  {/** Explicit */}
  <Icon
    icon={{
      icon: 'images/icons/twitter.png',
      strategy: 'url'
    }}
  />
</>
````

## Components / Inline SVGs

This will render a child component inside of the icon. This is useful for all sorts of customization and for rendering inline SVGs. The following example shows rendering an SVG, as well as an arbitrary `div`.

```jsx
<>
  {/** Auto detection */}
  <Icon
    icon={
      <div
        style={{
          background: 'green',
          width: '24px',
          height: '24px',
          borderRadius: '100px'
        }}
      />
    }
  />
  {/** Explicit */}
  <Icon
    icon={{
      strategy: 'component',
      icon: (
        <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
          />
        </svg>
      )
    }}
  />
</>
```

## Classnames

Some font icon sets like Ion Icons and Glyph Icons render based on a className that is set. RMWC docs doesn't include extra icon fonts so there is no example to render, but the below code should give you an approximation.

**THIS CANNOT BE AUTO DETECTED**. You'll have to explicitly set the strategy directly on the Icon or specify it globally via the RMWCProvider.

```jsx
<>
  {/* Ion Icons <i class="icon ion-star"></i> */}
  <Icon
    icon={{
      icon: 'star',
      strategy: 'className',
      basename: 'icon',
      prefix: 'ion-'
    }}
  />
  {/**
   * Set the option globally throug RMWCProvider
   * Glyphicons <span class="glyphicons glyphicons-heart"></span>
   **/}
  <RMWCProvider
    icon={{
      strategy: 'className',
      basename: 'glyphicons',
      prefix: 'glyphicons-'
    }}
  >
    <Icon icon="heart" />
  </RMWCProvider>
</>
```

## Custom Rendering

Sometimes, you just need to do your own thing. Maybe you have a legacy project that already has icons and you want to incorporate them with RMWC. If none of the other strategies are what you need, then you can hijack the whole thing and delegate it to your own render function.

```jsx
<Icon
  icon={{
    icon: 'favorite',
    strategy: 'custom',
    render: ({ content }) => <div>Hello + {content}</div>
  }}
/>
```

A more relevant example involves an app that has a custom / existing icon component. There are a litany of reasons why your app might need one, but if you've found this section of the docs you likely know what problem you need to solve.

```jsx
`
  // 1) Your app has an icon component you use
  import { MyIconComponent } from '@rmwc/icon';
  <MyIconComponent name="search" />

  // 2) Now you are using RMWC, lots of components are instances of Icons
  // You need to be able to delegate the handling of an icon prop to your own component
  import { TextField } from '@rmwc/textField';
  import { Chip } from '@rmwc/chip';
  <TextField icon="favorite" />
  <Chip icon="favorite" />

  // 3) Instead, you should set the custom strategy to be your default
  // and add your own handling with RMWCProvider
  import React from 'react';
  import * as ReactDOM from 'react-dom';
  import App from './App'; // your main app component
  import { RMWCProvider } from '@rmwc/provider';
  import { MyIconComponent } from '@rmwc/icon';

  const iconRenderHandler = ({ content, className, ...rest }) => {
    // content is whatever was passed to the icon prop

    // className is the fully processed className taking into account the basename and prefix defaults
    // it's important to include this because MDC often has classes like text-field-icon directly
    // on the component for alignment

    // rest is just any other props
    return <MyIconComponent className={className} name={content} {...rest} />
  };

  ReactDOM.render(
    <RMWCProvider icon={{strategy: 'custom', render: iconRenderHandler}}>
      <App />
    </RMWCProvider>,
    document.getElementById('root')
  );

  // 4) Now anywhere in your app that an Icon instance is used, it will be
  // delegated to your handler and render your custom component
  import { TextFieldIcon } from '@rmwc/textfield';
  <TextFieldIcon icon="search" />
`;
```

## Icon

An Icon component. Most of these options can be set once globally, read the documentation on Provider for more info.

### Props

| Name   | Type        | Description                                                                                            |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------ |
| `icon` | `IconPropT` | The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. |
