import * as React from 'react';
import classNamesFunc from 'classnames';
import { parseThemeOptions } from './withTheme';
import { deprecationWarning } from './utils/deprecationWarning';

type ExtractProps<
  TComponentOrTProps
> = TComponentOrTProps extends React.Component<infer TProps, any>
  ? TProps
  : TComponentOrTProps;

type ThemeOptionT =
  | string
  | 'primary'
  | 'secondary'
  | 'background'
  | 'surface'
  | 'onPrimary'
  | 'onSecondary'
  | 'onSurface'
  | 'onError'
  | 'textPrimaryOnBackground'
  | 'textSecondaryOnBackground'
  | 'textHintOnBackground'
  | 'textDisabledOnBackground'
  | 'textIconOnBackground'
  | 'textPrimaryOnLight'
  | 'textSecondaryOnLight'
  | 'textHintOnLight'
  | 'textDisabledOnLight'
  | 'textIconOnLight'
  | 'textPrimaryOnDark'
  | 'textSecondaryOnDark'
  | 'textHintOnDark'
  | 'textDisabledOnDark'
  | 'textIconOnDark';

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

type DeprecateT = {
  [oldPropName: string]: string | [string, (value: any) => void];
};

interface ComponentFactoryOpts<P> {
  displayName: string;
  classNames?: ClassNamesInputT;
  tag?: TagT;
  deprecate?: DeprecateT;
  consumeProps?: string[];
  defaultProps?: P;
}

export interface ComponentProps<T = any> extends React.HTMLProps<T> {
  tag?: TagT;
  theme?: ThemeInputT;
  ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
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

const handleDeprecations = (
  props: any,
  deprecate: DeprecateT,
  displayName: string
) => {
  for (const oldPropName in deprecate) {
    const newProp = deprecate[oldPropName];
    let newPropName;
    let transformProp = (value: any) => value;

    if (Array.isArray(newProp)) {
      newPropName = newProp[0];
      transformProp = newProp[1];
    } else {
      newPropName = newProp;
    }

    if (props[oldPropName] !== undefined) {
      if (newPropName === '') {
        deprecationWarning(
          `prop '${oldPropName}' has been removed from the ${displayName ||
            ''} component and is no longer a valid prop.`
        );
      } else {
        props[newPropName] = transformProp(props[oldPropName]);
        let propTransformMessage = '';
        if (props[newPropName] !== props[oldPropName]) {
          propTransformMessage = ` The old value has also been converted from '${
            props[newPropName]
          }' to '${props[oldPropName]}'`;
        }

        deprecationWarning(
          `prop '${oldPropName}' has been replaced with '${newPropName}' on the ${displayName ||
            ''} component.${propTransformMessage}`
        );
      }

      delete props[oldPropName];
    }
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
  consumeProps = []
}: ComponentFactoryOpts<P>) => {
  const Component = React.forwardRef<any, any>(
    (props: P & ComponentProps, ref) => {
      const { className, theme, tag, ...rest } = props;

      handleClassNames(rest, classNames, className, theme);
      handleTag(rest, defaultTag, tag);
      deprecate && handleDeprecations(rest, deprecate, displayName);
      handleConsumeProps(rest, consumeProps);

      const finalProps: ComponentProps = rest;

      const Tag =
        typeof defaultTag === 'function' && typeof tag === 'string'
          ? defaultTag
          : tag || defaultTag;

      // @ts-ignore
      return <Tag {...finalProps} ref={ref} />;
    }
  );

  Component.displayName = displayName;
  Component.defaultProps = defaultProps;
  return Component;
};
