import React from 'react';

import {
  DocProps,
  Docs,
  DocsExample,
  DocsP,
  DocsSubtitle
} from '@rmwc/doc-utils';
import examples from '../generated-examples/list-collapsible.json';
import propsSrc from '../generated-props/list.json';

import { IconButton } from '@rmwc/icon-button';
import { CollapsibleList, List, SimpleListItem } from '@rmwc/list';

export default function Readme() {
  return (
    <Docs
      title="Collapsible Lists"
      lead="Lists are continuous, vertical indexes of text or images."
      module="@rmwc/list"
      styles={[
        '@material/list/dist/mdc.list.css',
        '@rmwc/icon/icon.css',
        '@material/ripple/dist/mdc.ripple.css',
        '@rmwc/ripple/ripple.css',
        '@rmwc/list/collapsible-list.css',
        '@rmwc/list/list-item.css'
      ]}
      examples={examples}
      addon
    >
      <DocsP>
        Collapsible lists aren't part of the material spec, but they've been
        added to RMWC after continuing requests from the community. They present
        an accordion style navigation element to progressively reveal content.
        They've have been built to work with the `List` and `ListItem`
        components in regards to keyboard events and styling, but they
        technically be used with any kind of content.
      </DocsP>

      <DocsExample>
        <List>
          <CollapsibleList
            handle={
              <SimpleListItem
                text="Cookies"
                graphic="favorite"
                metaIcon="chevron_right"
              />
            }
            onOpen={() => console.log('open')}
            onClose={() => console.log('close')}
          >
            <SimpleListItem text="Chocolate Chip" />
            <SimpleListItem text="Ginger Snap" />
            <SimpleListItem text="Peanut Butter" />
          </CollapsibleList>

          <CollapsibleList
            handle={
              <SimpleListItem
                text="Pizza"
                graphic="local_pizza"
                metaIcon="chevron_right"
              />
            }
          >
            <SimpleListItem text="Cheese" />
            <SimpleListItem text="Pepperoni" />
            <SimpleListItem text="Supreme" />
          </CollapsibleList>

          <CollapsibleList
            handle={
              <SimpleListItem
                text="Icecream"
                graphic="star"
                metaIcon="chevron_right"
              />
            }
          >
            <SimpleListItem text="Vanilla" />
            <SimpleListItem text="Chocolate" />
            <CollapsibleList
              handle={
                <SimpleListItem
                  text="Nested Collapsible"
                  graphic="touch_app"
                  metaIcon="chevron_right"
                />
              }
            >
              <SimpleListItem text="Orange" />
              <SimpleListItem text="Strawberry" />
              <SimpleListItem text="Blueberry" />
            </CollapsibleList>
          </CollapsibleList>

          <CollapsibleList
            open
            handle={
              <SimpleListItem
                text="Custom Content, forced open"
                graphic="help"
                metaIcon="chevron_right"
              />
            }
          >
            <div
              style={{
                padding: '4rem',
                background: 'green',
                color: 'white'
              }}
            >
              Collapsibles can contain any content
            </div>
          </CollapsibleList>
        </List>
      </DocsExample>

      <DocsSubtitle>Usage as Non-List</DocsSubtitle>
      <DocsP>
        `CollapsibleList` is optimized to work with the `List` component but
        there is nothing stopping you from using any other kind of content.
      </DocsP>

      <DocsExample>
        <CollapsibleList
          handle={<IconButton icon="favorite_outline" onIcon="favorite" />}
          onOpen={() => console.log('open')}
          onClose={() => console.log('close')}
        >
          <div
            style={{
              padding: '1rem',
              background: 'red',
              color: 'white',
              display: 'inline-block'
            }}
          >
            Favorited!
          </div>
        </CollapsibleList>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'CollapsibleList', component: CollapsibleList as any }
        ]}
      />
    </Docs>
  );
}
