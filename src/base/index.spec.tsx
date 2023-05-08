import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  withTheme,
  randomId,
  wrapChild,
  debounce,
  toCamel,
  toDashCase,
  closest,
  Portal
} from './';
import { FoundationElement } from './foundation-component';
import { wait } from './utils/test-utils';
import { Dialog, DialogContent } from '@rmwc/dialog';
import userEvent from '@testing-library/user-event';
import { Button } from '@rmwc/button';
import { PortalContext, portalContextDefaultValues, PortalProvider } from './PortalContext';

jest.spyOn(console, 'warn');

describe('RMWC', () => {
  it('works', () => {});
});

describe('FoundationElement', () => {
  it('FoundationElement: handles classNames', () => {
    const inst = {
      root: new FoundationElement(() => {})
    };

    inst.root.addClass('foo');
    inst.root.addClass('foo');
    expect(inst.root.props({}).className.includes('foo')).toBe(true);
    expect(inst.root.hasClass('foo')).toBe(true);

    inst.root.removeClass('foo');
    inst.root.removeClass('foo');
    expect(inst.root.props({}).className.includes('foo')).toBe(false);
    expect(inst.root.hasClass('foo')).toBe(false);
  });

  it('FoundationElement: handles ref', () => {
    const inst = {
      root: new FoundationElement(() => {})
    };

    mount(<div ref={inst.root.reactRef} />);

    expect(inst.root.ref instanceof HTMLDivElement).toBe(true);
  });

  it('FoundationElement: handles addEventListener / removeEventListener', () => {
    const inst = {
      root: new FoundationElement(() => {})
    };

    // double up on the adds to check that it doesnt add a second time
    const changeHandler = () => {};
    inst.root.addEventListener('change', changeHandler);
    inst.root.addEventListener('change', changeHandler);
    expect(inst.root.props({}).onChange).toBe(changeHandler);

    // double up on the removes to check that it doesnt remove a second time
    inst.root.removeEventListener('change', changeHandler);
    inst.root.removeEventListener('change', changeHandler);
    expect(inst.root.props({}).onChange).toBe(undefined);

    // Check to make sure we can add a bogus one
    inst.root.addEventListener('onChange', changeHandler);
  });

  it('FoundationElement: handles setStyle', () => {
    const inst = {
      root: new FoundationElement(() => {})
    };

    inst.root.setStyle('color', 'red');
    inst.root.setStyle('color', 'red');
    inst.root.setStyle('--myvar', 'red');
    expect(inst.root.props({}).style).toEqual({
      color: 'red',
      '--myvar': 'red'
    });

    inst.root.setStyle('color', 'blue');

    expect(inst.root.props({}).style).toEqual({
      color: 'blue',
      '--myvar': 'red'
    });
  });

  it('FoundationElement: handles prop setters / getters', () => {
    const inst = {
      root: new FoundationElement<any, any>(() => {})
    };

    inst.root.setProp('title', 'red');
    inst.root.setProp('title', 'red');
    expect(inst.root.props({}).title).toBe('red');
    expect(inst.root.getProp('title')).toBe('red');
    expect(inst.root.removeProp('title'));
    expect(inst.root.removeProp('title'));
    expect(inst.root.getProp('title')).toBe(undefined);
  });

  it('FoundationElement: handles prop merging', async () => {
    let blueChangeCalled = false;
    let redChangeCalled = false;
    const el = (
      <div
        className="blue"
        style={{ background: 'blue' }}
        onChange={() => (blueChangeCalled = true)}
      />
    );

    const inst = {
      root: new FoundationElement<any, any>(() => {})
    };

    inst.root.addClass('red');
    inst.root.setStyle('color', 'red');
    inst.root.addEventListener('change', () => (redChangeCalled = true));

    await wait(100);
    const mergedProps = inst.root.props(el.props);
    mergedProps.onChange();

    expect(mergedProps.className).toBe('blue red');
    expect(mergedProps.style).toEqual({ color: 'red', background: 'blue' });
    expect(blueChangeCalled).toBe(true);
    expect(redChangeCalled).toBe(true);
  });
});

