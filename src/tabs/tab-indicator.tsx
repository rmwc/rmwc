import * as React from 'react';

import {
  MDCFadingTabIndicatorFoundation,
  MDCTabIndicatorFoundation,
  MDCSlidingTabIndicatorFoundation
} from '@material/tab-indicator';
import { FoundationComponent } from '@rmwc/base';

export class TabIndicator extends FoundationComponent<
  MDCSlidingTabIndicatorFoundation,
  {}
> {
  private root = this.createElement('root');
  private content = this.createElement('content');

  getDefaultFoundation() {
    return new MDCSlidingTabIndicatorFoundation({
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
    });
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
    return (
      <span {...this.root.props({ className: 'mdc-tab-indicator' })}>
        <span
          ref={this.content.setRef}
          {...this.content.props({})}
          className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"
        />
      </span>
    );
  }
}
