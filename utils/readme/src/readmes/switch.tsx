import React from 'react';

import { DocProps, Docs, DocsExample, DocsP } from '@rmwc/doc-utils';
import examples from '../generated-examples/switch.json';
import propsSrc from '../generated-props/switch.json';

import { Switch } from '@rmwc/switch';

export default function Readme() {
  return (
    <Docs
      title="Switches"
      lead="On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switches take on the same visual properties of the radio button."
      module="@rmwc/switch"
      styles={[
        '@material/switch/dist/mdc.switch.css',
        '@material/form-field/dist/mdc.form-field.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/input-controls/switches/"
      examples={examples}
    >
      <DocsP>
        Switches are identical in function to the Checkbox component, they just
        present a different UI / UX paradigm.
      </DocsP>

      <DocsExample label="Uncontrolled">
        <Switch defaultChecked label="Pizza" />
      </DocsExample>
      <DocsExample label="Controlled">
        {/* @ts-ignore */}
        {function Example() {
          const [checked, setChecked] = React.useState(false);

          return (
            <Switch
              checked={checked}
              onClick={(evt) => setChecked((c) => !c)}
              label="Cookies"
            />
          );
        }}
      </DocsExample>

      <DocsExample label="Label as Child">
        <Switch>Icecream</Switch>
      </DocsExample>

      <DocsExample label="Disabled">
        <>
          <Switch disabled label="Disabled" />
          <Switch disabled defaultChecked label="Disabled" />
        </>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Switch', component: Switch }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    <div style={{ marginBottom: '1rem' }}>
      <Switch checked />
    </div>
    <Switch />
  </>
);
