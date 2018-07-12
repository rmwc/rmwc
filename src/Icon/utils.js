// @flow
import * as React from 'react';

// prettier-ignore
export type IconStrategyT = 'auto' | 'ligature' | 'className' | 'url' | 'component' | 'custom';

/**
 * Given content, tries to figure out an appropriate strategy for it
 */
const processAutoStrategy = (content: React.Node): IconStrategyT => {
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
};

/**
 * Get the actual icon strategy to use
 */
export const getIconStrategy = (
  content: React.Node,
  strategy: string | null,
  defaultStrategy: string | null
) => {
  strategy = strategy || defaultStrategy;

  if (strategy === 'auto') {
    return processAutoStrategy(content);
  }

  return strategy;
};
