import { useState, useRef, useEffect } from 'react';
import { useFoundation } from '@rmwc/base';
import { EventType, SpecificEventListener } from '@material/base/types';
import { MDCTextFieldFoundation } from '@material/textfield';
import { TextFieldProps, TextFieldIconApi } from '.';
import { FloatingLabelApi } from '@rmwc/floating-label';
import {
  useTextFieldCharacterCountFoundation,
  TextFieldCharacterCountApi
} from './textfield-character-count-foundation';

export const useTextFieldFoundation = (props: TextFieldProps) => {
  const [lineRippleActive, setLineRippleActive] = useState(false);
  const [lineRippleCenter, setLineRippleCenter] = useState(0);
  const [notchWidth, setNotchWidth] = useState<number>();
  const [shakeLabel, setShakeLabel] = useState(false);
  const [floatLabel, setFloatlabel] = useState(false);

  const characterCounter = useRef<TextFieldCharacterCountApi | null>();
  const setCharacterCounter = (api: TextFieldCharacterCountApi | null) => {
    characterCounter.current = api;
  };

  const leadingIcon = useRef<TextFieldIconApi | null>();
  const setLeadingIcon = (api: TextFieldIconApi | null) =>
    (leadingIcon.current = api);

  const trailingIcon = useRef<TextFieldIconApi | null>();
  const setTrailingIcon = (api: TextFieldIconApi | null) =>
    (trailingIcon.current = api);

  const floatingLabel = useRef<FloatingLabelApi | null>();
  const setFloatingLabel = (api: FloatingLabelApi | null) =>
    (floatingLabel.current = api);

  const { content: characterCountContent } =
    useTextFieldCharacterCountFoundation({
      apiRef: props.characterCount ? setCharacterCounter : undefined
    });

  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true, inputEl: true },
    foundation: ({ rootEl, inputEl, getProps }) => {
      const getLabelAdapterMethods = () => {
        return {
          shakeLabel: (shouldShake: boolean) => setShakeLabel(shouldShake),
          floatLabel: (shouldFloat: boolean) => {
            setFloatlabel(getProps().floatLabel ?? shouldFloat);
          },
          hasLabel: () => {
            return !!getProps().label;
          },
          getLabelWidth: () => floatingLabel.current?.getWidth() || 0
        };
      };

      const getLineRippleAdapterMethods = () => {
        return {
          activateLineRipple: () => {
            setLineRippleActive(true);
          },
          deactivateLineRipple: () => {
            setLineRippleActive(false);
          },
          setLineRippleTransformOrigin: (normalizedX: number) => {
            setLineRippleCenter(normalizedX);
          }
        };
      };

      const getOutlineAdapterMethods = () => {
        return {
          notchOutline: (labelWidth: number) => {
            setNotchWidth(labelWidth);
          },
          closeOutline: () => {
            getProps().floatLabel ?? setNotchWidth(undefined);
          },
          hasOutline: () => {
            return !!getProps().outlined;
          }
        };
      };

      const getInputAdapterMethods = () => {
        return {
          registerInputInteractionHandler: <K extends EventType>(
            evtType: K,
            handler: SpecificEventListener<K>
          ): void => inputEl.addEventListener(evtType, handler),
          deregisterInputInteractionHandler: <K extends EventType>(
            evtType: K,
            handler: SpecificEventListener<K>
          ): void => inputEl.removeEventListener(evtType, handler),
          getNativeInput: () => inputEl.ref as any
        };
      };

      const getFoundationMap = () => {
        return {
          characterCounter: characterCounter.current
            ? characterCounter.current.getFoundation()
            : undefined,
          helperText: undefined,
          leadingIcon: leadingIcon.current
            ? leadingIcon.current.getFoundation()
            : undefined,
          trailingIcon: trailingIcon.current
            ? trailingIcon.current.getFoundation()
            : undefined
        };
      };

      return new MDCTextFieldFoundation(
        {
          addClass: (className: string) => rootEl.addClass(className),
          removeClass: (className: string) => rootEl.removeClass(className),
          hasClass: (className: string) => rootEl.hasClass(className),
          registerTextFieldInteractionHandler: <K extends EventType>(
            evtType: K,
            handler: SpecificEventListener<K>
          ): void => rootEl.addEventListener(evtType, handler),
          deregisterTextFieldInteractionHandler: <K extends EventType>(
            evtType: K,
            handler: SpecificEventListener<K>
          ): void => rootEl.removeEventListener(evtType, handler),
          registerValidationAttributeChangeHandler: (
            handler: (attributeNames: string[]) => void
          ): MutationObserver => {
            const getAttributesList = (mutationsList: MutationRecord[]) =>
              mutationsList.map((mutation) => mutation.attributeName);
            if (inputEl.ref) {
              const observer = new MutationObserver((mutationsList) =>
                handler(getAttributesList(mutationsList) as string[])
              );
              const targetNode = inputEl.ref;
              const config = { attributes: true };
              targetNode && observer.observe(targetNode, config);
              return observer;
            }

            return {} as MutationObserver;
          },
          deregisterValidationAttributeChangeHandler: (
            observer: MutationObserver
          ) => {
            observer && observer.disconnect();
          },
          isFocused: () => {
            return document.activeElement === inputEl.ref;
          },
          ...getInputAdapterMethods(),
          ...getLabelAdapterMethods(),
          ...getLineRippleAdapterMethods(),
          ...getOutlineAdapterMethods()
        },
        getFoundationMap()
      );
    }
  });

  // Fixes bug #362
  // MDC breaks Reacts unidirectional data flow...
  // We have to capture the value before render
  // and then compare it to props.value after render in order to set
  // the appropriate foundation value without breaking its initial state
  const foundationValue = foundation.getValue();
  useEffect(() => {
    if (props.value !== undefined && props.value !== foundationValue) {
      foundation.setValue(String(props.value));
    }
  }, [props.value, foundation, foundationValue]);

  // Allow the user to float the label themselves
  useEffect(() => {
    if (props.floatLabel !== undefined) {
      foundation.notchOutline(props.floatLabel);
      // @ts-ignore unsafe adapter access
      foundation.adapter.floatLabel(props.floatLabel);
    }
  }, [foundation, props.floatLabel]);

  return {
    shakeLabel,
    floatLabel,
    notchWidth,
    lineRippleActive,
    lineRippleCenter,
    setCharacterCounter,
    setLeadingIcon,
    setTrailingIcon,
    setFloatingLabel,
    characterCountContent,
    ...elements
  };
};
