import * as RMWC from '@rmwc/types';
import React from 'react';
import { useProviderContext } from '@rmwc/provider';
import { classNames, Tag, createComponent, getDisplayName } from '@rmwc/base';

/** An Icon component. Most of these options can be set once globally, read the documentation on Provider for more info. */
export interface IconProps {
  /** The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. */
  icon?: RMWC.IconPropT;
}

export type IconHTMLProps = RMWC.HTMLProps<HTMLElement>;

/**
 * Given content, tries to figure out an appropriate strategy for it
 */
const processAutoStrategy = (content: React.ReactNode): RMWC.IconStrategyT => {
  // check for URLS
  if (typeof content === 'string' && content.includes('/')) {
    return 'url';
  }

  // handle JSX components
  if (React.isValidElement(content)) {
    return 'component';
  }

  // we don't know what it is, default to ligature for compat with material icons
  return 'ligature';
};

/**
 * Get the actual icon strategy to use
 */
export const getIconStrategy = (
  content: React.ReactNode,
  strategy: string | null,
  providerStrategy: string | null
) => {
  strategy = strategy || providerStrategy || 'auto';

  if (strategy === 'auto') {
    return processAutoStrategy(content);
  }

  return strategy;
};

const renderLigature = ({ content, ...rest }: { content: React.ReactNode }) => (
  <IconRoot {...rest}>{content}</IconRoot>
);

const renderClassName = ({
  content,
  ...rest
}: {
  content: React.ReactNode;
}) => <IconRoot {...rest} />;

const renderUrl = ({ content, ...rest }: { content: string }) => (
  <IconRoot
    {...rest}
    style={{
      ...(rest as any).style,
      backgroundImage: `url(${content})`
    }}
  />
);

const renderComponent = ({
  content,
  ...rest
}: {
  content: React.ReactElement<any>;
}) => {
  if (content.type === 'svg') {
    const { children, ...svgRest } = content.props;
    return (
      <IconRoot {...svgRest} {...rest} tag="svg">
        {children}
      </IconRoot>
    );
  }

  return <IconRoot {...rest}>{content}</IconRoot>;
};

const iconRenderMap: {
  [key: string]: ((content: any, ...rest: any) => Exclude<React.ReactNode, "ReactText">) | undefined;
} = {
  ligature: renderLigature,
  className: renderClassName,
  url: renderUrl,
  component: renderComponent,
  auto: undefined
};

const buildIconOptions = (icon?: RMWC.IconPropT) => {
  if (React.isValidElement(icon) || (icon && typeof icon !== 'object')) {
    return {
      icon
    };
  }
  return icon as RMWC.IconOptions;
};

const IconRoot = React.forwardRef(function IconRoot(
  props: any,
  ref: React.Ref<any>
) {
  return <Tag tag="i" {...props} ref={ref} />;
});

/** An Icon component. Most of these options can be set once globally, read the documentation on Provider for more info. */
export const Icon = createComponent<IconProps, IconHTMLProps>(function (
  { icon, ...rest },
  ref
) {
  const providerContext = useProviderContext();

  // Build icon options object
  const {
    icon: content,
    strategy,
    prefix,
    basename,
    render,
    size,
    ...optionsRest
  }: RMWC.IconOptions = {
    ...buildIconOptions(icon)
  };

  // Get provider options
  const {
    basename: providerBasename = null,
    prefix: providerPrefix = null,
    strategy: providerStrategy = null,
    render: providerRender = null
  } = providerContext.icon || {};

  const contentToUse = content;

  const strategyToUse = getIconStrategy(
    contentToUse,
    strategy || null,
    providerStrategy || null
  );
  const prefixToUse = prefix || providerPrefix;
  const basenameToUse = basename === undefined ? providerBasename : basename;
  const iconClassName =
    strategyToUse === 'className' && typeof content === 'string'
      ? `${String(prefixToUse)}${content}`
      : null;

  const rendererFromMap = !!strategyToUse && iconRenderMap[strategyToUse];

  let renderToUse = rendererFromMap || null;

  if (strategyToUse === 'custom') {
    renderToUse = render || providerRender;
  }

  if (!renderToUse) {
    console.error(
      `Icon: rendering not implemented for ${String(strategyToUse)}.`
    );
    return null;
  }

  const rendered = renderToUse({
    ...rest,
    ...optionsRest,
    ref,
    content: contentToUse,
    className: classNames(
      'rmwc-icon',
      `rmwc-icon--${strategyToUse}`,
      basenameToUse,
      rest.className,
      optionsRest.className,
      iconClassName,
      {
        [`rmwc-icon--size-${size || ''}`]: !!size
      }
    )
  });

  if (!React.isValidElement<any>(rendered)) {
    return null;
  }

  const childDisplayName = getDisplayName(rendered.props.children);

  if (
    childDisplayName.includes('Avatar') ||
    childDisplayName.includes('Icon')
  ) {
    return React.cloneElement(rendered.props.children, {
      ...rendered.props.children.props,
      ...rendered.props,
      ref,
      // prevents an infinite loop
      children: rendered.props.children.props.children,
      className: classNames(
        rendered.props.className,
        rendered.props.children.props.className
      )
    });
  }

  return rendered;
});

Icon.displayName = 'Icon';
