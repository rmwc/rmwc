import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { FoundationComponent } from '@rmwc/base';
// @ts-ignore
import { MDCNotchedOutlineFoundation } from '@material/notched-outline';

export interface NotchedOutlineProps {
  notch?: number;
}

class NotchedOutlineLeading extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="mdc-notched-outline__leading" />;
  }
}

class NotchedOutlineTrailing extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="mdc-notched-outline__trailing" />;
  }
}

export class NotchedOutline extends FoundationComponent<NotchedOutlineProps> {
  static displayName = 'NotchedOutline';
  private root = this.createElement('root');
  private notchElement = this.createElement('root');
  label: HTMLLabelElement | null = null;

  componentDidMount() {
    super.componentDidMount();
    this.label = this.root.ref && this.root.ref.querySelector('label');

    if (this.label) {
      this.label.style.transitionDuration = '0s';
      this.root.addClass(
        MDCNotchedOutlineFoundation.cssClasses.OUTLINE_UPGRADED
      );
      requestAnimationFrame(() => {
        this.label && (this.label.style.transitionDuration = '');
      });
    } else {
      this.root.addClass(MDCNotchedOutlineFoundation.cssClasses.NO_LABEL);
    }
  }

  getDefaultFoundation() {
    return new MDCNotchedOutlineFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      setNotchWidthProperty: (width: number) =>
        this.notchElement.setStyle('width', width + 'px'),
      removeNotchWidthProperty: () => this.notchElement.setStyle('width', '')
    });
  }

  sync(props: NotchedOutlineProps, prevProps: NotchedOutlineProps) {
    this.syncProp(props.notch, prevProps.notch, () => {
      !!props.notch
        ? this.foundation.notch(props.notch)
        : this.foundation.closeNotch();
    });
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <div
        {...this.root.props({
          ...rest,
          className: 'mdc-notched-outline'
        })}
        ref={this.root.setRef}
      >
        <NotchedOutlineLeading />
        <div
          {...this.notchElement.props({})}
          className="mdc-notched-outline__notch"
          ref={this.notchElement.setRef}
        >
          {children}
        </div>
        <NotchedOutlineTrailing />
      </div>
    );
  }
}
