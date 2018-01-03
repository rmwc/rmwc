# Theme

> MDC Theme is a foundational module that themes MDC Web components.

import from **rmwc/Theme**  
[https://material.io/components/web/catalog/theme/](https://material.io/components/web/catalog/theme/)

Almost every component in RMWC also has a `theme` prop that you can use that takes the same options as the `Theme` component's `use` prop.

```jsx render
import { Theme } from 'rmwc/Theme';

<div>
  <div style={{ backgroundColor: '#ddd' }}>
    {[
      'primary',
      'primary-light',
      'primary-dark',
      'secondary',
      'secondary-light',
      'secondary-dark',
      'background',
      'dark',
      'primary-bg',
      'primary-light-bg',
      'primary-dark-bg',
      'secondary-bg',
      'secondary-light-bg',
      'secondary-dark-bg',
      'text-primary-on-background',
      'text-secondary-on-background',
      'text-hint-on-background',
      'text-disabled-on-background',
      'text-icon-on-background',
      'text-primary-on-light',
      'text-secondary-on-light',
      'text-hint-on-light',
      'text-disabled-on-light',
      'text-icon-on-light'
    ].map((theme, i) => (
      <Theme use={theme} key={i}>
        {theme}
      </Theme>
    ))}
  </div>
  <div style={{ backgroundColor: '#333' }}>
    {[
      'text-primary-on-primary',
      'text-secondary-on-primary',
      'text-hint-on-primary',
      'text-disabled-on-primary',
      'text-icon-on-primary',
      'text-primary-on-secondary',
      'text-secondary-on-secondary',
      'text-hint-on-secondary',
      'text-disabled-on-secondary',
      'text-icon-on-secondary',
      'text-primary-on-dark',
      'text-secondary-on-dark',
      'text-hint-on-dark',
      'text-disabled-on-dark',
      'text-icon-on-dark'
    ].map((theme, i) => (
      <Theme use={theme} key={i}>
        {theme}
      </Theme>
    ))}
  </div>
</div>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Theme" />
```
