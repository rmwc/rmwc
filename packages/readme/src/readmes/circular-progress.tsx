import React from 'react';

import { DocProps, Docs, DocsExample, DocsSubtitle } from '@rmwc/doc-utils';
import examples from '../generated-examples/circular-progress.json';
import propsSrc from '../generated-props/circular-progress.json';

import { CircularProgress } from '@rmwc/circular-progress';

import { Button } from '@rmwc/button';
import { Chip } from '@rmwc/chip';
import { List, SimpleListItem } from '@rmwc/list';

export default function Readme() {
  return (
    <Docs
      title="Circular Progress"
      lead="Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card."
      module="@rmwc/circular-progress"
      styles={['@rmwc/circular-progress/circular-progress.css']}
      examples={examples}
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>

      <DocsExample label="Indeterminate">
        <CircularProgress />
      </DocsExample>
      <DocsExample label="Determinate">
        <>
          <CircularProgress progress={0.3} />
          <CircularProgress progress={0.6} />
          <CircularProgress progress={0.9} />
          <CircularProgress progress={1} />
        </>
      </DocsExample>

      <DocsSubtitle>Sizing</DocsSubtitle>

      <DocsExample label="Sizes">
        <>
          <CircularProgress size="xsmall" />
          <CircularProgress size="small" />
          <CircularProgress size="medium" />
          <CircularProgress size="large" />
          <CircularProgress size="xlarge" />
          <CircularProgress size={72} />
        </>
      </DocsExample>

      <DocsSubtitle>Usage with other components</DocsSubtitle>

      <DocsExample>
        <>
          <Button
            icon={<CircularProgress theme="secondary" />}
            label="Cookies"
          />

          <List>
            <SimpleListItem graphic={<CircularProgress />} text="Pizza" />
            <SimpleListItem graphic="favorite" text="Icecream" />
          </List>

          <Chip icon={<CircularProgress size="xsmall" />} label="Donuts" />
        </>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'CircularProgress', component: CircularProgress }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    {[0.3, 0.6, 0.9].map((num) => (
      <CircularProgress
        key={num}
        style={{ margin: '0.4rem' }}
        progress={num}
        size="large"
      />
    ))}
  </>
);
