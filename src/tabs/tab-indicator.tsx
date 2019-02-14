import * as React from 'react';

import {
  MDCFadingTabIndicatorFoundation,
  MDCTabIndicatorFoundation,
  MDCSlidingTabIndicatorFoundation
  // @ts-ignore
} from '@material/tab-indicator';
import { FoundationComponent } from '@rmwc/base';

export class TabIndicator extends FoundationComponent<{}> {
  private root = this.createElement('root');
  private content = this.createElement('content');

  getDefaultFoundation() {
    const adapter = /** @type {!MDCTabIndicatorAdapter} */ (Object.assign({
      addClass: (className: string) => {
        this.root.addClass(className);
      },
      removeClass: (className: string) => {
        this.root.removeClass(className);
      },
      computeContentClientRect: () =>
        this.content.ref && this.content.ref.getBoundingClientRect(),
      setContentStyleProperty: (prop: string, value: string) => {
        this.content.setStyle(prop, value);
      }
    }));

    // if (this.root.hasClass(MDCTabIndicatorFoundation.cssClasses.FADE)) {
    //   return new MDCFadingTabIndicatorFoundation(adapter);
    // }

    // Default to the sliding indicator
    return new MDCSlidingTabIndicatorFoundation(adapter);
  }

  activate(previousIndicatorClientRect: ClientRect) {
    // Early exit if no indicator is present to handle cases where an indicator
    // may be activated without a prior indicator state
    if (!previousIndicatorClientRect) {
      this.foundation.adapter_.addClass(
        MDCTabIndicatorFoundation.cssClasses.ACTIVE
      );
      return;
    }

    const currentClientRect = this.computeContentClientRect();
    const widthDelta =
      previousIndicatorClientRect.width / currentClientRect.width;
    const xPosition = previousIndicatorClientRect.left - currentClientRect.left;
    this.foundation.adapter_.addClass(
      MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION
    );
    this.foundation.adapter_.setContentStyleProperty(
      'transform',
      `translateX(${xPosition}px) scaleX(${widthDelta})`
    );

    requestAnimationFrame(() => {
      // Fixes an error of this executing after unmounting
      if (!this.foundation) return;

      this.foundation.adapter_.removeClass(
        MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION
      );
      this.foundation.adapter_.addClass(
        MDCTabIndicatorFoundation.cssClasses.ACTIVE
      );
      this.foundation.adapter_.setContentStyleProperty('transform', '');
    });
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
