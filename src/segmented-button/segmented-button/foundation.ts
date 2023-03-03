import React, { useEffect, useRef } from 'react';
import { useFoundation } from '@rmwc/base';
import {
  MDCSegmentedButtonFoundation,
  SegmentDetail
} from '@material/segmented-button';
import { SegmentedButtonProps } from './';
import { SegmentApi } from '../segment';

export const useSegmentedButtonFoundation = (
  props: SegmentedButtonProps & React.HTMLProps<any>
) => {
  const segmentApi = useRef<SegmentApi>();
  const setSegmentApi = (api: SegmentApi) => (segmentApi.current = api);
  const segmentsList = useRef<SegmentApi[]>([]);

  const mappedSegments = segmentsList.current.map(
    (segment: SegmentApi, index: number) => {
      return {
        index,
        selected: segment.isSelected(),
        segmentId: segment.getSegmentId()
      };
    }
  );

  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl, emit }) => {
      return new MDCSegmentedButtonFoundation({
        hasClass: (className) => {
          return rootEl.hasClass(className);
        },
        getSegments: () => {
          console.log({ mappedSegments });
          return mappedSegments;
        },
        selectSegment: (indexOrSegmentId) => {
          const segmentDetail = mappedSegments.find(
            (detail: SegmentDetail) =>
              detail.index === indexOrSegmentId ||
              detail.segmentId === indexOrSegmentId
          );
          console.log({ segmentDetail });
          if (segmentDetail) {
            segmentsList.current[segmentDetail.index].setSelected();
          }
        },
        unselectSegment: (indexOrSegmentId) => {
          const segmentDetail = mappedSegments.find(
            (detail: SegmentDetail) =>
              detail.index === indexOrSegmentId ||
              detail.segmentId === indexOrSegmentId
          );
          if (segmentDetail) {
            segmentsList.current[segmentDetail.index].setUnselected();
          }
        },
        notifySelectedChange: (detail) => {
          emit<SegmentDetail>('change', detail, true /* shouldBubble */);
        }
      });
    }
  });

  const { rootEl } = elements;

  const handledSelect = (event: any) => {
    foundation.handleSelected(event.detail);
  };

  rootEl.ref?.addEventListener('selected', handledSelect);

  useEffect(() => {
    const isSingleSelect = rootEl.ref
      ? rootEl.ref.classList.contains('mdc-segmented-button--single-select')
      : false;
    for (let i = 0; i < segmentsList.current.length; i++) {
      const segment = segmentsList.current[i];
      segment.setIndex(i);
      segment.setIsSingleSelect(isSingleSelect);
    }
  }, [foundation, rootEl]);

  const registerSegment = (segment: SegmentApi) => {
    segmentsList.current.push(segment);
    segmentsList.current.sort((a, b) => a.index - b.index);
  };
  const unregisterSegment = (segment: SegmentApi) => {
    segmentsList.current.splice(segmentsList.current.indexOf(segment), 1);
    segmentsList.current.sort((a, b) => a.index - b.index);
  };

  useEffect(() => {
    segmentApi.current?.setSelected();
  }, []);

  return {
    registerSegment,
    unregisterSegment,
    setSegmentApi,
    ...elements
  };
};
