import * as React from 'react';
export class DocumentComponent extends React.Component {
  constructor(props) {
    super(props);

    this.flatDocs = Object.values(props.docs).reduce((acc, val) => {
      return acc.concat(val);
    }, []);
  }

  findDocDef(name) {
    return this.flatDocs.find(v => v.displayName === name);
  }

  renderRaw(raw) {
    return raw.split('\n').map((s, i) => (
      <React.Fragment key={i}>
        {i !== 0 && <br />}
        {s.split('  ').map((v, i) => (
          <React.Fragment key={i}>
            {i !== 0 && <React.Fragment>&nbsp;&nbsp;</React.Fragment>}
            {v}
          </React.Fragment>
        ))}
      </React.Fragment>
    ));
  }

  /**
   * Merges together docs from a handful of components
   * This is a workaround for showing extension because the AST cant pick up definitions across files
   */
  getComposedDefs(names) {
    return names
      .map(name => this.findDocDef(name))
      .filter(Boolean)
      .reduce((acc, def) => {
        return {
          ...def,
          ...acc,
          props:
            def.props || acc.props
              ? {
                ...(def.props || {}),
                ...(acc.props || {})
              }
              : null
        };
      }, {});
  }

  render() {
    const { displayName, composes = [] } = this.props;
    const docs = this.getComposedDefs([displayName, ...composes]);
    return (
      <div className="document-component">
        <h2>{displayName}</h2>
        {docs && !!docs.description && <p>{docs.description}</p>}
        {docs && docs.props && (
          <div>
            <h3>Props</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(docs.props).map(([propName, prop], i) => (
                  <tr key={i}>
                    <td className={prop.required ? 'required' : ''}>
                      <code>{propName}</code>
                    </td>
                    <td>
                      <code>
                        {prop.flowType &&
                          this.renderRaw(
                            prop.flowType.raw || prop.flowType.name || ''
                          )}
                      </code>
                    </td>
                    <td>
                      {prop.defaultValue ? (
                        <code>{prop.defaultValue.value}</code>
                      ) : (
                        <code>undefined</code>
                      )}
                    </td>
                    <td>{prop.description || ''}</td>
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
