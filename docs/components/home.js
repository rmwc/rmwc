import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco as codeStyle } from 'react-syntax-highlighter/dist/styles';
import * as rmwc from '../../src';
import Header from './header';

const { Grid, GridCell, Typography } = rmwc;

export const Home = props => (
  <Grid>
    <Header
      title="RMWC"
      description="A thin React wrapper for Material Design (Web) Components"
    />
    <GridCell span="12">
      <Typography use="headline">Installation</Typography>
      <ul>
        <li>npm install rmwc --save</li>
        <li>
          material-web-components should be installed automatically as a peer
          dependency. Include
          node_modules/material-components-web/dist/material-components-web.css
          in your webpage via your method of choice.
        </li>
      </ul>
    </GridCell>
    <GridCell span="12">
      <Typography use="headline">Quick Start</Typography>
      <SyntaxHighlighter style={codeStyle}>
        {`import React from 'react';
import { Button } from 'rmwc';

//all of RMWC is only around 11k, but if you only need a few components
// you can import like so
import { Button } from 'rmwc/Button';

const HelloWorld = props => <Button>Easy</Button>`}
      </SyntaxHighlighter>
    </GridCell>
    <GridCell span="12">
      <Typography use="headline">Project Methodology</Typography>
      <ul>
        <li>
          To create the thinnest, lightest, and spec compliant wrapper around{' '}
          <a href="https://material.io/components/web/">
            Google Material Design Components for the Web
          </a>
        </li>
        <li>
          To utilize the Foundation javascript classes and expose their api for
          consumption
        </li>
        <li>To be as unobtrusive and sensible as possible.</li>
      </ul>
    </GridCell>
    <GridCell span="12">
      <Typography use="headline">Some API wide features</Typography>
      <ul>
        <li>
          The majority of components inherit a common set of functionality to
          make working with RMWC easier
        </li>
        <li>
          <b>tag:</b> Use this prop to set the HTML tag to the element
          appropriate for your use case. {`<Button tag="a" />`}
        </li>
        <li>
          <b>wrap:</b> Use this prop to "collapse" an element onto its children.
          Many of the official Material Components are just classes that add
          visual styling, so this is an easy way to composite multiple
          components classes together.
        </li>
        <li>
          <b>elementRef:</b> This prop will get a ReactDOM reference to the root
          child of the component. It works the same way as standard React refs.
        </li>
        <li>
          <b>apiRef:</b> For components that have an actual Material Component
          foundation class, this prop will give you access to the api instance.
          Just give it a callback that takes the apiRef as a single argument,
          just like DOM refs.
        </li>
        <li>
          <b>theme:</b> Use this prop to theme a component with any of the
          themeable properties offered in Material Components. See an example in
          Buttons, and see Theme for a list of all available options.
        </li>
      </ul>
    </GridCell>
  </Grid>
);
export default Home;
