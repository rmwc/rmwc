# Text Fields

> Text fields allow users to input, edit, and select text.

- import from **rmwc/TextField**  
- import styles from **@material/textfield/dist/mdc.textfield.css**
- [https://material.io/develop/web/components/input-controls/text-field/](https://material.io/develop/web/components/input-controls/text-field/)

## Text Field Variants

```jsx render
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';

{/* Standard text field. */}
<TextField label="standard..." />

{/* Help text can be added to appear on focus. Place it directly after TextField. */}
<TextFieldHelperText>Optional help text.</TextFieldHelperText>

{/* Leading and trailing icons can be used, they look the best with the box prop. You can pass anything the Icon component accepts. */}
<TextField box withLeadingIcon="search" label="box withLeadingIcon..." />

{/* If you need full control over the icon, you can pass TextFieldIcon in and add your own props. */}
<TextField box withTrailingIcon={<TextFieldIcon icon="close"/>} label="box withTrailingIcon..." />

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
```

## HTML Input Types

A preview of how `material-components-web` handles styling input types for your browser.

```jsx render
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';

<TextField box label="text" type="text"/>
<TextField box label="color" type="color" style={{width: '6rem'}}/>
<TextField box label="date" type="date"/>
<TextField box label="datetime-local" type="datetime-local"/>
<TextField box label="month" type="month"/>
<TextField box label="range" type="range"/>
<TextField box label="time" type="time"/>
<TextField box label="week" type="week"/>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="TextField" />
<DocumentComponent displayName="TextFieldIcon" />
<DocumentComponent displayName="TextFieldHelperText" />
```
