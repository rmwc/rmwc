# Text Fields

> Text fields allow users to input, edit, and select text.

import from **rmwc/TextField**  
[https://material.io/components/web/catalog/input-controls/text-fields/](https://material.io/components/web/catalog/input-controls/text-fields/)

```jsx render
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';

{/* Standard text field. */}
<TextField label="Write something..." />

{/* Help text can be added to appear on focus. Place it directly after TextField. */}
<TextFieldHelperText>Optional help text.</TextFieldHelperText>

{/* Leading and trailing icons can be used, they look the best with the box prop. */}
<TextField box withLeadingIcon={<TextFieldIcon use="search"/>} label="Write something..." />
<TextField box withTrailingIcon={<TextFieldIcon use="close"/>} label="Write something..." />

{/* You can make the TextField a textarea. */}
<TextField textarea fullwidth label="Multiline..." rows="8" />

{/* You can optionally make HelperText always visible with the persistent prop. */}
<TextFieldHelperText persistent validationMsg>The field is required.</TextFieldHelperText>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="TextField" />
<DocumentComponent displayName="TextFieldIcon" />
<DocumentComponent displayName="TextFieldHelperText" />
```
