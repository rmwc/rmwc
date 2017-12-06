import React from 'react';
import { GridCell, Typography } from '../../src';

export const Header = ({ title, description, link, module }) => (
  <GridCell span="12" className="header">
    <Typography use="display1" tag="h2">
      {title}
    </Typography>
    {description && (
      <Typography use="subheading2" tag="div">
        {description}
      </Typography>
    )}
    {module && (
      <Typography use="subheading2" tag="div">
        import from <code>{module}</code>
      </Typography>
    )}
    {link && (
      <Typography use="body1">
        <a href={link}>{link}</a>
      </Typography>
    )}
  </GridCell>
);

export default Header;
