# Theme

> MDC Theme is a foundational module that themes MDC Web components.

import from **rmwc/Theme**  
[https://material.io/components/web/catalog/theme/](https://material.io/components/web/catalog/theme/)

## Theme Options

```jsx renderOnly
import { Theme } from 'rmwc/Theme';

<div>
  <div style={{ backgroundColor: '#ddd' }}>
    {[
      'primary',
      'secondary',
      'background',
      'primaryBg',
      'secondaryBg',
      'textPrimaryOnBackground',
      'textSecondaryOnBackground',
      'textHintOnBackground',
      'textDisabledOnBackground',
      'textIconOnBackground',
      'textPrimaryOnLight',
      'textSecondaryOnLight',
      'textHintOnLight',
      'textDisabledOnLight',
      'textIconOnLight'
    ].map((theme, i) => (
      <Theme use={theme} key={i}>
        {theme}
      </Theme>
    ))}
  </div>
  <div style={{ backgroundColor: '#333' }}>
    {[
      'onPrimary',
      'onSecondary',
      'textPrimaryOnDark',
      'textSecondaryOnDark',
      'textHintOnDark',
      'textDisabledOnDark',
      'textIconOnDark'
    ].map((theme, i) => (
      <Theme use={theme} key={i}>
        {theme}
      </Theme>
    ))}
  </div>
</div>
```

## ThemeProvider
The `ThemeProvider` is an optional component that allows you to specify theme colors and settings for all of its subtree. This is useful to use once at the top of your app, or in parts of your app where the styles or color scheme differ.

```jsx render
import { ThemeProvider } from 'rmwc/Theme';

import { Button } from 'rmwc/Button';
import { Checkbox } from 'rmwc/Checkbox';
import { Radio } from 'rmwc/Radio';

{/* Without ThemeProvider, the defaults. */}
<div>
  <Button raised>Cookies</Button>
  <Checkbox label="Pizza" defaultChecked />
  <Radio label="Icecream" defaultChecked />
</div>

{/* With ThemeProvider. */}
<ThemeProvider options={{
  primary: 'red',
  secondary: 'blue'
}}>
  <Button raised>Cookies</Button>
  <Checkbox label="Pizza" defaultChecked />
  <Radio label="Icecream" defaultChecked />
</ThemeProvider>

{/* Specify as many options as you want. */}
<ThemeProvider options={{
  primary: 'magenta',
  secondary: 'black',
  onPrimary: '#000',
  textPrimaryOnBackground: 'black'
}}>
  <Button raised>Cookies</Button>
  <Checkbox label="Pizza" defaultChecked />
  <Radio label="Icecream" defaultChecked />
</ThemeProvider>
```
## Theme Component
The Theme component allows you to apply theme colors to RMWC components, or components of your own. Almost every component in RMWC has a `theme` prop that you can use that takes the same options as the `Theme` component's `use` prop.

```jsx render
import { Theme } from 'rmwc/Theme';

import { Button } from 'rmwc/Button';

{/* Add Theme colors to your own components. */}
<Theme use="primaryBg onPrimary" wrap>
  <div style={{width: '4rem', height: '4rem', padding: '1rem'}}>Cookies</div>
</Theme>

{/* These two examples are roughly equivalent. */}
<Theme use="secondaryBg onSecondary" wrap>
  <Button>Pizza</Button>
</Theme>

<Button theme="secondaryBg onSecondary">Pizza</Button>

{/* Text is one of the cases where `wrap` is not required. By default `Theme` will insert `span` tags. */}
<h3>I <Theme use="primary">Want</Theme> <Theme use="secondary">Icecream</Theme></h3>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="ThemeProvider" />
<DocumentComponent displayName="Theme" />
```
