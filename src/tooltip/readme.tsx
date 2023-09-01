import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Tooltip } from '.';
import { IconButton } from '../icon-button';
import { Button } from '../button';
import { Avatar } from '../avatar';
import { RMWCProvider } from '../provider';

export default function Readme() {
  return (
    <Docs
      title="Tooltips"
      lead="Tooltips display informative text when users hover over, focus on, or tap an element."
      module="@rmwc/tooltip"
      styles={[
        '@material/tooltip/dist/mdc.tooltip.css',
        '@rmwc/tooltip/tooltip.css'
      ]}
      examples={examples}
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>
      <DocsP>
        Wrap any component in a `Tooltip` and provide the overlay attribute. The
        only requirement is that is has a single React child, and that the child
        can accept `onMouseEnter`, `onMouseLeave`, `onFocus`, and `onClick`
        props.
      </DocsP>
      <DocsExample label="Default">
        <>
          <Tooltip overlay="Cookies">
            <IconButton icon="star_border" aria-describedby="tooltip-id" />
          </Tooltip>

          <Tooltip overlay="Pizza">
            <IconButton icon="favorite_border" />
          </Tooltip>

          <Tooltip overlay="Icecream">
            <IconButton icon="mood" />
          </Tooltip>
        </>
      </DocsExample>

      <DocsSubtitle>Variants</DocsSubtitle>
      <DocsExample label="With Arrow">
        <Tooltip overlay="Cake" showArrow>
          <IconButton icon="cake" />
        </Tooltip>
      </DocsExample>
      <DocsExample label="Controlled / Always open">
        <Tooltip overlay="Hello" open={true}>
          <IconButton icon="mood" />
        </Tooltip>
      </DocsExample>
      <DocsExample label="Rich overlay">
        <Tooltip
          overlay={
            <div style={{ display: 'flex' }}>
              <Avatar
                src="images/avatars/captainamerica.png"
                size="large"
                name="Steve Rogers"
              />
              <div style={{ marginLeft: '0.5rem', width: '100px' }}>
                <b>Captain America</b>
                <div>Steve Rogers</div>
              </div>
            </div>
          }
        >
          <span role="button">S. Rogers</span>
        </Tooltip>
      </DocsExample>
      <DocsExample label="Styled overlay">
        <Tooltip
          // You make something like a popover window by just styling your inner overlay.
          overlay={
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
              <Button onClick={() => console.log('Popover was clicked')}>
                Click me
              </Button>
            </div>
          }
        >
          <span role="button">Popover Window with clickable overlay</span>
        </Tooltip>
      </DocsExample>
      <DocsExample label="Persistent">
        <Tooltip
          // You make something like a popover window by just styling your inner overlay.
          overlay={
            <div style={{ display: 'flex' }}>
              <Avatar
                src="images/avatars/captainamerica.png"
                size="large"
                name="Steve Rogers"
              />
              <div style={{ marginLeft: '0.5rem', width: '100px' }}>
                <b>Captain America</b>
                <div>Steve Rogers</div>
              </div>
            </div>
          }
          isPersistent
        >
          <span role="button">Popover when I am clicked</span>
        </Tooltip>
      </DocsExample>
      <DocsExample label="Delay">
        <>
          <Tooltip overlay="Cookies" enterDelay={1000}>
            <Button label="Enter Delay" />
          </Tooltip>

          <Tooltip overlay="Pizza" leaveDelay={1000}>
            <Button label="Leave Delay" />
          </Tooltip>

          <Tooltip overlay="Icecream" enterDelay={1000} leaveDelay={1000}>
            <Button label="Both" />
          </Tooltip>
        </>
      </DocsExample>

      <DocsSubtitle>Activation</DocsSubtitle>
      <DocsP>
        By default, tooltips will activate on hover and focus. You can change
        this behavior by passing one or more options to the `activateOn` prop.
      </DocsP>

      <DocsExample label="Default">
        <>
          <Tooltip overlay="Cookies" activateOn="hover">
            <Button label="Hover" />
          </Tooltip>
          ''
          <Tooltip overlay="Pizza" activateOn="click">
            <Button label="Click" />
          </Tooltip>
          <Tooltip overlay="Icecream" activateOn="focus">
            <Button label="Focus" />
          </Tooltip>
          <Tooltip overlay="Cake" activateOn={['hover', 'focus']}>
            <Button label="Multiple" />
          </Tooltip>
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
            leaveDelay: 500,
            enterDelay: 0
          }}
        >
          <Tooltip overlay="Hello World!">
            <Button label="With Provider" />
          </Tooltip>
        </RMWCProvider>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Tooltip', component: Tooltip }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    <Tooltip overlay="Favorite RMWC!" open>
      <IconButton icon="favorite_outline" />
    </Tooltip>
  </>
);
