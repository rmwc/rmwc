import { SimpleTagPropsT } from '@rmwc/base/simpleTag';
import { RMWCProviderOptionsT } from '@rmwc/provider';
import { DeprecatedIconPropsT, IconOptionsT } from './defs';

import * as React from 'react';
import { getProviderOptions } from '@rmwc/provider';
import { simpleTag, classNames, PropTypes } from '@rmwc/base';
import { deprecationWarning } from '@rmwc/base/utils/deprecationWarning';
import { getIconStrategy } from './utils';

export const IconRoot = simpleTag({ displayName: 'IconRoot', tag: 'i' });

const renderLigature = ({ content, ...rest }: { content: React.ReactNode }) => {
  return <IconRoot {...rest}>{content}</IconRoot>;
};

const renderClassName = ({
  content,
  ...rest
}: {
  content: React.ReactNode;
}) => {
  return <IconRoot {...rest} />;
};

const renderUrl = ({ content, ...rest }: { content: string }) => {
  return <IconRoot {...rest} tag="img" src={content} />;
};

const renderComponent = ({
  content,
  ...rest
}: {
  content: React.ReactElement<any>;
}) => {
  return <IconRoot {...rest}>{content}</IconRoot>;
};

const iconRenderMap: {
  [key: string]: ((content: any, ...rest: any) => React.ReactNode) | undefined;
} = {
  ligature: renderLigature,
  className: renderClassName,
  url: renderUrl,
  component: renderComponent,
  auto: undefined
};

export type IconPropsT = {
  /** The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. */
  icon?: React.ReactNode;
  /** Additional Icon Options. See the Icon component documentation. */
  iconOptions?: IconOptionsT;
} & DeprecatedIconPropsT &
  SimpleTagPropsT;

/**
 * An Icon component. Most of these options can be set once globally, read the documentation on Provider for more info.
 */
export class Icon extends React.PureComponent<IconPropsT> {
  static displayName = 'Icon';

  static contextTypes = {
    RMWCOptions: PropTypes.object
  };

  componentWillMount() {
    this.providerOptions = getProviderOptions(this.context);
  }

  // @ts-ignore
  providerOptions: RMWCProviderOptionsT;
  // @ts-ignore
  context: Object;

  render(): React.ReactNode {
    const {
      icon,
      iconOptions = {},
      use,
      children,
      render,
      strategy,
      prefix,
      basename,
      ...rest
    } = this.props;

    if (use !== undefined || children !== undefined) {
      deprecationWarning(
        'Specifying icons via `use` prop or as `children` is deprecated and will be removed in the next release. Please use the `icon` prop instead. '
      );
    }

    [
      [strategy, 'strategy'],
      [prefix, 'prefix'],
      [render, 'render'],
      [basename, 'basename']
    ].forEach(k => {
      if (k[0] !== undefined) {
        deprecationWarning(
          `The Icon \`${k[1]}\` prop has been replaced by \`iconOptions.${
            k[1]
          }\`.`
        );
      }
    });

    // Get provider options
    const {
      iconClassNameBase: defaultBasename,
      iconClassNamePrefix: defaultPrefix,
      iconStrategy: defaultStrategy,
      iconRender: defaultCustomRender
    } = this.providerOptions;

    const content = icon || use || children;

    const strategyToUse = getIconStrategy(
      content,
      iconOptions.strategy || strategy || null,
      defaultStrategy || null
    );
    const prefixToUse = iconOptions.prefix || prefix || defaultPrefix;
    const basenameToUse =
      (iconOptions.basename || basename) === undefined
        ? defaultBasename
        : iconOptions.basename || basename;
    const iconClassName =
      strategyToUse === 'className' && typeof content === 'string'
        ? `${String(prefixToUse)}${content}`
        : null;

    const renderToUse =
      strategyToUse === 'custom'
        ? iconOptions.render || render || defaultCustomRender
        : !!strategyToUse && iconRenderMap[strategyToUse] !== undefined
        ? iconRenderMap[strategyToUse]
        : undefined;

    if (!renderToUse) {
      console.error(
        `Icon: rendering not implemented for ${String(strategyToUse)}.`
      );
      return null;
    }

    //@ts-ignore
    return renderToUse({
      ...rest,
      content,
      className: classNames(
        'rmwc-icon',
        basenameToUse,
        rest.className,
        iconClassName,
        {
          [`rmwc-icon--size-${iconOptions.size || ''}`]: !!iconOptions.size
        }
      )
    });
  }
}

export default Icon;
