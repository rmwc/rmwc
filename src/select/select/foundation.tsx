import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useFoundation, raf } from '@rmwc/base';
import {
  MDCSelectFoundation,
  MDCSelectAdapter,
  cssClasses
} from '@material/select';
import { FloatingLabelApi } from '@rmwc/floating-label';
import { MenuApi } from '@rmwc/menu';
import { Corner } from '@material/menu-surface';
import { SelectIconApi } from '../select-icon';
import { SelectProps } from './';

export const useSelectFoundation = (
  props: SelectProps & React.HTMLProps<any>
) => {
  const [notchWidth, setNotchWidth] = useState<number>();
  const [lineRippleActive, setLineRippleActive] = useState(false);
  const [lineRippleCenter, setLineRippleCenter] = useState(0);
  const [floatLabel, setFloatLabel] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTextContent, setSelectedTextContent] = useState('');

  const selectedIndex = useRef(-1);

  const floatingLabel = useRef<FloatingLabelApi | null>();
  const setFloatingLabel = (api: FloatingLabelApi | null) => {
    floatingLabel.current = api;
  };

  const menu = useRef<MenuApi>();
  const setMenu = (api: MenuApi) => {
    menu.current = api;
  };

  const anchor = useRef<HTMLElement | null>(null);
  const setAnchor = (el: HTMLElement | null) => {
    anchor.current = el;
  };

  const leadingIcon = useRef<SelectIconApi | null>();
  const setLeadingIcon = (api: SelectIconApi | null) => {
    leadingIcon.current = api;
  };

  const nativeControl = useRef<HTMLSelectElement>();
  const setNativeControl = (el: HTMLSelectElement) => {
    nativeControl.current = el;
  };

  const silenceChange = useRef(false);

  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true,
      anchorEl: true
    },
    foundation: ({ rootEl, anchorEl, getProps, emit }) => {
      const isNative = () => !getProps().enhanced;

      const getSelectAdapterMethods = (): Partial<MDCSelectAdapter> => {
        const items = (): HTMLElement[] =>
          (isNative()
            ? Array.apply<null, any, HTMLOptionElement[]>(
                null,
                nativeControl.current?.options
              )
            : menu.current?.items()) || [];

        const getValue = (el: Element) => {
          return (
            el.getAttribute('data-value') || el.getAttribute('value') || ''
          );
        };

        return {
          setSelectedText: (text: string) => {
            setSelectedTextContent(text);
          },
          openMenu: () => {
            setMenuOpen(true);
          },
          closeMenu: () => {
            setMenuOpen(false);
          },
          getAnchorElement: () => anchor.current,
          setMenuAnchorElement: (anchorEl: HTMLElement) => setAnchor(anchorEl),
          setMenuAnchorCorner: (anchorCorner: Corner) =>
            menu.current?.setAnchorCorner(anchorCorner),
          setMenuWrapFocus: (wrapFocus: boolean) => {
            //(this.menu_.wrapFocus = wrapFocus)
          },
          focusMenuItemAtIndex: (index: number) =>
            menu.current?.focusItemAtIndex(index),
          getMenuItemCount: () => {
            return items().length;
          },
          getMenuItemValues: () => items().map(getValue) || [],
          getMenuItemTextAtIndex: (index: number) => {
            return items()[index].textContent as string;
          },
          isSelectAnchorFocused: () =>
            !!(anchorEl.ref && anchorEl.ref === document.activeElement),
          getSelectAnchorAttr: (attr: any) => anchorEl.getProp(attr),
          setSelectAnchorAttr: (attr: string, value: string) =>
            anchorEl.setProp(attr as any, value),
          removeSelectAnchorAttr: (attr: string) => {
            anchor.current?.removeAttribute(attr);
          },
          addMenuClass: (className: string) => {
            return menu.current
              ?.getSurfaceElement()
              ?.querySelector('.mdc-list-item--activated')
              ?.classList.add(className);
          },
          removeMenuClass: (className: string) => {
            return menu.current
              ?.getSurfaceElement()
              ?.querySelector('.mdc-list-item--activated')
              ?.classList.remove(className);
          },
          getSelectedIndex: () => {
            if (isNative() && nativeControl.current !== undefined) {
              return nativeControl.current.selectedOptions[0].index;
            }
            if (menu.current === undefined) {
              return -1;
            }
            const index = menu.current.selectedIndex;
            return index instanceof Array ? index[0] : index;
          },
          setSelectedIndex: (index: number) => {
            return menu.current?.setSelectedIndex(index);
          }
        };
      };

      const getCommonAdapterMethods = () => {
        return {
          addClass: (className: string) => {
            rootEl.addClass(className);
          },
          removeClass: (className: string) => {
            rootEl.removeClass(className);
          },
          hasClass: (className: string) => rootEl.hasClass(className),
          isRtl: () =>
            rootEl.ref &&
            window
              .getComputedStyle(rootEl.ref)
              .getPropertyValue('direction') === 'rtl',
          setRippleCenter: (normalizedX: number) => {
            setLineRippleCenter(normalizedX);
          },
          activateBottomLine: () => setLineRippleActive(true),
          deactivateBottomLine: () => setLineRippleActive(false),
          notifyChange: (value: any) => {
            if (!silenceChange.current) {
              emit(
                'onChange',
                {
                  index: selectedIndex.current,
                  value
                },
                true
              );
            }
          }
        };
      };

      const getOutlineAdapterMethods = () => {
        return {
          hasOutline: () => !!getProps().outlined,
          notchOutline: (labelWidth: number) => {
            setNotchWidth(labelWidth);
          },
          closeOutline: () => {
            setNotchWidth(undefined);
          }
        };
      };

      const getLabelAdapterMethods = () => {
        return {
          hasLabel: () => !!getProps().label,
          floatLabel: (shouldFloat: boolean) => {
            setFloatLabel(shouldFloat);
          },
          getLabelWidth: () => {
            return floatingLabel.current?.getWidth() || 0;
          },
          setLabelRequired: (isRequired: boolean) => {
            return floatingLabel.current?.setRequired(isRequired);
          }
        };
      };

      const getFoundationMap = () => {
        return {
          leadingIcon:
            (leadingIcon.current && leadingIcon.current.getFoundation()) ||
            undefined
        };
      };

      const f = new MDCSelectFoundation(
        {
          ...getSelectAdapterMethods(),
          ...getCommonAdapterMethods(),
          ...getOutlineAdapterMethods(),
          ...getLabelAdapterMethods()
        },
        getFoundationMap()
      );

      // This foundation requires a bit of monkey patching
      // in order to get placeholders working correctly
      const adapter = (f as any).adapter as MDCSelectAdapter;

      f.layout = () => {
        const doWork = () => {
          const value = f.getValue();

          if (adapter.hasLabel()) {
            // This is the line we have to override to work with placeholders
            // we need to consider haveing a placeholder as a valid value
            const optionHasValue =
              !!getProps().placeholder ||
              value.length > 0 ||
              // As of MCW 8, we need to check for selectedIndex, else the label won't float when unfocused
              selectedIndex.current > -1;
            const isFocused = adapter.hasClass(cssClasses.FOCUSED);
            const shouldFloatAndNotch = optionHasValue || isFocused;
            const isRequired = adapter.hasClass(cssClasses.REQUIRED);

            f.notchOutline(shouldFloatAndNotch);
            adapter.floatLabel(shouldFloatAndNotch);
            adapter.setLabelRequired(isRequired);
          }
        };

        doWork();
      };

      // This is only set one time in the constructor which
      // is before React even has a chance to render...
      // Make it a dynamic getter
      Object.defineProperty(f, 'menuItemValues', {
        get: () => {
          return adapter.getMenuItemValues();
        }
      });

      // We have to add some logic after the original init function
      // in order to sync placeholder labels
      // Also... MDC fires change events on init which is the
      // exact opposite of what we want to happen with normal selects
      const init = f.init.bind(f);
      f.init = () => {
        silenceChange.current = true;
        init();

        const placeholder = String(getProps().placeholder || '');
        if (!f.getValue() && placeholder) {
          adapter.setSelectedText(placeholder);
        }
        silenceChange.current = false;
      };

      return f;
    }
  });

  const { rootEl } = elements;

  const { onFocus } = props;
  const handleFocus = useCallback(
    (evt: any) => {
      onFocus?.(evt);
      foundation.handleFocus();
    },
    [onFocus, foundation]
  );

  const { onBlur } = props;
  const handleBlur = useCallback(
    (evt: any) => {
      onBlur?.(evt);
      foundation.handleBlur();
    },
    [onBlur, foundation]
  );

  const { onChange } = props;
  const handleChange = useCallback(
    (evt: any) => {
      onChange?.(evt);
      foundation.handleChange();
    },
    [onChange, foundation]
  );

  const handleClick = useCallback(
    (evt: any) => {
      // Fixes an issue where clicking on the select when it
      // is already opens fires events in an incorrect order.
      // We can't use Reacts menuOpen variable because it is
      // ahead of the actual DOM animation...
      // Not ideal, but no other way currently
      if (rootEl.ref?.querySelector('.mdc-select--disabled')) {
        return;
      }

      if (rootEl.ref?.querySelector('.mdc-menu-surface--open')) {
        foundation.handleMenuClosed();
        return;
      }

      const getNormalizedXCoordinate = (evt: any) => {
        const targetClientRect = evt.target.getBoundingClientRect();
        const xCoordinate = evt.clientX;
        return xCoordinate - targetClientRect.left;
      };

      const coord = getNormalizedXCoordinate(evt);
      rootEl.ref && rootEl.ref.focus();
      foundation.handleClick(coord);
    },
    [foundation, rootEl.ref]
  );

  const { onKeyDown } = props;
  const handleKeydown = useCallback(
    (evt: any) => {
      onKeyDown?.(evt);
      foundation.handleKeydown(evt);
    },
    [foundation, onKeyDown]
  );

  const handleMenuSelected = useCallback(
    (index: number) => {
      selectedIndex.current = index;
      foundation.handleMenuItemAction(index);
    },
    [foundation]
  );

  const handleMenuOpened = useCallback(() => {
    foundation.handleMenuOpened();
  }, [foundation]);

  const handleMenuClosed = useCallback(() => {
    setMenuOpen(false);
    foundation.handleMenuClosed();
  }, [foundation]);

  // For controlled selects that are enhanced
  // we need to jump through some checks to see if we need to update the
  // value in our foundation
  const foundationValue = foundation.getValue();

  // Use the value OR the default value if there is no index selected
  const value =
    props.value ??
    ((selectedIndex.current === -1 ? props.defaultValue : undefined) as string);

  // Use the length of the options as an indication we need to re-render and
  // check if our value is accurate. This is for situations where people populate the select
  // async. We can't rely on object identity since lots of people pass options inline.
  const optionsLength = Array.isArray(props.options)
    ? props.options.length
    : Object.values(props.options || {}).length;

  // MDC Select is a bit of a mess here...
  // - We have to set our value
  // - In the event of a controlled value change, we don't want to fire a change event
  // - Jump through stupid hoops to prevent the event from firing
  useEffect(() => {
    silenceChange.current = true;

    if (value !== undefined && value !== foundationValue) {
      // @ts-ignore unsafe private variable access
      const index = foundation.menuItemValues.indexOf(value);
      selectedIndex.current = index;
      foundation.setValue(value || '');

      // We need to call setSelectedTextContent to set the default value/the controlled value.
      // @ts-ignore unsafe private variable access
      if (foundation.menuItemValues.includes(value)) {
        // @ts-ignore unsafe private variable access
        const textContent = foundation.adapter.getMenuItemTextAtIndex(index);
        setSelectedTextContent(textContent);
      }
    }
    raf(() => {
      silenceChange.current = false;
    });
  }, [value, foundationValue, optionsLength, foundation]);

  // Disabled
  useEffect(() => {
    foundation.setDisabled(!!props.disabled);
  }, [foundation, props.disabled]);

  // Set anchor
  useEffect(() => {
    rootEl.ref && menu.current?.setAnchorElement(rootEl.ref);
  }, [rootEl.ref]);

  return {
    notchWidth,
    menuOpen,
    lineRippleActive,
    lineRippleCenter,
    floatLabel,
    selectedIndex: selectedIndex.current,
    selectedTextContent,
    setFloatingLabel,
    setMenu,
    setLeadingIcon,
    setNativeControl,
    handleFocus,
    handleBlur,
    handleClick,
    handleChange,
    handleKeydown,
    handleMenuClosed,
    handleMenuOpened,
    handleMenuSelected,
    ...elements
  };
};
