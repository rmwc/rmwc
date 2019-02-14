# Radio Buttons

> Radio buttons allow the user to select one option from a set. Use radio buttons for exclusive selection if you think that the user needs to see all available options side-by-side.

- Module **@rmwc/radio**
- Import styles:
   - import **'@material/radio/dist/mdc.radio.css'**;
   - import **'@material/form-field/dist/mdc.form-field.css'**;
- [https://material.io/develop/web/components/input-controls/radio-buttons/](https://material.io/develop/web/components/input-controls/radio-buttons/)

### Controlled Usage

```jsx render
import { Radio } from '@rmwc/radio';

<Radio
  value="cookies"
  checked={this.state.value === 'cookies'}
  onChange={evt => this.setState({value: evt.target.value})}>
  Cookies
</Radio>

<Radio
  value="pizza"
  checked={this.state.value === 'pizza'}
  onChange={evt => this.setState({value: evt.target.value})}>
  Pizza
</Radio>

<Radio
  value="icecream"
  checked={this.state.value === 'icecream'}
  onChange={evt => this.setState({value: evt.target.value})}>
  Icecream
</Radio>
```

### Uncontrolled Usage

You can use Radio Buttons and receive change events without having to manually set the `checked` prop. Just give the Radio components the same `name`. This example also shows using the `label` prop instead of setting the label as a child.

```jsx render
import { Radio } from '@rmwc/radio';

<Radio
  label="Cookies"
  value="cookies"
  name="myRadioGroup"
  onChange={evt => console.log(evt.target.value)}
/>

<Radio
  label="Pizza"
  value="pizza"
  name="myRadioGroup"
  onChange={evt => console.log(evt.target.value)}
/>

<Radio
  label="Icecream"
  value="icecream"
  name="myRadioGroup"
  onChange={evt => console.log(evt.target.value)}
/>
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={['Radio']} />
```
