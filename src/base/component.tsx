import * as RMWC from '@rmwc/types';
import * as React from 'react';
import classNamesFunc from 'classnames';
import { parseThemeOptions } from './with-theme';
import { handleDeprecations, DeprecateT } from './utils/deprecation';

type ClassNamesInputT<Props> =
  | undefined
  | ((
      props: Props
    ) => Array<
      | string
      | undefined
      | null
      | { [className: string]: boolean | undefined | string | number }
    >)
  | string[]
  | Array<
      | string
      | undefined
      | null
      | { [className: string]: boolean | undefined | string | number }
    >;

interface ComponentFactoryOpts<Props> {
  displayName: string;
  classNames?: ClassNamesInputT<Props>;
  tag?: RMWC.TagT;
  deprecate?: DeprecateT;
  consumeProps?: string[];
  // TODO, any had to be included
  // Currently causing errors because things like "role" cant be undefined
  defaultProps?: any & Partial<RMWC.ComponentProps & Props>;
  useRender?: (
    props: Props & RMWC.ComponentProps,
    ref: React.Ref<any>,
    tag: RMWC.TagT
  ) => React.ReactElement<any>;
}

// ALL OF THESE FUNCTIONS MUTATE THE COPY OF PROPS
// this is intentional and done for speed and memory

const handleClassNames = <Props extends any>(
  props: any,
  classNames: ClassNamesInputT<Props>,
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
  if (typeof defaultTag !== 'string') {
    props.tag = tag;
    return defaultTag;
  }

  return tag || defaultTag;
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
  useRender
}: ComponentFactoryOpts<P>) => {
  const Component = React.forwardRef((props: RMWC.ComponentProps & P, ref) => {
    const { className, theme, tag, ...rest } = props;
    let newProps = rest;

    handleClassNames(newProps, classNames, className, theme);
    const Tag = handleTag(newProps, defaultTag, tag);

    if (deprecate) {
      newProps = handleDeprecations(newProps, deprecate, displayName);
    }
    handleConsumeProps(newProps, consumeProps);
    const finalProps: RMWC.ComponentProps = newProps;

    return useRender ? (
      useRender(finalProps as RMWC.ComponentProps & P, ref, Tag)
    ) : (
      <Tag {...finalProps} ref={ref} />
    );
  });

  Component.displayName = displayName;
  Component.defaultProps = defaultProps;
  return (Component as unknown) as React.ComponentType<
    RMWC.MergeInterfacesT<P, RMWC.ComponentProps>
  >;
};

export const useTag = <Props extends { [key: string]: any }>(
  props: Props,
  defaultTag: RMWC.TagT = 'div'
) => {
  const Tag = handleTag(props, defaultTag, props.tag);
  return Tag;
};

export const useClassNames = <Props extends { [key: string]: any }>(
  props: Props,
  classNames: ClassNamesInputT<Props>
) => {
  return classNamesFunc(
    props.className,
    ...(!!props.theme ? parseThemeOptions(props.theme) : []),
    ...(typeof classNames === 'function' ? classNames(props) : classNames)
  );
};

export const mergeRefs = (
  ...refs: Array<React.Ref<any> | undefined | null>
) => (el: any) => {
  for (const ref of refs) {
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref && 'current' in ref) {
      // @ts-ignore
      ref.current = el;
    }
  }
};
