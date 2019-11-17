import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { useLinearProgressFoundation } from './foundation';
import { mergeRefs, Tag, useClassNames } from '@rmwc/base';

/** A component to display linear progress. */
export interface LinearProgressProps {
  /** Progress float percentage between 0 and 1. */
  progress?: number;
  /** A Progress buffer float percentage between 0 and 1. */
  buffer?: number;
  /** Progress goes from right to left. */
  reversed?: boolean;
  /** Hides the progress bar. Adding / removing this prop will trigger an animation in or out.  */
  closed?: boolean;
}

/** A component to display linear progress. */
export const LinearProgress = React.forwardRef<
  any,
  LinearProgressProps & RMWC.ComponentProps
>(function LinearProgress(props, ref) {
  const { reversed, closed, progress, buffer, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-linear-progress',
    {
      'mdc-linear-progress--reversed': reversed,
      'mdc-linear-progress--closed': closed
    }
  ]);
  const { rootEl } = useLinearProgressFoundation(props);

  return (
    <Tag
      tag="nav"
      role="progressbar"
      {...rootEl.props({ ...rest, className })}
      ref={mergeRefs(rootEl.setRef, ref)}
    >
      <LinearProgressBody />
    </Tag>
  );
});
LinearProgress.displayName = 'LinearProgress';

const LinearProgressBody = React.memo(function LinearProgressBody() {
  return (
    <>
      <div className="mdc-linear-progress__buffering-dots" />
      <div className="mdc-linear-progress__buffer" />
      <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
        <div className="mdc-linear-progress__bar-inner" />
      </div>
      <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <div className="mdc-linear-progress__bar-inner" />
      </div>
    </>
  );
});

LinearProgressBody.displayName = 'LinearProgressBody';
