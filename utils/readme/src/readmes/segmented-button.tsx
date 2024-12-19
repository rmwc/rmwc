import React from 'react';

import { DocProps, Docs, DocsExample } from '@rmwc/doc-utils';

import examples from '../generated-examples/segmented-button.json';
import propsSrc from '../generated-props/segmented-button.json';

import { Segment, SegmentedButton } from '@rmwc/segmented-button';
import { TouchTargetWrapper } from '@rmwc/touch-target';

export default function Readme() {
  return (
    <Docs
      title="Segmented Button"
      lead="Segmented buttons allow users to toggle the selected states of grouped buttons."
      module="@rmwc/segmented-button"
      styles={[
        '@material/segmented-button/dist/mdc.segmented-button.css',
        '@rmwc/icon/icon.css',
        '@material/ripple/dist/mdc.ripple.css',
        '@rmwc/ripple/ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/segmented-button/"
      examples={examples}
    >
      <DocsExample label="Default Multiple Select">
        {/* @ts-ignore */}
        {function Example() {
          const [selected, setSelected] = React.useState({
            cookies: false,
            pizza: false,
            icecream: false
          });
          //@ts-ignore
          const toggleSelected = (key) =>
            //@ts-ignore
            setSelected({ ...selected, [key]: !selected[key] });
          return (
            <SegmentedButton>
              <Segment
                icon="favorite"
                value="cookies"
                onClick={() => toggleSelected('cookies')}
                selected={selected.cookies}
              />
              <Segment
                label="Button"
                value="pizza"
                onClick={() => toggleSelected('pizza')}
                selected={selected.pizza}
              />
              <Segment
                icon="favorite"
                label="Button"
                value="icecream"
                onClick={() => toggleSelected('icecream')}
                selected={selected.icecream}
              />
            </SegmentedButton>
          );
        }}
      </DocsExample>

      <DocsExample label="Single selectable">
        {/* @ts-ignore */}
        {function Example() {
          const [selected, setSelected] = React.useState('icecream');
          return (
            <SegmentedButton selectType="single">
              <Segment
                icon="favorite"
                value="cookies"
                onClick={(evt) => setSelected(evt.currentTarget.value)}
                selected={selected === 'cookies'}
              />
              <Segment
                label="Button"
                value="pizza"
                onClick={(evt) => setSelected(evt.currentTarget.value)}
                selected={selected === 'pizza'}
              />
              <Segment
                icon="favorite"
                label="Button"
                value="icecream"
                onClick={(evt) => setSelected(evt.currentTarget.value)}
                selected={selected === 'icecream'}
              />
            </SegmentedButton>
          );
        }}
      </DocsExample>

      <DocsExample label="Touch Target Wrapper">
        <>
          {/** Wrapping a button in TouchTargetWrapper will automatically set its `touch` prop to true. */}
          <TouchTargetWrapper>
            <Segment>Touch Accessible</Segment>
          </TouchTargetWrapper>
        </>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'SegmentedButton', component: SegmentedButton }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = <SegmentedButton label="Cookie" />;
