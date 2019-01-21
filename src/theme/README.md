# Theme

> MDC Theme is a foundational module that themes MDC Web components.

- Module **@rmwc/theme**  
- Import styles:
  - import **'@material/theme/dist/mdc.theme.css'**;
- MDC Docs: [https://material.io/develop/web/components/theme/](https://material.io/develop/web/components/theme/)

## Theme Options

```jsx renderOnly
import { Theme } from '@rmwc/theme';

<div>
  <div style={{ backgroundColor: '#ddd' }}>
    {[
      'primary',
      'secondary',
      'error',
      'background',
      'surface',
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
      'onError',
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

You don't have to pass in all options. The `ThemeProvider` will automatically adjust some of the values like `onSurface` white or black text depending on colors contrast ratio.

Theming in `material-components-web` isn't perfect, but a few basic options will get you most of the way. Try using the ThemePicker at the top and selecting "Shrine". You'll see that most things are colored appropriately, but the defaults provided for things like Buttons and tabs still have to have their colors overridden.

```jsx render
import { ThemeProvider } from '@rmwc/theme';

import { Button } from '@rmwc/button';
import { Checkbox } from '@rmwc/checkbox';
import { Radio } from '@rmwc/radio';

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
  primary: 'lightpink',
  secondary: 'black',
  onPrimary: '#000',
  textPrimaryOnBackground: 'black'
}}>
  <Button raised>Cookies</Button>
  <Checkbox label="Pizza" defaultChecked />
  <Radio label="Icecream" defaultChecked />
</ThemeProvider>
```

## Using the ThemeProvider to fix built in styles
As stated above, theming in `material-components-web` isn't perfect, but the ThemeProvider can be used to conveniently fix some of the built in style issues. For instance, the Tab bar doesn't respond correctly when used in the TopAppBar or on any other dark color surface.

```jsx render
import { Toolbar, ToolbarRow } from '@rmwc/toolbar';
import { TabBar, Tab } from '@rmwc/tabs';

{/* Broken Tab Bar styles when used in Toolbar / TopAppBar */}
<Toolbar>
  <ToolbarRow>
    <TabBar>
      <Tab>Cookies</Tab>
      <Tab>Pizza</Tab>
      <Tab>Icecream</Tab>
    </TabBar>
  </ToolbarRow>
</Toolbar>

{/* Fixed using ThemeProvider. Use "wrap" to not screw up layout. */}
<Toolbar>
  <ToolbarRow>
    <ThemeProvider options={{primary: 'white', onSurface: 'white'}} wrap>
      <TabBar>
        <Tab>Cookies</Tab>
        <Tab>Pizza</Tab>
        <Tab>Icecream</Tab>
      </TabBar>
    </ThemeProvider>
  </ToolbarRow>
</Toolbar>
```


## Theme Component
The Theme component allows you to apply theme colors to RMWC components, or components of your own. Almost every component in RMWC has a `theme` prop that you can use that takes the same options as the `Theme` component's `use` prop.

```jsx render
import { Theme } from '@rmwc/theme';

import { Button } from '@rmwc/button';

{/* Add Theme colors to your own components. */}
<Theme use={['primaryBg', 'onPrimary']} wrap>
  <div style={{width: '4rem', height: '4rem', padding: '1rem'}}>Cookies</div>
</Theme>

{/* These two examples are roughly equivalent. */}
<Theme use={['secondaryBg', 'onSecondary']} wrap>
  <Button>Pizza</Button>
</Theme>

<Button theme={['primaryBg', 'onPrimary']}>Pizza</Button>

{/* Text is one of the cases where `wrap` is not required. By default `Theme` will insert `span` tags. */}
<h3>I <Theme use="primary">Want</Theme> <Theme use="secondary">Icecream</Theme></h3>
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={['ThemeProvider', 'Theme']} />
```
