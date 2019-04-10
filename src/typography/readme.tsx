import React from 'react';

import { Docs, DocsExample, DocProps } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Typography } from '.';

export default function() {
  return (
    <Docs
      title="Typography"
      lead="Material Design’s text sizes and styles were developed to balance content density and reading comfort under typical usage conditions."
      module="@rmwc/typography"
      styles={['@material/typography/dist/mdc.typography.css']}
      docsLink="https://material.io/develop/web/components/typography/"
      examples={examples}
    >
      <DocsExample>
        <>
          <Typography use="headline1">headline1</Typography>
          <Typography use="headline2">headline2</Typography>
          <Typography use="headline3">headline3</Typography>
          <Typography use="headline4">headline4</Typography>
          <Typography use="headline5">headline5</Typography>
          <Typography use="headline6">headline6</Typography>
          <Typography use="subtitle1">subtitle1</Typography>
          <Typography use="subtitle2">subtitle2</Typography>
          <Typography use="body1">body1</Typography>
          <Typography use="body2">body2</Typography>
          <Typography use="caption">caption</Typography>
          <Typography use="button">button</Typography>
          <Typography use="overline">overline</Typography>
        </>
      </DocsExample>

      <DocProps src={propsSrc} components={[Typography]} />
    </Docs>
  );
}
