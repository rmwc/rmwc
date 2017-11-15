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

class DocSection extends React.Component {
  state = {
    showInherited: false
  };

  render() {
    const { def } = this.props;
    return (
      <ListGroup>
        <ListGroupSubheader>{def.name}</ListGroupSubheader>
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Required</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {def.docs &&
              def.docs.props &&
              Object.entries(def.docs.props).map(([propName, prop], i) => (
                <tr key={i}>
                  <td>{propName}</td>
                  <td>
                    {prop.flowType &&
                      (prop.flowType.raw || prop.flowType.name || '')}
                  </td>
                  <td>{prop.required ? 'true' : 'false'}</td>
                  <td>
                    {prop.defaultValue ? prop.defaultValue.value : 'undefined'}
                  </td>
                  <td>{prop.description || ''}</td>
                </tr>
              ))}

            {this.state.showInherited && [
              <tr key="tag">
                <td>tag</td>
                <td>string</td>
                <td>false</td>
                <td>div</td>
                <td>The HTML tag to render in the DOM</td>
              </tr>,
              <tr key="wrap">
                <td>wrap</td>
                <td>boolean</td>
                <td>false</td>
                <td>false</td>
                <td>"collapse" an element onto its children.</td>
              </tr>,
              <tr key="elementRef">
                <td>elementRef</td>
                <td>React.Ref&lt;any&gt;</td>
                <td>false</td>
                <td>undefined</td>
                <td>
                  Get a ReactDOM reference to the root child of the component.
                </td>
              </tr>,
              <tr key="theme">
                <td>theme</td>
                <td>string | string[]</td>
                <td>false</td>
                <td>undefined</td>
                <td>
                  A theme option as a string, a space separated string for
                  multiple values, or an array of valid theme options.
                </td>
              </tr>
            ]}
            <tr
              onClick={() =>
                this.setState({ showInherited: !this.state.showInherited })
              }
            >
              <td colSpan="5">
                <a>
                  {this.state.showInherited ?
                    '...Hide inherited props' :
                    'Show inherited props...'}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </ListGroup>
    );
  }
}

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
              {componentDefs.map((def, i) => <DocSection def={def} key={i} />)}
            </List>
          </Card>
        </GridCell>
      </Grid>
    );
  }
}

export default Detail;
