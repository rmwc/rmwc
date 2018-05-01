import * as React from 'react';
import docgen from '../../docs/docgen';

const flatDocs = Object.values(docgen).reduce((acc, val) => {
  return acc.concat(val);
}, []);

const findDocDef = name => {
  return flatDocs.find(v => v.displayName === name);
};

export const DocumentComponent = ({ displayName }) => {
  const docs = findDocDef(displayName);

  return (
    <div className="document-component">
      <h2>{displayName}</h2>
      {docs && !!docs.description && <p>{docs.description}</p>}
      {docs &&
        docs.props && (
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
                          (prop.flowType.raw || prop.flowType.name || '')}
                    </code>
                  </td>
                  <td>
                    {prop.defaultValue ? (
                      <code>{prop.defaultValue.value}</code>
                    ) : (
                      ''
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
};
