import * as RMWC from '@rmwc/types';
import * as React from 'react';
import classNamesFunc from 'classnames';
import { parseThemeOptions } from './with-theme';
import { FoundationElement } from './foundation-component';

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

export const Tag = React.forwardRef<
  any,
  RMWC.ComponentProps & { element?: FoundationElement<any, any> }
>(function Tag({ tag: TagEl = 'div', theme, element, ...rest }, ref) {
  const finalProps = element ? element.props(rest) : rest;
  const finalRef = element ? mergeRefs(ref, element.setRef) : ref;

  return <TagEl {...finalProps} ref={finalRef} />;
});

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

type ComponentProps<
  Props extends {},
  Tag extends React.ElementType,
  DefaultElement extends Element
> = Props & {
  tag?: Tag;
  theme?: RMWC.ThemePropT;
} & Props &
  (RMWC.HTMLProps<DefaultElement> | React.ComponentPropsWithRef<Tag>);

export function createComponent<
  P extends {},
  DefaultElement extends Element = HTMLElement
>(
  Component: React.RefForwardingComponent<
    any,
    P & RMWC.HTMLProps<DefaultElement>
  >
) {
  const ForwardComponent = React.forwardRef<
    any,
    ComponentProps<P, any, DefaultElement>
  >(Component);

  const WrappedComponent = <Tag extends React.ElementType = 'div'>(
    props: ComponentProps<P, Tag, DefaultElement>,
    ref: any
  ) => {
    return <ForwardComponent {...props} ref={ref} />;
  };

  WrappedComponent.displayName = Component.constructor.name || 'RMWCComponent';

  return React.forwardRef(WrappedComponent) as typeof WrappedComponent;
}

export function createMemoComponent<
  P extends {},
  DefaultElement extends Element = HTMLElement
>(
  Component: React.RefForwardingComponent<
    any,
    P & RMWC.HTMLProps<DefaultElement>
  >
) {
  const Comp = createComponent<P>(Component);
  return React.memo(Comp) as typeof Comp;
}
