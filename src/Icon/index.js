// @flow
import type { SimpleTagPropsT } from '../Base/simpleTag';
import type { RMWCProviderOptionsT } from '../Provider';
import type { IconStrategyT } from './utils';

import * as React from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { getProviderOptions } from '../Provider';
import { simpleTag } from '../Base';
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
  use?: React.Node,
  /** Handle multiple methods of embedding an icon. 'ligature' uses ligature style embedding like material-icons, 'className' adds a class onto the element for libraries like glyphicons and ion icons, 'url' will load a remote image, and 'component' will render content as children like SVGs or any other React node. 'custom' allows you to specify your own render prop. If not set, 'auto' will be used or the defaults set inside of RMWCProvider. */
  strategy?: IconStrategyT,
  /** A className prefix to use when using css font icons that use prefixes, i.e. font-awesome-, ion-, glyphicons-. This only applies when using the 'className' strategy. */
  prefix?: string,
  /** A base className for the icon namespace, i.e. material-icons. */
  basename?: string,
  /** A render function to use when using the 'custom' strategy. */
  render?: (content: mixed) => React.Node
} & SimpleTagPropsT;

/**
 * An Icon component. Most of these options can be set once globally, read the documentation on Provider for more info.
 */
export class Icon extends React.PureComponent<IconPropsT> {
  static displayName = 'Icon';

  static defaultProps = {
    use: undefined
  };

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
      use,
      children,
      render,
      strategy,
      prefix,
      basename,
      ...rest
    } = this.props;

    const {
      iconClassNameBase: defaultBasename,
      iconClassNamePrefix: defaultPrefix,
      iconStrategy: defaultStrategy,
      iconRender: defaultCustomRender
    } = this.providerOptions;

    const content = use || children;
    const strategyToUse = getIconStrategy(
      content,
      strategy || null,
      defaultStrategy || null
    );
    const prefixToUse = prefix || defaultPrefix;
    const basenameToUse = basename === undefined ? defaultBasename : basename;
    const iconClassName =
      strategyToUse === 'className' && typeof content === 'string'
        ? `${String(prefixToUse)}${content}`
        : null;

    const renderToUse =
      strategyToUse === 'custom'
        ? render || defaultCustomRender
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
