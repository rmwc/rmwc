# Text Fields

> Text fields allow users to input, edit, and select text.

import from **rmwc/TextField**  
[https://material.io/components/web/catalog/input-controls/text-field/](https://material.io/components/web/catalog/input-controls/text-field/)

```jsx render
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';

{/* Standard text field. */}
<TextField label="Write something..." />

{/* Help text can be added to appear on focus. Place it directly after TextField. */}
<TextFieldHelperText>Optional help text.</TextFieldHelperText>

{/* Leading and trailing icons can be used, they look the best with the box prop. You can pass anything the Icon component accepts. */}
<TextField box withLeadingIcon="search" label="Write something..." />

{/* If you need full control over the icon, you can pass TextFieldIcon in and add your own props. */}
<TextField box withTrailingIcon={<TextFieldIcon use="close"/>} label="Write something..." />

{/* An outlined TextField */}
<TextField outlined label="Write something..." />

{/* A fullWidth input. */}
<TextField fullwidth placeholder="Full Width..."/>

{/* You can make the TextField a textarea. */}
<TextField textarea fullwidth label="Multiline..." rows="8" />

{/* You can optionally make HelperText always visible with the persistent prop. */}
<TextFieldHelperText persistent validationMsg>The field is required.</TextFieldHelperText>

{/* Disabled text field. */}
<TextField disabled label="Disabled..." />
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="TextField" />
<DocumentComponent displayName="TextFieldIcon" />
<DocumentComponent displayName="TextFieldHelperText" />
```
