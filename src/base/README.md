# Portal

The Portal component will let you render components to a portal.

- Module **@rmwc/base**

## Portal

```jsx
<Portal />
```

## PortalProvider (optional)

The PortalProvider component is an optional component that provides a global context for the Portal element in the RMWC library. This context is used by the Portal component to retrieve the Portal element without relying on document.getElementById, which doesn't work inside a Shadow DOM.

The PortalProvider component is used by importing it into your project and wrapping it around your application or component tree similar to TypographyProvider.

```jsx
function App() {
  return (
    <PortalProvider>
      <div>
        {/* Other components here */}
        <Portal />
      </div>
    </PortalProvider>
  );
}
```

In this example, the PortalProvider component is used to wrap the Portal component. Elements rendered to the portal will now render directly to the portalElement stored in the portal context instead of retrieving the Portal element using `document.getElementById()`.

The PortalProvider component is optional for most users. If you are using the RMWC library in a Shadow DOM and the Portal component is not rendering inside the correct Portal element, then you can use the PortalProvider component to ensure that the Portal element is retrieved using the PortalContext.

## Notes

The PortalProvider component does not accept any props.

The Portal component only needs to be a descendent of PortalProvider for it to be functional.

Unlike ThemeProvider or TypographyProvider, the PortalProvider component should only be used once in your application or component tree. (If you include multiple instances of PortalProvider, the context will only grab the context values from the first PortalProvider parent and the solution will break.)
