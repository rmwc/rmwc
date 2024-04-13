import React from 'react';

import { DocProps, Docs, DocsExample, DocsSubtitle } from '@rmwc/doc-utils';
import examples from '../generated-examples/circular-progress.json';
import propsSrc from '../generated-props/circular-progress.json';

import { CircularProgress } from '@rmwc/circular-progress';

import { Button } from '@rmwc/button';
import { Chip, ChipSet } from '@rmwc/chip';
import { List, SimpleListItem } from '@rmwc/list';

export default function Readme() {
  return (
    <Docs
      title="Circular Progress"
      lead="Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card."
      module="@rmwc/circular-progress"
      styles={[
        '@material/circular-progress/dist/mdc.circular-progress.css',
        '@rmwc/circular-progress/circular-progress.css'
      ]}
      examples={examples}
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>

      <DocsExample label="Indeterminate">
        <CircularProgress label="progress" />
      </DocsExample>
      <DocsExample label="Determinate">
        <>
          <CircularProgress label="progress" progress={0.3} />
          <CircularProgress label="progress" progress={0.6} />
          <CircularProgress label="progress" progress={0.9} />
          <CircularProgress label="progress" progress={1} />
        </>
      </DocsExample>

      <DocsSubtitle>Sizing</DocsSubtitle>

      <DocsExample label="Sizes">
        <>
          <CircularProgress label="xsmall progress" size="xsmall" />
          <CircularProgress label="small progress" size="small" />
          <CircularProgress label="medium progress" size="medium" />
          <CircularProgress label="large progress" size="large" />
          <CircularProgress label="xlarge progress" size="xlarge" />
          <CircularProgress label="progress" size={72} />
        </>
      </DocsExample>

      <DocsSubtitle>Usage with other components</DocsSubtitle>

      <DocsExample>
        <>
          <Button
            icon={<CircularProgress label="progress" theme="secondary" />}
            label="Cookies"
          />

          <List>
            <SimpleListItem
              graphic={<CircularProgress label="progress" />}
              text="Pizza"
            />
            <SimpleListItem graphic="favorite" text="Icecream" />
          </List>

          <ChipSet>
            <Chip
              icon={<CircularProgress label="progress" size="xsmall" />}
              label="Donuts"
            />
          </ChipSet>
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
        label="progress"
        key={num}
        style={{ margin: '0.4rem' }}
        progress={num}
        size="large"
      />
    ))}
  </>
);
