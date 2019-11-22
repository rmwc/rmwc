import { MenuProps } from './menu';
import { useFoundation, closest } from '@rmwc/base';
import { MDCMenuFoundation } from '@material/menu';
import { useCallback, useRef, useEffect, useState } from 'react';
import { MenuSurfaceOnOpenEventT, MenuSurfaceApi } from './menu-surface';
import { ListApi } from '@rmwc/list';

export const useMenuFoundation = (props: MenuProps & React.HTMLProps<any>) => {
  const menuSurfaceApi = useRef<MenuSurfaceApi>();
  const listApi = useRef<ListApi>();
  const [, setIteration] = useState(0);

  const setListApi = (api: ListApi) => {
    listApi.current = api;
    setIteration(val => val + 1);
  };

  const setMenuSurfaceApi = (api: MenuSurfaceApi) => {
    menuSurfaceApi.current = api;
    setIteration(val => val + 1);
  };

  const items = useCallback(() => {
    return listApi.current?.listElements() || [];
  }, []);

  const { foundation, ...elements } = useFoundation({
    props: {
      ...props,
      // we don't want to pass the apiRef all the way through
      apiRef: undefined
    },
    elements: {
      rootEl: true
    },
    foundation: ({ emit }) => {
      return new MDCMenuFoundation({
        addClassToElementAtIndex: (index: number, className: string) => {
          const list = items();
          list[index].classList.add(className);
        },
        removeClassFromElementAtIndex: (index: number, className: string) => {
          const list = items();
          list[index].classList.remove(className);
        },
        addAttributeToElementAtIndex: (
          index: number,
          attr: string,
          value: string
        ) => {
          const list = items();
          list[index].setAttribute(attr, value);
        },
        removeAttributeFromElementAtIndex: (index: number, attr: string) => {
          const list = items();
          list[index].removeAttribute(attr);
        },
        elementContainsClass: (element: HTMLElement, className: string) =>
          element.classList.contains(className),
        closeSurface: () => {
          menuSurfaceApi.current?.setOpen(false);
        },
        getElementIndex: (element: HTMLElement) =>
          items().indexOf(element as HTMLLIElement),

        notifySelected: (evtData: { index: number; item: HTMLElement }) =>
          emit('onSelect', {
            index: evtData.index,
            item: items()[evtData.index]
          }),
        getMenuItemCount: () => items().length,
        focusItemAtIndex: index => (items()[index] as HTMLElement).focus(),
        focusListRoot: () => listApi.current?.focusRoot()
      });
    }
  });

  const { rootEl } = elements;

  const handleClick = useCallback(
    (evt: React.MouseEvent) => {
      props.onClick?.(evt);
      // fixes an issue with nested span element on list items
      const el = closest(evt.target, '.mdc-list-item');
      el && foundation.handleItemAction(el);
    },
    [foundation, props.onClick]
  );

  const handleKeydown = useCallback(
    (evt: React.KeyboardEvent & KeyboardEvent) => {
      props.onKeyDown?.(evt);
      foundation.handleKeydown(evt);

      // Jump through some hoops to find out
      // that we are selecting the list item
      // This is instead of trying to listen to an event on the list item
      // which is what MDC does
      if (
        evt.which === 13 &&
        evt.target instanceof Element &&
        listApi.current &&
        evt.target.classList.contains(listApi.current.getClasses())
      ) {
        foundation.handleItemAction(evt.target);
      }
    },
    [foundation, props.onKeyDown]
  );

  const handleOpen = useCallback(
    (evt: MenuSurfaceOnOpenEventT) => {
      const list = items();

      if (
        props.focusOnOpen &&
        list.length > 0 &&
        !list.some(el => el === document.activeElement)
      ) {
        list[0].focus();
      }
      props.onOpen?.(evt);
    },
    [props.onOpen, props.focusOnOpen, items]
  );

  rootEl.setProp('onKeyDown', handleKeydown, true);
  rootEl.setProp('onClick', handleClick, true);
  rootEl.setProp('onOpen', handleOpen, true);

  const canSetApi = listApi.current && menuSurfaceApi.current && props.apiRef;
  useEffect(() => {
    if (listApi.current && menuSurfaceApi.current && props.apiRef) {
      props.apiRef({ ...listApi.current, ...menuSurfaceApi.current, items });
    }
    // eslint-disable-next-line
  }, [canSetApi, items]);

  return { setListApi, setMenuSurfaceApi, ...elements };
};
