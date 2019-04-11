/* istanbul ignore file */
import React, { useState, useContext, useEffect } from 'react';
import * as rmwc from './rmwc';

interface DocumentComponentProps {
  docs: { [key: string]: any };
  displayName: string;
}

class DocumentComponent extends React.Component<DocumentComponentProps> {
  getComponentDef(displayName: string) {
    const componentDef = this.props.docs[displayName];
    const propsDef: any = this.props.docs[displayName + 'Props'];

    const def: {
      name: string;
      description: string;
      props: Array<{
        name: string;
        description: string;
        required: boolean;
        type: string;
      }>;
    } = {
      name: displayName,
      description:
        (propsDef &&
          propsDef.documentation &&
          propsDef.documentation.contentsRaw) ||
        '',
      props: []
    };

    def.props = propsDef
      ? propsDef.properties
          .map((p: any) => {
            const description = p.documentation
              ? p.documentation.contentsRaw
              : '';
            return description.includes('DEPRECATED')
              ? null
              : {
                  name: p.name,
                  description,
                  required: !p.flags.isOptional,
                  type: p.type
                };
          })
          .filter(Boolean)
      : [];

    return def;
  }

  render() {
    const { displayName } = this.props;
    const def = this.getComponentDef(displayName);

    return (
      <>
        ## {def.name}
        <Br />
        {!!def.description && (
          <>
            {def.description}
            <Br />
            <Br />
          </>
        )}
        {!!def.props.length && (
          <>
            ### Props
            <Br />
            <Br />
            <>
              <>| Name | Type | Description |</>
              <Br />
              <>|------|------|-------------|</>
              <Br />
              {def.props.map(prop => (
                <>
                  | `{prop.name}` | `{prop.type.replace(/\|/g, '\\|')}` |{' '}
                  {prop.description} |
                  <Br />
                </>
              ))}
            </>
          </>
        )}
        <Br />
        <Br />
      </>
    );
  }
}

export interface DocPropsI {
  src: any;
  components: Array<React.ComponentType<any>>;
}

export class DocProps extends React.Component<DocPropsI> {
  docs: { [key: string]: any } = this.props.src.typescript;

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { components } = this.props;
    return components.map(c => {
      let name = c.displayName || '';
      name = name.includes('(') ? name.replace(/.+?\((.+?)\)/g, '$1') : name;
      return (
        <DocumentComponent key={name} displayName={name} docs={this.docs} />
      );
    });
  }
}

const DocsContext = React.createContext<{
  scope: Object;
  examples: string[];
}>({
  scope: {},
  examples: []
});

export function Docs({
  children,
  title,
  lead,
  module,
  styles,
  docsLink,
  examples,
  addon
}: {
  children: React.ReactNode;
  title: string;
  lead: string;
  module: string;
  styles: string[];
  docsLink?: string;
  examples: string[];
  addon?: boolean;
}) {
  let index = -1;
  return (
    <DocsContext.Provider value={{ scope: rmwc, examples }}>
      <DocsTitle>
        {title}
        {addon && <DocsAddon />}
      </DocsTitle>
      <DocsLead>{lead}</DocsLead>
      <DocsSetup module={module} styles={styles} docsLink={docsLink} />
      {React.Children.map(children, child => {
        if (
          React.isValidElement(child) &&
          // @ts-ignore
          child.type.displayName === 'DocsExample'
        ) {
          index++;
          return React.cloneElement(child, {
            ...child.props,
            index
          } as any);
        }

        return child;
      })}
    </DocsContext.Provider>
  );
}

function DocsAddon() {
  return <> `RMWC ADDON`</>;
}

function DocsSetup({
  module,
  styles,
  docsLink
}: {
  module: string;
  styles: string[];
  docsLink?: string;
}) {
  return (
    <>
      - Module **{module}**
      <Br />
      {!!styles.length && (
        <>
          - Import styles:
          <Br />
          {styles.map(s => (
            <React.Fragment key={s}>
              {'  '}- import **'{s}'**
              <Br />
            </React.Fragment>
          ))}
        </>
      )}
      {!!docsLink && (
        <>
          - MDC Docs: [{docsLink}]({docsLink})
        </>
      )}
      <Br />
      <Br />
    </>
  );
}

function DocsTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      # {children}
      <Br />
      <Br />
    </>
  );
}

function Br() {
  return <>{'\n'}</>;
}

export function DocsSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      ## {children}
      <Br />
      <Br />
    </>
  );
}

function DocsLead({ children }: { children: React.ReactNode }) {
  return (
    <>
      > {children}
      <Br />
      <Br />
    </>
  );
}

export function DocsP({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Br />
      <Br />
    </>
  );
}

export function DocsExample({
  index = 0,
  ...rest
}: {
  children: React.ReactNode;
  index?: number;
  label?: string;
  codeOnly?: boolean;
  iframe?: boolean;
}) {
  const { examples } = useContext(DocsContext);
  const [code] = useState(examples[index]);

  return <DocsExampleBase code={code} {...rest} />;
}

function DocsExampleBase({
  code
}: {
  code: string;
  codeOnly?: boolean;
  iframe?: boolean;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      ```jsx
      <Br />
      {code}
      <Br />
      ```
      <Br />
      <Br />
    </>
  );
}

DocsExample.displayName = 'DocsExample';
