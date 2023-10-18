import { useState } from 'react';
import { useFoundation } from '@rmwc/base';

import { MDCTextFieldCharacterCounterFoundation } from '@material/textfield';

export interface TextFieldCharacterCountApi {
  getFoundation: () => MDCTextFieldCharacterCounterFoundation;
}

export interface TextFieldCharacterCountProps {
  apiRef?: (api: TextFieldCharacterCountApi | null) => void;
}

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
