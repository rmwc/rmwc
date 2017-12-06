// @flow
import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../Provider';
import { simpleTag } from '../Base';

import type { RMWCProviderOptionsT } from '../Provider';

export const IconRoot = simpleTag({ displayName: 'IconRoot', tag: 'i' });

type IconStrategyT = 'auto' | 'ligature' | 'className' | 'url' | 'component';

type IconPropsT = {
  /** The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs */
  use: React.Node,

  /** Handle multiple methods of embedding an icon. */
  strategy: IconStrategyT,

  /** A className prefix to use when using css font icons that use prefixes, i.e. font-awesome-, ion-, glyphicons- */
  prefix: string,

  /** A base className for the icon namespace, i.e. material-icons */
  basename: string
};

export class Icon extends React.PureComponent<IconPropsT> {
  static defaultProps = {
    use: undefined
  };

  componentWillMount() {
    this.providerOptions = getProviderOptions(this.context);
  }

  static contextTypes = {
    RMWCOptions: PropTypes.object
  };

  getStrategy(
    content: React.Node,
    strategy: IconStrategyT,
    defaultStrategy: IconStrategyT
  ): IconStrategyT {
    strategy = strategy || defaultStrategy;

    if (strategy === 'auto') {
      // check for URLS
      if (
        typeof content === 'string' &&
        (content.startsWith('/') ||
          content.startsWith('http://') ||
          content.startsWith('https://'))
      ) {
        return 'url';
      }

      // handle JSX components
      if (typeof content === 'object') {
        return 'component';
      }

      // we dont know what it is, default to ligature for compat with material icons
      return 'ligature';
    }

    return strategy;
  }

  providerOptions: RMWCProviderOptionsT;
  context: Object;

  render() {
    const { use, children, strategy, prefix, basename, ...rest } = this.props;
    const content = use || children;

    const {
      iconClassNameBase: defaultBasename,
      iconClassNamePrefix: defaultPrefix,
      iconStrategy: defaultStrategy
    } = this.providerOptions;

    const strategyToUse = this.getStrategy(content, strategy, defaultStrategy);
    const prefixToUse = prefix || defaultPrefix;
    const basenameToUse = basename === undefined ? defaultBasename : basename;

    const iconProps =
      strategyToUse === 'url' ?
        {
          tag: 'img',
          src: content
        } :
        {};

    const contentToRender =
      strategyToUse === 'ligature' || strategyToUse === 'component' ?
        content :
        null;

    const iconClassName =
      strategyToUse === 'className' && typeof content === 'string' ?
        `${prefixToUse}${content}` :
        null;

    return (
      <IconRoot
        {...rest}
        {...iconProps}
        className={classNames(basenameToUse, rest.className, iconClassName)}
      >
        {contentToRender}
      </IconRoot>
    );
  }
}

export default Icon;
