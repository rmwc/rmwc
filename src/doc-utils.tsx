import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
// @ts-ignore
import theme from 'prism-react-renderer/themes/nightOwl';
import * as rmwc from './rmwc';
import { Typography } from './rmwc';

/* istanbul ignore file */

interface Type {
  type: string;
  name?: string;
  value?: string;
  elementType?: Type;
  types?: Array<{
    type: string;
    name: string;
    value?: string;
    declaration: Def & { signatures?: Array<Def & { parameters: Def[] }> };
  }>;
  typeArguments: Array<{ declaration: Def }>;
}

interface Def {
  comment: {
    shortText?: string;
  };
  children?: Def[];
  flags: {
    isExported?: boolean;
    isOptional?: boolean;
  };
  kindString: string;
  name: string;
  type?: Type;
}

interface DocumentComponentProps {
  docs: { [key: string]: Def | undefined };
  displayName: string;
}

class DocumentComponent extends React.Component<DocumentComponentProps> {
  constructor(props: any) {
    super(props);
    this.simplifyType = this.simplifyType.bind(this);
  }

  simplifyType(type?: Type | { declaration: Def }): string {
    // unknown
    if (!type) {
      return 'undefined';
    }

    if ('value' in type) {
      return type.value ? `'${type.value}'` : '';
    }

    if ('declaration' in type) {
      if (type.declaration.name === '__type' && type.declaration.children) {
        return `{${type.declaration.children
          .map(c => {
            return `${c.name}: ${this.simplifyType(c.type)}`;
          })
          .join(', ')}}`;
      }

      return '';
    }

    // arrays
    if (type.type && type.type === 'array') {
      return `${this.simplifyType(type.elementType)}[]`;
    }

    if ('elementType' in type) {
      return this.simplifyType(type.elementType);
    }

    // strings, numbers, any
    if (
      type.name &&
      ['any', 'string', 'number', 'boolean'].includes(type.name)
    ) {
      return type.name;
    }

    // catches type literals
    if (type.name && type.name === '__type' && type.type === 'reference') {
      return '{}';
    }

    // Named returns
    if (type.type === 'reference' && type.name) {
      const args = type.typeArguments
        ? `<${type.typeArguments.map(t => this.simplifyType(t)).join(', ')}>`
        : '';
      return `${type.name}${args}`;
    }

    // booleans
    if (type.type === 'union' && type.types && type.types.length <= 3) {
      const combined = type.types.map(t => t.name).join('');
      if (combined.includes('true') && combined.includes('false')) {
        return 'boolean';
      }
    }

    // functions
    if (
      type.type === 'union' &&
      type.types &&
      type.types.some(t => !!t.declaration)
    ) {
      const found = type.types.find(t => !!t.declaration);
      if (found && found.declaration.signatures) {
        const sig = found.declaration.signatures[0];
        if (sig.name === '__call') {
          const rType = sig.type && sig.type.name;
          const params = sig.parameters
            ? sig.parameters.map(p => `${p.name}: ${this.simplifyType(p.type)}`)
            : [];
          return `(${params.join(', ')}) => ${rType}`;
        }
      }
    }

    if (type.type === 'union' && type.types) {
      // generic unions
      return type.types
        .filter(t => t.name !== 'undefined')
        .map(this.simplifyType)
        .join(' | ');
    }

    return 'undefined';
  }

  getComponentDef(displayName: string) {
    const componentDef = this.props.docs[displayName];
    const propsDef = this.props.docs[displayName + 'Props'];

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

    if (propsDef && propsDef.children) {
      def.props = propsDef.children
        .map(p => {
          const simpleType = this.simplifyType(p.type);
          return {
            name: p.name,
            description: (p.comment && p.comment.shortText) || '',
            required: !p.flags.isOptional,
            type:
              // Do some wrapping for unions
              simpleType.includes(' | ') &&
              p.flags.isOptional &&
              !simpleType.startsWith('(')
                ? `(${simpleType})`
                : simpleType
          };
        })
        // remove deprecated props from UI
        .filter(p => !p.description.toLowerCase().includes('deprecated'));
    }

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
                      <code>
                        {!prop.required && <span className="optional">?</span>}
                        {prop.type}
                      </code>
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
  src: {};
  components: string[];
}

export class DocProps extends React.Component<DocsInterface> {
  docs: { [key: string]: Def | undefined } = {};

  constructor(props: any) {
    super(props);
    const docs = props.src.default ? props.src.default.children : [];

    this.docs = docs.reduce((acc: { [key: string]: Def }, val: Def) => {
      val.children &&
        val.children.forEach(c => {
          if (c.flags.isExported) {
            acc[c.name] = c;
          }
        });
      return acc;
    }, {});

    //console.log(this.docs);
  }

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

export function Docs({
  children,
  title,
  lead,
  module,
  styles,
  docsLink
}: {
  children: React.ReactNode;
  title: string;
  lead?: string;
  module: string;
  styles: string[];
  docsLink?: string;
}) {
  let index = -1;
  return (
    <div>
      <DocsTitle>{title}</DocsTitle>
      {!!lead && <DocsLead>{lead}</DocsLead>}
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
              <li>
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

export function DocsExample({
  children,
  src,
  index = 0,
  label
}: {
  children: React.ReactNode;
  src: string[];
  index?: number;
  label?: string;
}) {
  const [code, setCode] = useState(src[index]);

  return (
    <LiveProvider code={code} scope={rmwc} {...{ theme }}>
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
