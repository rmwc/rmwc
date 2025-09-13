import React from 'react';

import { DocProps, Docs, DocsExample } from '@rmwc/doc-utils';
import examples from '../generated-examples/touch-target.json';
import propsSrc from '../generated-props/touch-target.json';

import { Button } from '@rmwc/button';
import { TouchTargetWrapper } from '@rmwc/touch-target';

export default function Readme() {
  return (
    <Docs
      title="Touch Target"
      lead="Touch targets are the parts of the screen that respond to user input. They extend beyond the visual bounds of an element. For example, an icon may appear to be 24 x 24 dp, but the padding surrounding it comprises the full 48 x 48 dp touch target."
      module="@rmwc/touch-target-wrapper"
      styles={['@material/touch-target/styles.scss']}
      docsLink="https://material.io/design/usability/accessibility.html#understanding-accessibility"
      examples={examples}
    >
      <DocsExample label="Default">
        <TouchTargetWrapper>
          <Button label="Button" />
        </TouchTargetWrapper>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'TouchTargetWrapper', component: TouchTargetWrapper }
        ]}
      />
    </Docs>
  );
}
