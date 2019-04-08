import React, { useState, useContext } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Typography } from './rmwc';
import * as rmwc from './rmwc';

/* istanbul ignore file */
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
        (componentDef &&
          componentDef.comment &&
          componentDef.comment.shortText) ||
        '',
      props: []
    };

    def.props = propsDef
      ? propsDef.properties
          .map((p: any) => {
            const description = p.documentation.contentsRaw;
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
      <div className="document-component">
        <h2>{def.name}</h2>
        <p>{def.description}</p>
        {!!def.props.length && (
          <div>
            <h3>Props</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {def.props.map(prop => (
                  <tr key={prop.name}>
                    <td>
                      <code>{prop.name}</code>
                    </td>
                    <td>
                      <code>{prop.type}</code>
                    </td>

                    <td>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export interface DocsInterface {
  src: any;
  components: string[];
}

export class DocProps extends React.Component<DocsInterface> {
  docs: { [key: string]: any } = this.props.src.typescript;

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { components } = this.props;
    return components.map(c => (
      <DocumentComponent key={c} displayName={c} docs={this.docs} />
    ));
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
  examples
}: {
  children: React.ReactNode;
  title: string;
  lead: string;
  module: string;
  styles: string[];
  docsLink?: string;
  examples: string[];
}) {
  let index = -1;
  return (
    <DocsContext.Provider value={{ scope: rmwc, examples }}>
      <div>
        <DocsTitle>{title}</DocsTitle>
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
      </div>
    </DocsContext.Provider>
  );
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
    <ul>
      <li>
        Module <strong>{module}</strong>
      </li>
      {!!styles.length && (
        <li>
          Import styles:
          <ul>
            {styles.map(s => (
              <li key={s}>
                import <strong>'{s}'</strong>;
              </li>
            ))}
          </ul>
        </li>
      )}
      {!!docsLink && (
        <li>
          MDC Docs: <a href={docsLink}>{docsLink}</a>
        </li>
      )}
    </ul>
  );
}

function DocsTitle({ children }: { children: React.ReactNode }) {
  return <h1>{children}</h1>;
}

export function DocsSubtitle({ children }: { children: React.ReactNode }) {
  return <h2>{children}</h2>;
}

function DocsLead({ children }: { children: React.ReactNode }) {
  return <blockquote>{children}</blockquote>;
}

export function DocsP({ children }: { children: React.ReactNode }) {
  const __html = String(children).replace(/`(.+?)`/g, '<code>$1</code>');
  return <p className="docs-p" dangerouslySetInnerHTML={{ __html }} />;
}

export function DocsExample({
  children,
  index = 0,
  label
}: {
  children: React.ReactNode;
  index?: number;
  label?: string;
}) {
  const { scope, examples } = useContext(DocsContext);
  const [code] = useState(examples[index]);

  return (
    <LiveProvider code={code} scope={scope}>
      <div className="live-example">
        <div className="live-preview">
          <div>
            {label && (
              <Typography
                use="caption"
                className="live-preview-label"
                tag="div"
              >
                {label}
              </Typography>
            )}
            <LivePreview>{children}</LivePreview>
          </div>
        </div>

        <div className="live-editor">
          <LiveEditor />
          <LiveError className="live-error" />
        </div>
      </div>
    </LiveProvider>
  );
}

DocsExample.displayName = 'DocsExample';
