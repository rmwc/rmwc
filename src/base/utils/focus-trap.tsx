// @ts-ignore MDC botched ES5 importing
import * as domUtils from '@material/dom/dist/mdc.dom.js';

export interface FocusOptions {
  initialFocusEl?: HTMLElement;
  skipInitialFocus?: boolean;
}

export declare class FocusTrap {
  private readonly root;
  private readonly options;
  private elFocusedBeforeTrapFocus;
  constructor(root: HTMLElement, options?: FocusOptions);
  /**
   * Traps focus in `root`. Also focuses on either `initialFocusEl` if set;
   * otherwises sets initial focus to the first focusable child element.
   */
  trapFocus(): void;
  /**
   * Releases focus from `root`. Also restores focus to the previously focused
   * element.
   */
  releaseFocus(): void;
  /**
   * Wraps tab focus within `el` by adding two hidden sentinel divs which are
   * used to mark the beginning and the end of the tabbable region. When
   * focused, these sentinel elements redirect focus to the first/last
   * children elements of the tabbable region, ensuring that focus is trapped
   * within that region.
   */
  private wrapTabFocus;
  /**
   * Focuses on `initialFocusEl` if defined and a child of the root element.
   * Otherwise, focuses on the first focusable child element of the root.
   */
  private focusInitialElement;
  private getFocusableElements;
  private createSentinel;
}

const _FocusTrap = domUtils.focusTrap.FocusTrap;

export const focusTrapFactory = (
  el: HTMLElement,
  focusOptions?: FocusOptions
): FocusTrap => new _FocusTrap(el, focusOptions);
