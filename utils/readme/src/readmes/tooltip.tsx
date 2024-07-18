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

import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { RMWCProvider } from '@rmwc/provider';
import { RichTooltip, RichTooltipLink, Tooltip } from '@rmwc/tooltip';
import { Icon } from '@rmwc/icon';
import { CollapsibleList, SimpleListItem } from '@rmwc/list';

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
            <IconButton icon="star_border" />
          </Tooltip>

          <Tooltip overlay="Pizza">
            <IconButton icon="favorite_border" />
          </Tooltip>

          <Tooltip overlay="Icecream">
            <IconButton icon="mood" />
          </Tooltip>
        </>
      </DocsExample>

      <DocsSubtitle>Rich</DocsSubtitle>
      <DocsP>
        Default rich tooltips are shown when users hover over or focus on their
        anchor element and remain open on focus/hover. The tooltip will become
        hidden when focus/hover is removed and/or content has been clicked.
      </DocsP>
      <DocsP>Persistent rich tooltips' visibility is toggled by clicks.</DocsP>
      <DocsExample label="Rich overlay with clickable content">
        <RichTooltip
          title="Hello"
          body="I am the content of the interactive rich tooltip"
          actions={<Button>Click me</Button>}
        >
          <IconButton icon="star_border" />
        </RichTooltip>
      </DocsExample>

      <DocsExample label="With links">
        <RichTooltip
          title="My title"
          link={
            <RichTooltipLink href="/" target="_blank">
              Link
            </RichTooltipLink>
          }
        >
          <span role="button">With links</span>
        </RichTooltip>
      </DocsExample>

      <DocsExample label="Persistent">
        <RichTooltip body="I am persistent" isPersistent>
          <button>Popover when I am clicked</button>
        </RichTooltip>
      </DocsExample>

      <DocsSubtitle>Variants</DocsSubtitle>
      <DocsExample label="Styled Content">
        <Tooltip
          overlay={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                width: '5rem',
                height: '8rem',
                color: 'black',
                borderRadius: '3px',
                margin: '0 -3px'
              }}
            >
              Hello world
            </div>
          }
        >
          <span role="button">Popover Window</span>
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

      <DocsSubtitle>Usage with RMWCProvider</DocsSubtitle>
      <DocsP>
        The RMWCProvider allows you to specify global defaults for your
        tooltips.
      </DocsP>

      <DocsExample label="Using Provider">
        <RMWCProvider
          tooltip={{
            align: 'right',
            leaveDelay: 500,
            enterDelay: 0
          }}
        >
          <Tooltip overlay="Hello World!">
            <Button label="With Provider" />
          </Tooltip>
        </RMWCProvider>
      </DocsExample>

      <DocsSubtitle>Portal</DocsSubtitle>
      <DocsP>
        Tooltips are rendered to portal. Below is an example that verifies that
        Tooltip is correctly rendered in a portal, where it would otherwise have
        been hidden.
      </DocsP>

      <DocsExample label="Render to portal">
        <CollapsibleList
          handle={
            <SimpleListItem
              text={
                <>
                  This is a list item
                  <Tooltip overlay={<div>hello world</div>}>
                    <Icon icon="help" />
                  </Tooltip>
                </>
              }
            />
          }
        />
      </DocsExample>

      <DocsExample label="Does not render to portal">
        <CollapsibleList
          handle={
            <SimpleListItem
              text={
                <>
                  This is a list item
                  <Tooltip
                    overlay={<div>hello world</div>}
                    renderToPortal={false}
                  >
                    <Icon icon="help" />
                  </Tooltip>
                </>
              }
            />
          }
        />
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
