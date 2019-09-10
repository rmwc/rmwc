import * as RMWC from '@rmwc/types';
import * as React from 'react';

import {
  MDCFadingTabIndicatorFoundation,
  MDCTabIndicatorFoundation,
  MDCSlidingTabIndicatorFoundation
} from '@material/tab-indicator';
import { FoundationComponent, classNames } from '@rmwc/base';
import { Icon } from '@rmwc/icon';

export interface TabIndicatorProps {
  /** Use an icon instead of an underline for the tab */
  icon?: RMWC.IconPropT;
  /** The transition to use */
  transition?: 'slide' | 'fade';
}

export class TabIndicator extends FoundationComponent<
  MDCTabIndicatorFoundation,
  TabIndicatorProps
> {
  private root = this.createElement('root');
  private content = this.createElement('content');

  getDefaultFoundation() {
    const adapter = {
      addClass: (className: string) => {
        this.root.addClass(className);
      },
      removeClass: (className: string) => {
        this.root.removeClass(className);
      },
      computeContentClientRect: () =>
        this.content.ref
          ? this.content.ref.getBoundingClientRect()
          : ({} as ClientRect),
      setContentStyleProperty: (prop: string, value: string) => {
        this.content.setStyle(prop, value);
      }
    };

    if (this.props.transition === 'fade') {
      return new MDCFadingTabIndicatorFoundation(adapter);
    }

    return new MDCSlidingTabIndicatorFoundation(adapter);
  }

  activate(previousIndicatorClientRect?: ClientRect) {
    this.foundation.activate(previousIndicatorClientRect);
  }

  deactivate() {
    this.foundation.deactivate();
  }

  computeContentClientRect() {
    return this.foundation.computeContentClientRect();
  }

  render() {
    const { icon, transition } = this.props;
    const Tag = !!icon ? Icon : 'span';

    return (
      <span
        {...this.root.props({
          className: classNames('mdc-tab-indicator', {
            'mdc-tab-indicator--fade': transition === 'fade'
          })
        })}
      >
        <Tag
          aria-hidden="true"
          icon={icon}
          ref={this.content.setRef}
          {...this.content.props({})}
          className={`mdc-tab-indicator__content mdc-tab-indicator__content--${
            icon ? 'icon' : 'underline'
          }`}
        />
      </span>
    );
  }
}
