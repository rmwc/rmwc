# Theming

> MDC Theme is a foundational module that themes MDC Web components.

-   Module __@rmwc/theme__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/theme/styles';__
    -   Or include stylesheets
        -   __'@material/theme/dist/mdc.theme.css'__;
        -   __'@rmwc/theme/theme.css'__;
-   MDC Docs: [https://material.io/develop/web/components/theme/](https://material.io/develop/web/components/theme/)

## Theme Options

The Theme module fully embraces using CSS variables for runtime theming. This allows for some really powerful usecases like a built in dark mode, custom palettes for your clients, or dynamic configuration for accessibility.

Support for theming inside of `material-components-web` is not without issue, so RMWC maintains a theme fixes file to correct any anomalies for you. Please make sure you include both!

\*\*Important\*\* You should include the theme style sheets BEFORE any of your other styles.

```js

<\>

  <div style\={{ backgroundColor: '#ddd' }}\>

    {\[

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

    \].map((theme, i) \=> (

      <Theme use\={theme} key\={i}\>

        {theme}

      </Theme\>

    ))}

  </div\>

  <div style\={{ backgroundColor: '#333' }}\>

    {\[

      'onPrimary',

      'onSecondary',

      'onError',

      'textPrimaryOnDark',

      'textSecondaryOnDark',

      'textHintOnDark',

      'textDisabledOnDark',

      'textIconOnDark'

    \].map((theme, i) \=> (

      <Theme use\={theme} key\={i}\>

        {theme}

      </Theme\>

    ))}

  </div\>

</\>


```

## ThemeProvider

The `ThemeProvider` is an optional component that allows you to specify theme colors and settings for all of its subtree. This is useful to use once at the top of your app, or in parts of your app where the styles or color scheme differ.

You don't have to pass in all options. The `ThemeProvider` will automatically adjust some of the values like `onSurface` white or black text depending on colors contrast ratio.

Theming in `material-components-web` isn't perfect, but a few basic options will get you most of the way. Try using the ThemePicker at the top and selecting "Shrine". You'll see that most things are colored appropriately, but the defaults provided for things like Buttons and tabs still have to have their colors overridden.

Defaults

```js

<\>

  <Button raised\>Cookies</Button\>

  <Checkbox label\="Pizza" defaultChecked />

  <Radio label\="Icecream" defaultChecked />

</\>


```

With Provider

```js

<ThemeProvider

  options\={{

    primary: 'red',

    secondary: 'blue'

  }}

\>

  <Button raised\>Cookies</Button\>

  <Checkbox label\="Pizza" defaultChecked />

  <Radio label\="Icecream" defaultChecked />

</ThemeProvider\>


```

More Options

```js

<ThemeProvider

  options\={{

    primary: 'lightpink',

    secondary: 'black',

    onPrimary: '#000',

    textPrimaryOnBackground: 'black'

  }}

\>

  <Button raised\>Cookies</Button\>

  <Checkbox label\="Pizza" defaultChecked />

  <Radio label\="Icecream" defaultChecked />

</ThemeProvider\>


```

## Theme Component

The Theme component allows you to apply theme colors to RMWC components, or components of your own. Almost every component in RMWC has a `theme` prop that you can use that takes the same options as the `Theme` component's `use` prop.

Custom

```js

<Theme use\={\['primaryBg', 'onPrimary'\]} wrap\>

  {/\* Add Theme colors to your own components. \*/}

  <div style\={{ width: '4rem', height: '4rem', padding: '1rem' }}\>

    Cookies

  </div\>

</Theme\>


```

Theme Prop

```js

<\>

  {/\* These two examples are roughly equivalent. \*/}

  <Theme use\={\['secondaryBg', 'onSecondary'\]} wrap\>

    <Button\>Pizza</Button\>

  </Theme\>

  <Button theme\={\['secondaryBg', 'onSecondary'\]}\>Pizza</Button\>

</\>


```

Typography

```js

<\>

  {/\* Text is one of the cases where \`wrap\` is not required. By default \`Theme\` will insert \`span\` tags. \*/}

  <h3\>

    I <Theme use\="primary"\>Want</Theme\>{' '}

    <Theme use\="secondary"\>Icecream</Theme\>

  </h3\>

</\>


```

## ThemeProvider

## Theme