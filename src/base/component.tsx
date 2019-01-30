import * as RMWC from '@rmwc/types';
import * as React from 'react';
import classNamesFunc from 'classnames';
import { parseThemeOptions } from './withTheme';
import { handleDeprecations, DeprecateT } from './utils/deprecation';

type ClassNamesInputT =
  | ((
      props: any
    ) => Array<
      | string
      | undefined
      | null
      | { [className: string]: boolean | undefined | string | number }
    >)
  | string[];

interface ComponentFactoryOpts<Props> {
  displayName: string;
  classNames?: ClassNamesInputT;
  tag?: RMWC.TagT;
  deprecate?: DeprecateT;
  consumeProps?: string[];
  // TODO, any had to be included
  // Currently causing errors because things like "role" cant be undefined
  defaultProps?: any & Partial<RMWC.ComponentProps<any> & Props>;
  render?: (
    props: any,
    ref: React.Ref<any>,
    tag: RMWC.TagT
  ) => React.ReactElement<HTMLElement>;
}

// ALL OF THESE FUNCTIONS MUTATE THE COPY OF PROPS
// this is intentional and done for speed and memory

const handleClassNames = (
  props: any,
  classNames: ClassNamesInputT,
  className?: string,
  theme?: RMWC.ThemePropT
) => {
  const finalClassNames = classNamesFunc(
    className,
    ...(!!theme ? parseThemeOptions(theme) : []),
    ...(typeof classNames === 'function' ? classNames(props) : classNames)
  );

  props.className = finalClassNames;
};

const handleTag = (props: any, defaultTag: RMWC.TagT, tag?: RMWC.TagT) => {
  // Handle the case where we are extending a component but passing
  // a string as a tag. For instance, extending an Icon but rendering a span
  if (typeof defaultTag !== 'string' && typeof tag === 'string') {
    props.tag = tag;
  }
};

const handleConsumeProps = (props: any, consumeProps: string[]) => {
  consumeProps.forEach(p => {
    delete props[p];
  });
};
export const componentFactory = <P extends {}>({
  displayName,
  classNames = [],
  tag: defaultTag = 'div',
  deprecate,
  defaultProps,
  consumeProps = [],
  render
}: ComponentFactoryOpts<P>) => {
  const Component = React.forwardRef((props: RMWC.ComponentProps & P, ref) => {
    const { className, theme, tag, ...rest } = props;

    handleClassNames(rest, classNames, className, theme);
    handleTag(rest, defaultTag, tag);
    if (deprecate) {
      props = handleDeprecations(rest, deprecate, displayName);
    }
    handleConsumeProps(rest, consumeProps);

    const finalProps: RMWC.ComponentProps = rest;

    // Do some switching to figure out what tag to use
    // if we are extending an icon, we can still honor
    // someone passing in an 'a' tag, while extending the icon
    const Tag =
      typeof defaultTag !== 'string' && typeof tag === 'string'
        ? defaultTag
        : tag || defaultTag;

    // @ts-ignore
    return render ? (
      render(finalProps, ref, Tag)
    ) : (
      <Tag {...finalProps} ref={ref} />
    );
  });

  Component.displayName = displayName;
  Component.defaultProps = defaultProps;
  return (Component as unknown) as React.ComponentType<P & RMWC.ComponentProps>;
};
