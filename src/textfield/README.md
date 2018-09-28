# Text Fields

> Text fields allow users to input, edit, and select text.

- Module **@rmwc/textfield**
- Import styles:
  - import **'@material/textfield/dist/mdc.textfield.css'**;
  - import **'@material/floating-label/dist/mdc.floating-label.css'**;
  - import **'@material/notched-outline/dist/mdc.notched-outline.css'**;
  - import **'@material/line-ripple/dist/mdc.line-ripple.css'**;
- MDC Docs: [https://material.io/develop/web/components/input-controls/text-field/](https://material.io/develop/web/components/input-controls/text-field/)

## Text Field Variants

```jsx render
import { TextField, TextFieldIcon, TextFieldHelperText } from '@rmwc/textfield';

{/* Standard text field. */}
<TextField label="standard..." />

{/* Help text can be added to appear on focus. Place it directly after TextField. */}
<TextFieldHelperText>Optional help text.</TextFieldHelperText>

{/* Leading and trailing icons can be used, they look the best with the box prop. You can pass anything the Icon component accepts. */}
<TextField withLeadingIcon="search" withTrailingIcon="close" label="withLeadingIcon..." />

{/* If you need full control over the icon, you can pass TextFieldIcon in and add your own props. Dont forget the TabIndex to make it clickable*/}
<TextField
  label="withTrailingIcon..." 
  withTrailingIcon={
    <TextFieldIcon
      tabIndex="0"
      icon="close"
      onClick={() => console.log('Clear')}/>
  } 
/>

{/* An outlined TextField */}
<TextField outlined label="outlined..." />

{/* A fullWidth input. */}
<TextField fullwidth placeholder="fullWidth..."/>

{/* You can make the TextField a textarea. */}
<TextField textarea fullwidth label="textarea..." rows="8" />

{/* You can optionally make HelperText always visible with the persistent prop. */}
<TextFieldHelperText persistent validationMsg>The field is required.</TextFieldHelperText>

{/* Disabled text field. */}
<TextField disabled label="disabled..." />

{/* Invalid text fields. */}
<TextField invalid label="Invalid..." value="#@!$" onChange={() => {}}/>
<TextField label="Validate Pattern" pattern="[A-Za-z]{3}"/>
```

## HTML Input Types

A preview of how `material-components-web` handles styling input types for your browser.

```jsx render
import { TextField, TextFieldIcon, TextFieldHelperText } from '@rmwc/textfield';

<TextField label="text" type="text"/>
<TextField label="color" type="color" style={{width: '6rem'}}/>
<TextField label="date" type="date"/>
<TextField label="datetime-local" type="datetime-local"/>
<TextField label="month" type="month"/>
<TextField label="range" type="range"/>
<TextField label="time" type="time"/>
<TextField label="week" type="week"/>
```

```jsx renderOnly
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="TextField" />
<DocumentComponent docs={docs} displayName="TextFieldIcon" composes={['Icon']}/>
<DocumentComponent docs={docs} displayName="TextFieldHelperText" />
```
