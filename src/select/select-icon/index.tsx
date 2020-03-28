import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCSelectIconFoundation } from '@material/select';
import { Icon, IconProps } from '@rmwc/icon';
import { useClassNames } from '@rmwc/base';
import { useSelectIconFoundation } from './foundation';

export interface SelectIconApi {
  getFoundation: () => MDCSelectIconFoundation;
}

/** An Icon in a Select */
export interface SelectIconProps extends IconProps {
  apiRef?: (api: SelectIconApi) => void;
}

export const SelectIcon = function SelectIcon(
  props: SelectIconProps & RMWC.HTMLProps
) {
  const { apiRef, ...rest } = props;
  const { rootEl } = useSelectIconFoundation(props);
  const className = useClassNames(props, ['mdc-select__icon']);

  return (
    <Icon
      {...rootEl.props({
        ...rest,
        className
      })}
    />
  );
};
