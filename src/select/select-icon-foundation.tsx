import { useFoundation } from '@rmwc/base';
import { IconProps } from '@rmwc/icon';
import { EventType, SpecificEventListener } from '@material/base/types';
import { MDCSelectIconFoundation } from '@material/select';
import { MDCTextFieldIconFoundation } from '@material/textfield';
import { SelectIconApi } from '.';

export const useSelectIconFoundation = (
  props: IconProps & React.HTMLProps<any>
) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true },
    // @ts-ignore TODO, fix type error
    api: ({
      foundation
    }: {
      foundation: MDCTextFieldIconFoundation;
    }): SelectIconApi => {
      return {
        // @ts-ignore TODO, fix type error
        getFoundation: () => foundation
      };
    },
    foundation: ({ rootEl, emit }) => {
      return new MDCSelectIconFoundation({
        getAttr: (attr: string) => rootEl.getProp(attr as any) as string | null,
        setAttr: (attr: string, value: string) =>
          rootEl.setProp(attr as any, value),
        removeAttr: (attr: string) => rootEl.removeProp(attr as any),
        setContent: (content: string) => {
          rootEl.ref && (rootEl.ref.textContent = content);
        },
        registerInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => rootEl.addEventListener(evtType, handler),
        deregisterInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => rootEl.removeEventListener(evtType, handler),
        notifyIconAction: () => emit('onClick', {}, true)
      });
    }
  });

  return { ...elements };
};
