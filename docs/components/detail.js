import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco as codeStyle } from 'react-syntax-highlighter/dist/styles';
import buildJSXWithContext from '../common/build-jsx-with-context';
import Header from './header';
import * as rmwc from '../../src';
import {
  DialogRoot,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop
} from '../../src/Dialog';
import content from '../content';
import docgen from '../docgen';

const { Grid, GridCell, Card, List, ListGroup, ListGroupSubheader } = rmwc;

const flatDocs = Object.values(docgen).reduce((acc, val) => {
  return acc.concat(val);
}, []);

const cleanExampleCode = (codeString = '') => {
  const parts = codeString.split('\n').slice(1, -1) || [];
  const tabsCount = (parts[0] || '').search(/(?!\t)/);
  const regex = new RegExp('\t'.repeat(tabsCount < 0 ? 0 : tabsCount));
  return parts.map(val => val.replace(regex, '')).join('\n');
};

const findDocDef = name => {
  return flatDocs.find(v => v.displayName === name);
};

export class Detail extends React.Component {
  state = {};

  render() {
    const section = content.find(
      c => c.section === this.props.match.params.section
    );

    const componentClasses = !Array.isArray(section.class) ?
      [section.class] :
      section.class;
    const componentDefs = componentClasses.map(componentName => {
      const component = rmwc[componentName];

      return {
        name: componentName,
        component: component,
        docs: findDocDef(componentName)
      };
    });

    const example = buildJSXWithContext(section.example, this, {
      DialogRoot,
      DialogSurface,
      DialogHeader,
      DialogHeaderTitle,
      DialogBody,
      DialogFooter,
      DialogFooterButton,
      DialogBackdrop,
      ...rmwc
    });
    const exampleCodePreview = cleanExampleCode(section.example);

    return (
      <Grid
        id={'detail-section-' + section.name.toLowerCase().replace(' ', '-')}
      >
        <Header title={section.name} link={section.url} />

        <GridCell span="12">
          <div className="demo-example">
            <div className="demo-example-inner">{example}</div>

            <SyntaxHighlighter language="xml" style={codeStyle}>
              {exampleCodePreview}
            </SyntaxHighlighter>
          </div>
        </GridCell>

        <GridCell span="12">
          <Card>
            <List>
              {componentDefs.map((def, i) => (
                <ListGroup key={i}>
                  <ListGroupSubheader>{def.name} Props</ListGroupSubheader>
                  <table>
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {def.docs &&
                        def.docs.props &&
                        Object.entries(def.docs.props).map(
                          ([propName, prop], i) => (
                            <tr key={i}>
                              <td>{propName}</td>
                              <td>{prop.flowType ? prop.flowType.name : ''}</td>
                              <td>
                                {prop.defaultValue ?
                                  prop.defaultValue.value :
                                  'undefined'}
                              </td>
                              <td>{prop.description || ''}</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </ListGroup>
              ))}
            </List>
          </Card>
        </GridCell>
      </Grid>
    );
  }
}

export default Detail;
