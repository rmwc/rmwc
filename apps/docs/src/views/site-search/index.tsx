import React, { FormEvent, useRef, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { CircularProgress } from '@rmwc/circular-progress';
import { SimpleListItem } from '@rmwc/list';
import {
  Menu,
  MenuItems,
  MenuOnSelectEventT,
  MenuSurfaceAnchor
} from '@rmwc/menu';
import { TextField } from '@rmwc/textfield';
import { IconPropT } from '@rmwc/types';

import { menuContent, MenuItemT } from '../../common/menu-content';
import styles from './site-search.module.css';

type SiteSearchItemT = {
  cacheId: string; //"-uBq3tnNfuMJ"
  displayLink: string; //"rmwc.io"
  formattedUrl: string; //"https://rmwc.io/?p=installation"
  htmlSnippet: string; //"npm i @rmwc/<b>button</b> --save or yarn add @rmwc/<b>button</b>; Include the individual <br>↵components stylesheets (listed on their docs page) in your project via your <br>↵method&nbsp;..."
  htmlTitle: string; //"RMWC | React Material Web Components | Installation"
  kind: string; //"customsearch#result"
  link: string; //"https://rmwc.io/?p=installation"
  snippet: string; //"npm i @rmwc/button --save or yarn add @rmwc/button; Include the individual ↵components stylesheets (listed on their docs page) in your project via your ↵method ..."
  title: string; //"RMWC | React Material Web Components | Installation"
};

const componentsList = (() => {
  const walkOptions = (options: MenuItemT[]) => {
    return options.reduce<MenuItemT[]>((acc, val) => {
      if (val.options) {
        acc.push(...walkOptions(val.options!));
      } else {
        acc.push(val);
      }
      return acc;
    }, []);
  };

  return walkOptions(menuContent);
})();

const searchComponents = (val: string) =>
  componentsList
    .filter((c) => {
      return c.label.toLowerCase().includes(val.toLowerCase());
    })
    .map((c) => ({
      id: c.label,
      icon: {
        icon: 'code',
        theme: 'primary'
      },
      sectionName: c.label,
      snippet: `View docs for ${c.label}`,
      url: c.url!
    }));

const searchGoogle = async (val: string, abortController: AbortController) => {
  const { items = [] } = await fetch(
    `https://www.googleapis.com/customsearch/v1/siterestrict?key=${
      import.meta.env.VITE_CUSTOM_SEARCH_KEY
    }&cx=${import.meta.env.VITE_CUSTOM_SEARCH_ID}&q=${val}`,
    { signal: abortController.signal }
  ).then<{ items?: SiteSearchItemT[] }>((res) => res.json());

  return (
    items
      // shitty hack to ignore things in the index that just reference them homepage
      .filter((r) => !r.snippet.startsWith('RMWC is a React wrapper'))
      .map((r) => ({
        id: r.cacheId,
        icon: {
          icon: 'notes',
          theme: 'primary'
        },
        sectionName: (r.title.split('|').pop() || '').trim(),
        snippet: r.snippet,
        // resolve from the full url into the page
        url: (
          (r.formattedUrl.split('?').pop() || '')
            .split('&')
            .find((p) => p.startsWith('p=')) || ''
        ).slice(2)
      }))
  );
};

export function SiteSearch() {
  const [searchVal, _setSearchVal] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const timerIdRef = useRef<number>();
  const abortControllerRef = useRef<AbortController>();
  const [results, setResults] = useState<
    Array<{
      id: string;
      sectionName: string;
      icon: IconPropT;
      snippet: string;
      url: string;
    }>
  >([]);
  const navigate = useNavigate();

  const doSearch = (val: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = undefined;
    }

    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    timerIdRef.current = window.setTimeout(async () => {
      const components = searchComponents(val);
      setResults(components);

      try {
        const searchResults = await searchGoogle(val, abortController);
        abortControllerRef.current = undefined;
        setResults([...components, ...searchResults]);
      } catch (err) {
        console.warn(err);
        abortControllerRef.current = undefined;
      }
    }, 200);
  };

  const setSearchVal = (val: string) => {
    if (val.length > 2) {
      !isSearching && setIsSearching(true);
      doSearch(val);
    } else {
      setResults([]);
    }

    _setSearchVal(val);
  };

  return (
    <MenuSurfaceAnchor className={styles.siteSearchWrapper}>
      <TextField
        placeholder="Search"
        icon="search"
        trailingIcon={{
          icon: searchVal ? 'close' : '',
          onClick: () => setSearchVal('')
        }}
        outlined
        className={styles.siteSearch}
        value={searchVal}
        onChange={(evt: FormEvent<HTMLInputElement>) =>
          setSearchVal(evt.currentTarget.value)
        }
        onFocus={() => setIsSearching(true)}
        onKeyDown={(evt) => {
          if (evt.which === 40) {
            const listItem = document.querySelector<HTMLAnchorElement>(
              `.${styles.siteSearchMenu} a`
            );

            if (isSearching && listItem) {
              listItem.focus();
            }
          }
        }}
      />
      <Menu
        className={styles.siteSearchMenu}
        open={isSearching && searchVal.length > 2}
        anchorCorner="bottomStart"
        focusOnOpen={false}
        onFocus={() => setIsSearching(true)}
        onClose={() => {
          setIsSearching(false);
        }}
        onSelect={(evt: MenuOnSelectEventT) => {
          window.scrollTo(0, 0);
          navigate(
            (evt.detail.item as HTMLAnchorElement).href.split('/').pop() || '/'
          );
          document.activeElement &&
            (document.activeElement as HTMLElement).blur();
        }}
      >
        <MenuItems twoLine>
          {results.map((r) => (
            <SimpleListItem
              tag={Link}
              to={r.url}
              graphic={r.icon}
              key={r.id}
              text={r.sectionName}
              secondaryText={r.snippet}
            />
          ))}
          {!!abortControllerRef.current && (
            <div className={styles.loading}>
              <CircularProgress size="large" />
            </div>
          )}

          {!abortControllerRef.current && !results.length && (
            <SimpleListItem text="No results found" />
          )}
        </MenuItems>
      </Menu>
    </MenuSurfaceAnchor>
  );
}
