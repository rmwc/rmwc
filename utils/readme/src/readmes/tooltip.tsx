import React from 'react';

import {
  DocProps,
  Docs,
  DocsExample,
  DocsP,
  DocsSubtitle
} from '@rmwc/doc-utils';
import examples from '../generated-examples/tooltip.json';
import propsSrc from '../generated-props/tooltip.json';

import { Avatar } from '@rmwc/avatar';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { RMWCProvider } from '@rmwc/provider';
import {
  RichTooltipActions,
  RichTooltipContent,
  RichTooltipTitle,
  Tooltip
} from '@rmwc/tooltip';

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
        props. This component is not backwards compatible with the tooltip from
        RMWC version 8.x. For a compatible version us the `RCTooltip` component.
        The `RCTooltip` uses the `ReactTooltip` from 'rc-tooltip' package. This
        tooltip uses the standard tooltip component from Google Material for the
        web.
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
      <DocsExample label="Controlled / Always open">
        <Tooltip overlay="Hello" open={true}>
          <IconButton icon="mood" />
        </Tooltip>
      </DocsExample>
      <DocsExample label="Elements as overlay">
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
          disableRichStyling
        >
          <span role="button">S. Rogers</span>
        </Tooltip>
      </DocsExample>
      <DocsExample label="Styled Content">
        <Tooltip
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
              Hello world
            </div>
          }
          disableRichStyling
        >
          <span role="button">Popover Window</span>
        </Tooltip>
      </DocsExample>
      <DocsExample label="Rich overlay with clickable content">
        <Tooltip
          overlay={
            <>
              <RichTooltipTitle>Hello</RichTooltipTitle>
              <RichTooltipContent>
                I am the content of the interactive rich tooltip
              </RichTooltipContent>
              <RichTooltipActions>
                <Button>Click me</Button>
              </RichTooltipActions>
            </>
          }
          stayOpenOnHover
        >
          <span role="button">Popover with clickable content</span>
        </Tooltip>
      </DocsExample>
      <DocsExample label="Persistent">
        <Tooltip
          overlay={
            <RichTooltipContent>
              <div style={{ display: 'flex' }}>
                <Avatar
                  src="images/avatars/blackwidow.png"
                  size="large"
                  name="Margaret Schmidt"
                />
                <div style={{ marginLeft: '0.5rem', width: '100px' }}>
                  <b>Captain America</b>
                  <div>Margaret Schmidt</div>
                </div>
              </div>
            </RichTooltipContent>
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

      <DocsExample label="Alignment">
        <>
          <Tooltip overlay="Align start" align="start">
            <IconButton icon="trip_origin" />
          </Tooltip>
          <Tooltip overlay="Align center" align="center">
            <IconButton icon="trip_origin" />
          </Tooltip>
          <Tooltip overlay="Align end" align="end">
            <IconButton icon="trip_origin" />
          </Tooltip>
          <Tooltip overlay="Align above" align="above">
            <IconButton icon="trip_origin" />
          </Tooltip>
          <Tooltip overlay="Align below" align="below">
            <IconButton icon="trip_origin" />
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
          <Tooltip overlay="Pizza" activateOn="click" isPersistent>
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
  <Tooltip overlay="Favorite RMWC!" open>
    <IconButton icon="favorite_outline" />
  </Tooltip>
);
