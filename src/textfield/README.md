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
import { TextField } from '@rmwc/textfield';

{/* Standard text field. */}
<TextField label="standard..." helpText="Optional help text."/>

{/* Leading and trailing icons can be used, they look the best with the box prop. You can pass anything the Icon component accepts. */}
<TextField icon="search" trailingIcon="close" label="icon..." />

{/* If you need full control over the icon, you can pass the icon as options with your own props. Dont forget the TabIndex to make it clickable*/}
<TextField
  label="trailingIcon..." 
  trailingIcon={{
    icon: 'close',
    onClick: () => console.log('Clear')
  }} 
/>

{/* An outlined TextField */}
<TextField outlined label="outlined..." />

{/* A fullWidth input. */}
<TextField fullwidth placeholder="fullWidth..."/>

{/*
  You can make the TextField a textarea. Make sure to include `outlined` for proper styling
  You can optionally make help text always visible by passing an object as props with persistent set to true.
*/}
<TextField textarea outlined fullwidth label="textarea..." rows="8"       
  maxLength={20}
  characterCount
  helpText={{
    persistent: true,
    validationMsg: true,
    children: 'The field is required'
  }}
/>

{/* Disabled text field. */}
<TextField disabled label="disabled..." />

{/* Invalid text fields. */}
<TextField invalid label="Invalid..." value="#@!$" onChange={() => {}}/>
<TextField label="Validate Pattern" pattern="[A-Za-z]{3}"/>

{/* No Label. */}
<TextField placeholder="No label"/>
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
import { DocProps } from '../doc-utils';
import { default as docs}  from './generated-props.json';

<DocProps src={docs} components={['TextField', 'TextFieldIcon', 'TextFieldHelperText']} />
```
