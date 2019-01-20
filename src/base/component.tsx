import * as React from 'react';
import classNamesFunc from 'classnames';
import { parseThemeOptions, ThemeOptionT } from './withTheme';
import { handleDeprecations, DeprecateT } from './utils/deprecation';

type ThemeInputT = ThemeOptionT | ThemeOptionT[];

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

type TagT = string | React.ComponentType<any>;

interface ComponentFactoryOpts<Props> {
  displayName: string;
  classNames?: ClassNamesInputT;
  tag?: TagT;
  deprecate?: DeprecateT;
  consumeProps?: string[];
  // TODO, any had to be included
  // Currently causing errors because things like "role" cant be undefined
  defaultProps?: any & Partial<ComponentProps<any> & Props>;
  render?: (
    props: any,
    ref: React.Ref<any>,
    tag: TagT
  ) => React.ReactElement<HTMLElement>;
}

export interface ComponentProps<T = any> extends React.HTMLProps<T> {
  tag?: TagT;
  theme?: ThemeInputT;
  wrap?: boolean | any;
  // // TODO, any had to be included
  // // This is a type mistmatch between refs in class components vs forwardRef components... string is the
  ref?: any;
}

// ALL OF THESE FUNCTIONS MUTATE THE COPY OF PROPS
// this is intentional and done for speed and memory

const handleClassNames = (
  props: any,
  classNames: ClassNamesInputT,
  className?: string,
  theme?: ThemeInputT
) => {
  const finalClassNames = classNamesFunc(
    className,
    ...(!!theme ? parseThemeOptions(theme) : []),
    ...(typeof classNames === 'function' ? classNames(props) : classNames)
  );

  props.className = finalClassNames;
};

const handleTag = (props: any, defaultTag: TagT, tag?: TagT) => {
  // Handle the case where we are extending a component but passing
  // a string as a tag. For instance, extending an Icon but rendering a span
  if (typeof defaultTag === 'function' && typeof tag === 'string') {
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
  const Component = React.forwardRef<any, P & ComponentProps>(
    (props: P & ComponentProps, ref) => {
      const { className, theme, tag, ...rest } = props;

      handleClassNames(rest, classNames, className, theme);
      handleTag(rest, defaultTag, tag);
      if (deprecate) {
        props = handleDeprecations(rest, deprecate, displayName);
      }
      handleConsumeProps(rest, consumeProps);

      const finalProps: ComponentProps = rest;

      const Tag =
        typeof defaultTag === 'function' && typeof tag === 'string'
          ? defaultTag
          : tag || defaultTag;

      // @ts-ignore
      return render ? (
        render(finalProps, ref, Tag)
      ) : (
        <Tag {...finalProps} ref={ref} />
      );
    }
  );

  Component.displayName = displayName;
  Component.defaultProps = defaultProps;
  return Component;
};
