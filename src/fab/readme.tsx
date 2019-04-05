import React from 'react';

import { Docs, DocsExample, DocProps } from '../doc-utils';
import * as propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Fab } from '.';

export default function() {
  return (
    <Docs
      title="Fabs"
      module="@rmwc/fab"
      styles={['@material/fab/dist/mdc.fab.css']}
      docsLink="https://material.io/develop/web/components/buttons/floating-action-buttons/"
    >
      <DocsExample src={examples} label="Default">
        <Fab icon="favorite" />
      </DocsExample>
      <DocsExample src={examples} label="Mini">
        <Fab icon="favorite" mini />
      </DocsExample>
      <DocsExample src={examples} label="Extended">
        <>
          <Fab icon="add" label="Create" />
          <Fab trailingIcon="add" label="Create" />
          <Fab label="Label only" />
        </>
      </DocsExample>
      <DocsExample src={examples} label="Theming">
        <>
          <Fab icon="favorite_outline" theme={['primaryBg', 'onPrimary']} />
          <Fab
            icon="delete"
            style={{ backgroundColor: 'var(--mdc-theme-error)' }}
            theme={['onError']}
          />
        </>
      </DocsExample>

      <DocProps src={propsSrc} components={['Fab']} />
    </Docs>
  );
}
