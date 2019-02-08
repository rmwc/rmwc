import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { withProviderContext, WithProviderContext } from '@rmwc/provider';
import { componentFactory, classNames, deprecationWarning } from '@rmwc/base';

type IconElementT = React.ReactNode;
export type IconSizeT = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export type IconStrategyT =
  | 'auto'
  | 'ligature'
  | 'className'
  | 'url'
  | 'component'
  | 'custom';

export interface IconOptions {
  icon: IconElementT;
  /**
   * Handle multiple methods of embedding an icon.
   * 'ligature' uses ligature style embedding like material-icons,
   * 'className' adds a class onto the element for libraries like glyphicons and ion icons,
   * 'url' will load a remote image, and
   * 'component' will render content as children like SVGs or any other React node.
   * 'custom' allows you to specify your own render prop.
   * If not set, 'auto' will be used or the defaults set inside of RMWCProvider.
   * */
  strategy?: IconStrategyT;
  /**
   * A className prefix to use when using css font icons that use prefixes,
   * i.e. font-awesome-, ion-, glyphicons-.
   * This only applies when using the 'className' strategy.
   **/
  prefix?: string;
  /** A base className for the icon namespace, i.e. material-icons. */
  basename?: string;
  /** A render function to use when using the 'custom' strategy. */
  render?: (
    props: { content: IconElementT; className: string }
  ) => React.ReactNode;
  /** A size to render the icon  */
  size?: IconSizeT;
  /** Additional props */
  [key: string]: any;
}

export type IconPropT = IconElementT | IconOptions;

export interface IconProps extends DeprecatedIconProps {
  /** The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. */
  icon?: IconPropT;
}

export interface DeprecatedIconProps {
  /** DEPRECATED: Additional Icon Options. See the Icon component documentation. */
  iconOptions?: IconOptions;
}

/**
 * Given content, tries to figure out an appropriate strategy for it
 */
const processAutoStrategy = (content: React.ReactNode): IconStrategyT => {
  // check for URLS
  if (typeof content === 'string' && content.includes('/')) {
    return 'url';
  }

  // handle JSX components
  if (React.isValidElement(content)) {
    return 'component';
  }

  // we dont know what it is, default to ligature for compat with material icons
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
    className={classNames((rest as any).className, 'rmwc-icon--image')}
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
  content: React.ReactNode;
}) => <IconRoot {...rest}>{content}</IconRoot>;

const iconRenderMap: {
  [key: string]: ((content: any, ...rest: any) => React.ReactNode) | undefined;
} = {
  ligature: renderLigature,
  className: renderClassName,
  url: renderUrl,
  component: renderComponent,
  auto: undefined
};

const buildIconOptions = (icon?: IconPropT) => {
  if (React.isValidElement(icon) || (icon && typeof icon !== 'object')) {
    return {
      icon
    };
  }
  return icon as IconOptions;
};

const IconRoot = componentFactory({ displayName: 'IconRoot', tag: 'i' });

/**
 * An Icon component. Most of these options can be set once globally, read the documentation on Provider for more info.
 */
export const Icon = withProviderContext()(
  ({
    icon,
    iconOptions: deprecatedIconOption,
    providerContext,
    ...rest
  }: IconProps &
    DeprecatedIconProps &
    WithProviderContext &
    RMWC.ComponentProps) => {
    // handle deprecation
    if (!!deprecatedIconOption) {
      const converted = {
        content: typeof icon === 'string' ? icon : `<MyComponent {...}/>`,
        ...deprecatedIconOption
      };

      deprecationWarning(
        `Icon component prop 'iconOptions' is deprecated. You options should now be passed directly to the 'icon' prop. I.E. icon={${JSON.stringify(
          converted
        )}}`
      );
    }

    // Build icon options object
    const {
      icon: content,
      strategy,
      prefix,
      basename,
      render,
      size,
      ...optionsRest
    }: IconOptions = {
      ...buildIconOptions(icon),
      ...deprecatedIconOption
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

    // For some reason TS thinks the render method will return undefined...
    const renderToUse: any =
      strategyToUse === 'custom'
        ? render || providerRender
        : rendererFromMap || null;

    if (!renderToUse) {
      console.error(
        `Icon: rendering not implemented for ${String(strategyToUse)}.`
      );
      return null;
    }

    const rendered = renderToUse({
      ...rest,
      ...optionsRest,
      content: contentToUse,
      className: classNames(
        'rmwc-icon',
        basenameToUse,
        rest.className,
        optionsRest.className,
        iconClassName,
        {
          [`rmwc-icon--size-${size || ''}`]: !!size
        }
      )
    });

    // Unwrap double layered icons...

    if (
      rendered.props.children &&
      rendered.props.children.type &&
      rendered.props.children.type.displayName &&
      (rendered.props.children.type.displayName === 'Avatar' ||
        rendered.props.children.type.displayName.endsWith('Icon'))
    ) {
      return React.cloneElement(rendered.props.children, {
        ...rendered.props.children.props,
        ...rendered.props,
        // prevents an infinite loop
        children: rendered.props.children.props.children,
        className: classNames(
          rendered.props.className,
          rendered.props.children.props.className
        )
      });
    }

    return rendered;
  }
);

Icon.displayName = 'Icon';
