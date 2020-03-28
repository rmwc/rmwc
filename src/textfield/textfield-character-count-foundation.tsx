import { useFoundation } from '@rmwc/base';
import { TextFieldCharacterCountProps, TextFieldCharacterCountApi } from '.';
import { MDCTextFieldCharacterCounterFoundation } from '@material/textfield';
import { useState } from 'react';

export const useTextFieldCharacterCountFoundation = (
  props: TextFieldCharacterCountProps
) => {
  const [content, setContent] = useState<string>();

  const { foundation, ...elements } = useFoundation({
    props,
    api: ({
      foundation
    }: {
      foundation: MDCTextFieldCharacterCounterFoundation;
    }): TextFieldCharacterCountApi => {
      return {
        getFoundation: () => foundation
      };
    },
    elements: {},
    foundation: () => {
      return new MDCTextFieldCharacterCounterFoundation({
        setContent: (content: string) => {
          setContent(content);
        }
      });
    }
  });

  return {
    content,
    ...elements
  };
};
