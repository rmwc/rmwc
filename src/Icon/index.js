// @flow
import type { SimpleTagPropsT } from '../Base/simpleTag';
import type { RMWCProviderOptionsT } from '../Provider';
import type { DeprecatedIconPropsT, IconOptionsT } from './defs';

import * as React from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { getProviderOptions } from '../Provider';
import { simpleTag } from '../Base';
import { deprecationWarning } from '../Base/utils/deprecationWarning';
import { getIconStrategy } from './utils';

export const IconRoot = simpleTag({ displayName: 'IconRoot', tag: 'i' });

const renderLigature = ({ content, ...rest }: { content: React.Node }) => {
  return <IconRoot {...rest}>{content}</IconRoot>;
};

const renderClassName = ({ content, ...rest }: { content: React.Node }) => {
  return <IconRoot {...rest} />;
};

const renderUrl = ({ content, ...rest }: { content: string }) => {
  return <IconRoot {...rest} tag="img" src={content} />;
};

const renderComponent = ({
  content,
  ...rest
}: {
  content: React.Element<any>
}) => {
  return <IconRoot {...rest}>{content}</IconRoot>;
};

const iconRenderMap = {
  ligature: renderLigature,
  className: renderClassName,
  url: renderUrl,
  component: renderComponent,
  auto: undefined
};

export type IconPropsT = {
  /** The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. */
  icon?: React.Node,
  /** Additional Icon Options. See the Icon component documentation. */
  iconOptions?: IconOptionsT
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

  providerOptions: RMWCProviderOptionsT;
  context: Object;

  render(): React.Node {
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

    //$FlowFixMe
    return renderToUse({
      ...rest,
      content,
      className: classNames(basenameToUse, rest.className, iconClassName)
    });
  }
}

export default Icon;
