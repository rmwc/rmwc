import React, { useEffect, useMemo, useState } from 'react';
import { emptyClientRect, useFoundation } from '@rmwc/base';
import {
  MDCSegmentedButtonSegmentFoundation,
  SegmentDetail
} from '@material/segmented-button';
import { SegmentApi, SegmentProps } from './';
import { useSegmentedButton } from '../segmented-button-context';

export const useSegmentFoundation = (
  props: SegmentProps & React.HTMLProps<any>
) => {
  const [isSingleSelect, setIsSingleSelect] = useState(false);
  const [index, setIndex] = useState(-1);

  const contextApi = useSegmentedButton();

  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl, emit }) => {
      const getSegmentId = (): string | undefined => {
        return foundation.getSegmentId();
      };
      return new MDCSegmentedButtonSegmentFoundation({
        isSingleSelect: () => {
          return isSingleSelect;
        },
        getAttr: (attrName) => {
          return rootEl.getProp(attrName as any);
        },
        setAttr: (attrName, value) => {
          rootEl.ref?.setAttribute(attrName, value);
        },
        addClass: (className) => {
          rootEl.ref?.classList.add(className);
        },
        removeClass: (className) => {
          rootEl.ref?.classList.remove(className);
        },
        hasClass: (className) => {
          return rootEl.hasClass(className);
        },
        notifySelectedChange: (selected) => {
          emit<SegmentDetail>(
            'selected',
            {
              index: index,
              selected,
              segmentId: getSegmentId()
            },
            true /* shouldBubble */
          );
        },
        getRootBoundingClientRect: () => {
          return rootEl.ref?.getBoundingClientRect() ?? emptyClientRect;
        }
      });
    }
  });

  const { rootEl } = elements;

  const handleClick = () => foundation.handleClick();

  rootEl.ref?.addEventListener('click', handleClick);

  const segmentApi = useMemo<SegmentApi>(() => {
    return {
      setIsSingleSelect: (isSingleSelect) => setIsSingleSelect(isSingleSelect),
      index: rootEl.ref?.parentElement
        ? Array.from(rootEl.ref.parentElement.children).indexOf(rootEl.ref)
        : -1,
      setIndex: (index) => {
        setIndex(index);
        return index;
      },
      isSelected: () => foundation.isSelected(),
      setSelected: () => foundation.setSelected(),
      setUnselected: () => foundation.setUnselected(),
      getSegmentId: () => foundation.getSegmentId()
    };
  }, [foundation, rootEl.ref]);

  useEffect(() => {
    contextApi.registerSegment(segmentApi);

    return () => {
      contextApi.unregisterSegment(segmentApi);
    };
  }, [contextApi, segmentApi]);

  return {
    isSingleSelect,
    ...elements
  };
};