describe('Utils', () => {
  it('randomId', () => {
    // @ts-ignore
    process.env.NODE_ENV = 'production';
    randomId();
    // @ts-ignore
    process.env.NODE_ENV = 'test';
  });

  it('debounce', (done) => {
    let val = 0;
    const foo = () => val++;
    const debouncedFoo = debounce(foo, 100);
    debouncedFoo();
    setTimeout(() => {
      expect(val).toBe(1);
      done();
    }, 150);
  });

  it('closest', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.classList.add('foo');

    parent.appendChild(child);

    expect(closest(child, '.foo')).toBe(parent);
    expect(closest(null, '.foo')).toBe(null);
  });

  it('wrapChild', () => {
    const Foo = (props: any) => {
      return wrapChild({ ...props, className: 'foo' });
    };

    const { container } = render(
      <Foo>
        <div className="child" />
      </Foo>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="foo child"
        >
          <div
            class="child"
          />
        </div>
      </div>
    `);
    expect(container.firstChild).toHaveClass('foo child');
  });

  it('toCamel', () => {
    expect(toCamel('test-foo')).toBe('testFoo');
  });

  it('toDashCase', () => {
    expect(toDashCase('testFoo')).toBe('test-foo');
  });
});

describe('withTheme', () => {
  it('works with and without classnames', () => {
    const Component = withTheme(({ ...rest }) => <div {...rest} />);
    const { container, rerender } = render(
      <Component className="test" theme="primary" />
    );
    expect(container.firstChild).toHaveClass('test');

    rerender(<Component className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('works with arrays', () => {
    const Component = withTheme(({ ...rest }) => <div {...rest} />);
    const { container } = render(<Component theme={['primary']} />);

    expect(container.firstChild).toHaveClass('mdc-theme--primary');
  });

  it('handles deprecations', () => {
    const Component = withTheme(({ ...rest }) => <div {...rest} />);

    const { container: container1 } = render(<Component theme="primary foo" />);
    const { container: container2 } = render(<Component theme="on-primary" />);
    expect(container1).toMatchSnapshot();
    expect(container1.firstChild).toHaveClass('mdc-theme--primary foo');

    expect(container2).toMatchSnapshot();
    expect(container2.firstChild).toHaveClass('mdc-theme--on-primary');
  });
});

describe('Portal', () => {
  it('renders', () => {
    const { asFragment } = render(<Portal />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('does not mount twice', async () => {
    const Content = ({ value, inc }: { value: number; inc: () => void }) => {
      React.useEffect(() => {
        inc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return <span>{`Opened ${value} times`}</span>;
    };
    const MyComp = () => {
      const [open, setOpen] = React.useState(false);
      const [counter, setCounter] = React.useState(0);

      return (
        <>
          <Portal />
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Dialog renderToPortal open={open} onClosed={() => setOpen(false)}>
            <DialogContent>
              <Content value={counter} inc={() => setCounter((c) => c + 1)} />
            </DialogContent>
          </Dialog>
          )
        </>
      );
    };
    render(<MyComp />);
    userEvent.click(screen.getByRole('button', { name: /open/i }));
    expect(await screen.findByText('Opened 1 times')).toBeInTheDocument();
  });

  it('renders to portal when using PortalProvider and renderToPortal is true', () => {
    const MyComp = () => {
      const [open, setOpen] = useState(false);

      return (
        <PortalProvider>
          <div data-testid="portal-sibling">
            <Button data-testid="trigger-button" onClick={() => setOpen(true)}>
              Open
            </Button>
            <Dialog
              renderToPortal={true}
              open={open}
              onClosed={() => setOpen(false)}
            >
              <DialogContent>
                <Button data-testid="dialog-content-button" />
              </DialogContent>
            </Dialog>
          </div>
          <Portal data-testid="rmwc-portal" />
        </PortalProvider>
      );
    };

    render(<MyComp />);
    const portalSibling = screen.getByTestId('portal-sibling');
    const portalElement = screen.getByTestId('rmwc-portal');
    const dialogContentButton = screen.getByTestId('dialog-content-button');

    expect(portalSibling).not.toContainElement(dialogContentButton);
    expect(portalElement).toContainElement(dialogContentButton);
  });

  it('does not render to portal when using PortalProvider and renderToPortal is false', () => {
    const MyComp = () => {
      const [open, setOpen] = useState(false);

      return (
        <PortalProvider>
          <div data-testid="portal-sibling">
            <Button data-testid="trigger-button" onClick={() => setOpen(true)}>
              Open
            </Button>
            <Dialog
              renderToPortal={false}
              open={open}
              onClosed={() => setOpen(false)}
            >
              <DialogContent>
                <Button data-testid="dialog-content-button" />
              </DialogContent>
            </Dialog>
          </div>
          <Portal data-testid="rmwc-portal" />
        </PortalProvider>
      );
    };

    render(<MyComp />);
    const portalSibling = screen.getByTestId('portal-sibling');
    const portalElement = screen.getByTestId('rmwc-portal');
    const dialogContentButton = screen.getByTestId('dialog-content-button');

    expect(portalSibling).toContainElement(dialogContentButton);
    expect(portalElement).not.toContainElement(dialogContentButton);
  });

  it('renders to portal when not using PortalProvider and renderToPortal is true', () => {
    const MyComp = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <div data-testid="portal-sibling">
            <Button data-testid="trigger-button" onClick={() => setOpen(true)}>
              Open
            </Button>
            <Dialog
              renderToPortal={true}
              open={open}
              onClosed={() => setOpen(false)}
            >
              <DialogContent>
                <Button data-testid="dialog-content-button" />
              </DialogContent>
            </Dialog>
          </div>
          <Portal data-testid="rmwc-portal" />
        </>
      );
    };

    render(<MyComp />);
    const portalSibling = screen.getByTestId('portal-sibling');
    const portalElement = screen.getByTestId('rmwc-portal');
    const dialogContentButton = screen.getByTestId('dialog-content-button');

    expect(portalSibling).not.toContainElement(dialogContentButton);
    expect(portalElement).toContainElement(dialogContentButton);
  });

  it('does not render to portal when not using PortalProvider and renderToPortal is false', () => {
    const MyComp = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <div data-testid="portal-sibling">
            <Button data-testid="trigger-button" onClick={() => setOpen(true)}>
              Open
            </Button>
            <Dialog
              renderToPortal={false}
              open={open}
              onClosed={() => setOpen(false)}
            >
              <DialogContent>
                <Button data-testid="dialog-content-button" />
              </DialogContent>
            </Dialog>
          </div>
          <Portal data-testid="rmwc-portal" />
        </>
      );
    };

    render(<MyComp />);
    const portalSibling = screen.getByTestId('portal-sibling');
    const portalElement = screen.getByTestId('rmwc-portal');
    const dialogContentButton = screen.getByTestId('dialog-content-button');

    expect(portalSibling).toContainElement(dialogContentButton);
    expect(portalElement).not.toContainElement(dialogContentButton);
  });
});

describe('PortalProvider', () => {
  it('renders without crashing', () => {
    render(
      <PortalProvider>
        <div>Child element</div>
      </PortalProvider>
    );
  });

  it('renders its children', () => {
    const { getByText } = render(
      <PortalProvider>
        <div>Child element</div>
      </PortalProvider>
    );

    expect(getByText(/Child element/i)).toBeInTheDocument();
  });

  it('provides a default context value', () => {
    const { container } = render(
      <PortalProvider>
        <PortalContext.Consumer>
          {({ portalElement, setPortalElement }) => (
            <div>
              portalElement: {String(portalElement)}
              setPortalElement: {String(setPortalElement)}
            </div>
          )}
        </PortalContext.Consumer>
      </PortalProvider>
    );

    expect(container.firstChild).toBeTruthy();
    expect(container.firstChild).toHaveTextContent(
      `portalElement: ${String(portalContextDefaultValues.portalElement)}`
    );
  });

  it('sets the portalElement value correctly', () => {
    const div = document.createElement('div');
    const { getByText, container } = render(
      <PortalProvider>
        <PortalContext.Consumer>
          {({ portalElement, setPortalElement }) => (
            <div>
              <button onClick={() => setPortalElement && setPortalElement(div)}>
                setPortalElement
              </button>
              <div>portalElement: {JSON.stringify(portalElement)}</div>
            </div>
          )}
        </PortalContext.Consumer>
      </PortalProvider>
    );

    const button = getByText(/setPortalElement/i);
    fireEvent.click(button);

    expect(container).toHaveTextContent(JSON.stringify(div));
  });

  it('updates portalElement correctly when setPortalElement is called multiple times', () => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');

    const { getByText, container } = render(
      <PortalProvider>
        <PortalContext.Consumer>
          {({ portalElement, setPortalElement }) => (
            <div>
              <button
                onClick={() => setPortalElement && setPortalElement(div1)}
              >
                setPortalElement 1
              </button>
              <button
                onClick={() => setPortalElement && setPortalElement(div2)}
              >
                setPortalElement 2
              </button>
              <div>portalElement: {JSON.stringify(portalElement)}</div>
            </div>
          )}
        </PortalContext.Consumer>
      </PortalProvider>
    );

    const button1 = getByText(/setPortalElement 1/i);
    fireEvent.click(button1);

    expect(container).toHaveTextContent(JSON.stringify(div1));

    const button2 = getByText(/setPortalElement 2/i);
    fireEvent.click(button2);

    expect(container).toHaveTextContent(JSON.stringify(div2));
  });
});
