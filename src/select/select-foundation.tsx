import * as RMWC from '@rmwc/types';
import { useFoundation } from '@rmwc/base';
import { MDCSelectFoundation } from '@material/select';
import { SelectProps, SelectIconApi } from '.';
import { useCallback, useState, useRef, useEffect } from 'react';
import { FloatingLabelApi } from '@rmwc/floating-label';
import { MenuApi } from '@rmwc/menu';

export const useSelectFoundation = (
  props: SelectProps & React.HTMLProps<any>
) => {
  const [notchWidth, setNotchWidth] = useState<number>();
  const [lineRippleActive, setLineRippleActive] = useState(false);
  const [lineRippleCenter, setLineRippleCenter] = useState(0);
  const [floatLabel, setFloatLabel] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    props.placeholder !== undefined ? 0 : -1
  );
  const [selectedTextContent, setSelectedTextContent] = useState('');

  const floatingLabel = useRef<FloatingLabelApi>();
  const setFloatingLabel = (api: FloatingLabelApi) => {
    floatingLabel.current = api;
  };
  const menu = useRef<MenuApi>();
  const setMenu = (api: MenuApi) => {
    menu.current = api;
  };
  const leadingIcon = useRef<SelectIconApi>();
  const setLeadingIcon = (api: SelectIconApi) => {
    leadingIcon.current = api;
  };

  const nativeControl = useRef<HTMLSelectElement | null>(null);
  const setNativeControl = (el: HTMLSelectElement | null) => {
    nativeControl.current = el;
  };

  const hiddenInput = useRef<HTMLInputElement | null>(null);
  const setHiddenInput = (el: HTMLInputElement | null) => {
    hiddenInput.current = el;
  };

  // A state ref to be used inside the foundation
  // This didn't come up in a single other foundation implementation
  // So handling it as a one off...
  const state = useRef({
    menuOpen,
    selectedIndex
  });
  state.current = {
    menuOpen,
    selectedIndex
  };

  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true, selectedTextEl: true },
    foundation: ({ rootEl, selectedTextEl, getProps, emit }) => {
      const getEnhancedSelectAdapterMethods = () => {
        return {
          getValue: () => {
            let value = '';
            const listItem = menu.current?.items()[state.current.selectedIndex];
            if (
              listItem &&
              listItem.hasAttribute(
                MDCSelectFoundation.strings.ENHANCED_VALUE_ATTR
              )
            ) {
              value =
                listItem.getAttribute(
                  MDCSelectFoundation.strings.ENHANCED_VALUE_ATTR
                ) || '';
            }
            return value === '' && getProps().placeholder ? ' ' : value;
          },
          setValue: (value: string) => {
            const menuSurface =
              menu.current && menu.current.getSurfaceElement();

            if (menuSurface) {
              const element = menuSurface.querySelector(
                `[${MDCSelectFoundation.strings.ENHANCED_VALUE_ATTR}="${value}"]`
              );

              const selectedIndex =
                element && menu.current
                  ? menu.current.items().indexOf(element as HTMLLIElement)
                  : -1;
              const selectedItem =
                menu.current && menu.current.items()[selectedIndex];

              let selectedTextContent = '';

              if (!!selectedItem) {
                selectedTextContent =
                  selectedItem.dataset['label'] ||
                  (selectedItem.textContent &&
                    selectedItem.textContent.trim()) ||
                  '';
              }
              setSelectedIndex(selectedIndex);
              setSelectedTextContent(selectedTextContent);
              setTimeout(() => {
                foundation.layout();
                // @ts-ignore private variable access
                foundation.adapter_.floatLabel(!!selectedTextContent);
              });
            }
          },
          openMenu: () => {
            setMenuOpen(true);
          },
          closeMenu: () => {
            setMenuOpen(false);
          },
          isMenuOpen: () => state.current.menuOpen,
          setSelectedIndex: (index: number) => {
            setSelectedIndex(index);
          },
          setDisabled: (isDisabled: boolean) => {
            // handled by props in render function
          },
          checkValidity: () => {
            const classList = rootEl.ref && rootEl.ref.classList;
            if (
              classList &&
              classList.contains(MDCSelectFoundation.cssClasses.REQUIRED) &&
              !classList.contains(MDCSelectFoundation.cssClasses.DISABLED)
            ) {
              // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
              // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
              return !!(
                state.current.selectedIndex !== -1 &&
                (state.current.selectedIndex !== 0 ||
                  getProps().value ||
                  getProps().defaultValue)
              );
            }
            return true;
          },
          setValid: (isValid: boolean) => {
            selectedTextEl.setProp('aria-invalid', (!isValid).toString());
            isValid
              ? rootEl.removeClass(MDCSelectFoundation.cssClasses.INVALID)
              : rootEl.addClass(MDCSelectFoundation.cssClasses.INVALID);
          }
        };
      };

      const getNativeSelectAdapterMethods = () => {
        return {
          getValue: () => {
            const value = nativeControl.current && nativeControl.current.value;
            return value === '' && getProps().placeholder ? ' ' : value || '';
          },
          setValue: (value: string) =>
            nativeControl.current && (nativeControl.current.value = value),
          openMenu: () => {},
          closeMenu: () => {},
          isMenuOpen: () => false,
          setSelectedIndex: (index: number) => {
            nativeControl.current &&
              (nativeControl.current.selectedIndex = index);
          },
          setDisabled: (isDisabled: boolean) =>
            nativeControl.current &&
            (nativeControl.current.disabled = isDisabled),
          setValid: (isValid: boolean) => {
            isValid
              ? rootEl.removeClass(MDCSelectFoundation.cssClasses.INVALID)
              : rootEl.addClass(MDCSelectFoundation.cssClasses.INVALID);
          },
          checkValidity: () =>
            !!nativeControl.current && nativeControl.current.checkValidity()
        };
      };

      const getCommonAdapterMethods = () => {
        return {
          addClass: (className: string) => rootEl.addClass(className),
          removeClass: (className: string) => rootEl.removeClass(className),
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
            emit(
              'onChange',
              {
                index: selectedIndex,
                value
              },
              true
            );
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
          floatLabel: (shouldFloat: boolean) => {
            setFloatLabel(shouldFloat);
          },
          getLabelWidth: () => {
            return floatingLabel.current?.getWidth() || 0;
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

      return new MDCSelectFoundation(
        {
          ...(getProps().enhanced
            ? getEnhancedSelectAdapterMethods()
            : getNativeSelectAdapterMethods()),
          ...getCommonAdapterMethods(),
          ...getOutlineAdapterMethods(),
          ...getLabelAdapterMethods()
        },
        getFoundationMap()
      );
    }
  });

  const { selectedTextEl, rootEl } = elements;

  const handleChange = useCallback(
    (evt: any) => {
      foundation.handleChange(true);
    },
    [foundation]
  );

  const handleFocus = useCallback(
    (evt: any) => {
      props.onFocus?.(evt);
      foundation.handleFocus();
    },
    [props.onFocus, foundation]
  );

  const handleBlur = useCallback(
    (evt: any) => {
      props.onBlur?.(evt);
      foundation.handleBlur();
    },
    [props.onBlur, foundation]
  );

  const handleClick = useCallback(
    (evt: any) => {
      const { onMouseDown, onTouchStart } = props;
      evt.type === 'mousedown' && onMouseDown && onMouseDown(evt);
      evt.type === 'touchstart' && onTouchStart && onTouchStart(evt);

      const getNormalizedXCoordinate = (evt: any) => {
        const targetClientRect = evt.target.getBoundingClientRect();
        const xCoordinate = evt.clientX;
        return xCoordinate - targetClientRect.left;
      };

      selectedTextEl.ref && selectedTextEl.ref.focus();

      // Timeout corrects an issue for firefox not changing the value
      // https://github.com/jamesmfriedman/rmwc/issues/412
      const coord = getNormalizedXCoordinate(evt);
      setTimeout(() => {
        foundation.handleClick(coord);
      });
    },
    [foundation, selectedTextEl.ref, props]
  );

  const handleKeydown = useCallback(
    (evt: any) => {
      props.onKeyDown?.(evt);
      foundation.handleKeydown(evt);
    },
    [foundation, props.onKeyDown]
  );

  const handleMenuSelected = useCallback(
    (evt: RMWC.CustomEventT<{ item: HTMLElement; index: number }>) => {
      const value = evt.detail.item.dataset.value;
      foundation.setValue(value || '');
    },
    [foundation]
  );

  const handleMenuOpened = useCallback(() => {
    // Menu should open to the last selected element.
    if (menu.current && selectedIndex >= 0) {
      menu.current.items()[selectedIndex].focus();
    }
  }, [selectedIndex]);

  const handleMenuClosed = useCallback(() => {
    // menuOpened_ is used to track the state of the menu opening or closing since the menu.open function
    // will return false if the menu is still closing and this method listens to the closed event which
    // occurs after the menu is already closed.

    setMenuOpen(false);
    if (
      document.activeElement &&
      document.activeElement !== selectedTextEl.ref
    ) {
      foundation.handleBlur();
    }
  }, [foundation, selectedTextEl.ref]);

  const sharedEventProps = {
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onTouchStart: handleClick,
    onMouseDown: handleClick
  };

  // For controlled selects that are enhanced
  // we need to jump through some checks to see if we need to update the
  // value in our foundation
  const stringifiedOptions = JSON.stringify(props.options);
  useEffect(() => {
    foundation.setValue(props.value || '');
  }, [props.value, stringifiedOptions, foundation]);

  // Disabled
  useEffect(() => {
    foundation.setDisabled(!!props.disabled);
  }, [foundation, props.disabled]);

  // Set anchor
  useEffect(() => {
    rootEl.ref && menu.current?.setAnchorElement(rootEl.ref);
  }, [rootEl.ref]);

  // handle on mount behavior
  useEffect(() => {
    const value = props.value;

    if (hiddenInput.current && hiddenInput.current.value) {
      // If the hidden input already has a value, use it to restore the select's value.
      // This can happen e.g. if the user goes back or (in some browsers) refreshes the page.
      foundation.setValue(hiddenInput.current.value);
    } else if (props.enhanced) {
      // If an element is selected, the select should set the initial selected text.
      foundation.setValue(value || '');
    }

    // Initially sync floating label
    foundation.handleChange(false);

    if (props.disabled) {
      foundation.setDisabled(true);
    }

    if (
      nativeControl.current &&
      document.activeElement === nativeControl.current
    ) {
      foundation.handleFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundation]);

  return {
    notchWidth,
    menuOpen,
    lineRippleActive,
    lineRippleCenter,
    floatLabel,
    selectedIndex,
    selectedTextContent,
    setFloatingLabel,
    setMenu,
    setHiddenInput,
    setLeadingIcon,
    setNativeControl,
    sharedEventProps,
    handleKeydown,
    handleMenuClosed,
    handleMenuOpened,
    handleMenuSelected,
    ...elements
  };
};
