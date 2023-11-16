import React from 'react';

import {
  DocProps,
  Docs,
  DocsExample,
  DocsP,
  DocsSubtitle
} from '@rmwc/doc-utils';
import examples from '../generated-examples/rc-tooltip.json';
import propsSrc from '../generated-props/rc-tooltip.json';

import { RCTooltip } from '@rmwc/rc-tooltip';

import { IconButton } from '@rmwc/icon-button';
import { Button } from '@rmwc/button';
import { Avatar } from '@rmwc/avatar';
import { RMWCProvider } from '@rmwc/provider';

export default function Readme() {
  return (
    <Docs
      title="RC Tooltips"
      lead="Tooltips display informative text when users hover over, focus on, or tap an element."
      module="@rmwc/rc-tooltip"
      styles={['@rmwc/rc-tooltip/tooltip.css']}
      examples={examples}
      addon
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>
      <DocsP>
        Wrap any component in a `RCTooltip` and provide the content attribute.
        The only requirement is that is has a single React child, and that the
        child can accept `onMouseEnter`, `onMouseLeave`, `onFocus`, and
        `onClick` props. This is not the standard Google Material for the web
        component, it is here for backwards compability. Use `Tooltip` to use
        the standard Google Material for the web component.
      </DocsP>
      <DocsExample label="Default">
        <>
          <RCTooltip content="Cookies">
            <IconButton icon="star_border" />
          </RCTooltip>

          <RCTooltip content="Pizza">
            <IconButton icon="favorite_border" />
          </RCTooltip>

          <RCTooltip content="Icecream">
            <IconButton icon="mood" />
          </RCTooltip>
        </>
      </DocsExample>

      <DocsSubtitle>Variants</DocsSubtitle>
      <DocsExample label="With Arrow">
        <RCTooltip content="Cake" showArrow>
          <IconButton icon="cake" />
        </RCTooltip>
      </DocsExample>

      <DocsExample label="Controlled / Always open">
        <RCTooltip content="Hello" align="right" open={true}>
          <IconButton icon="mood" />
        </RCTooltip>
      </DocsExample>
      <DocsExample label="Rich Content">
        <RCTooltip
          content={
            <div style={{ display: 'flex' }}>
              <Avatar
                src="images/avatars/captainamerica.png"
                size="large"
                name="Steve Rogers"
              />
              <div style={{ marginLeft: '0.5rem' }}>
                <b>Captain America</b>
                <div>Steve Rogers</div>
              </div>
            </div>
          }
        >
          <span role="button">S. Rogers</span>
        </RCTooltip>
      </DocsExample>
      <DocsExample label="Styled content">
        <RCTooltip
          /** You make something like a popover window by just styling your inner content. */
          content={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                width: '20rem',
                height: '8rem',
                color: 'black',
                borderRadius: '3px',
                margin: '0 -3px'
              }}
            >
              Hello World!
            </div>
          }
        >
          <span role="button">Popover Window</span>
        </RCTooltip>
      </DocsExample>
      <DocsExample label="Delay">
        <>
          <RCTooltip content="Cookies" enterDelay={1000}>
            <Button label="Enter Delay" />
          </RCTooltip>

          <RCTooltip content="Pizza" leaveDelay={1000}>
            <Button label="Leave Delay" />
          </RCTooltip>

          <RCTooltip content="Icecream" enterDelay={1000} leaveDelay={1000}>
            <Button label="Both" />
          </RCTooltip>
        </>
      </DocsExample>
      <DocsExample label="Alignment">
        {/* @ts-ignore */}
        {function AlignmentExample() {
          return [
            'left',
            'right',
            'top',
            'bottom',
            'topLeft',
            'topRight',
            'bottomLeft',
            'bottomRight'
          ].map((align) => (
            //@ts-ignore
            <RCTooltip key={align} content={`Align: ${align}`} align={align}>
              <IconButton icon="trip_origin" />
            </RCTooltip>
          ));
        }}
      </DocsExample>

      <DocsSubtitle>Activation</DocsSubtitle>
      <DocsP>
        By default, tooltips will activate on hover and focus. You can change
        this behavior by passing one or more options to the `activateOn` prop.
      </DocsP>

      <DocsExample label="Default">
        <>
          <RCTooltip content="Cookies" activateOn="hover">
            <Button label="Hover" />
          </RCTooltip>
          ''
          <RCTooltip content="Pizza" activateOn="click">
            <Button label="Click" />
          </RCTooltip>
          <RCTooltip content="Icecream" activateOn="focus">
            <Button label="Focus" />
          </RCTooltip>
          <RCTooltip content="Cake" activateOn={['hover', 'focus']}>
            <Button label="Multiple" />
          </RCTooltip>
        </>
      </DocsExample>

      <DocsSubtitle>Usage with RMWCProvider</DocsSubtitle>
      <DocsP>
        The RMWCProvider allows you to specify global defaults for your
        tooltips.
      </DocsP>

      <DocsExample label="Using Provider">
        <RMWCProvider
          tooltip={{
            align: 'right',
            activateOn: 'hover',
            showArrow: true,
            leaveDelay: 500,
            enterDelay: 0
          }}
        >
          <RCTooltip content="Hello World!">
            <Button label="With Provider" />
          </RCTooltip>
        </RMWCProvider>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Tooltip', component: RCTooltip }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    <RCTooltip content="Favorite RMWC!" open>
      <IconButton icon="favorite_outline" />
    </RCTooltip>
  </>
);
