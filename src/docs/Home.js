// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import { version } from 'rmwc/rmwc';
import { Typography } from 'rmwc/Typography';

import {
  Card,
  CardMedia,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActions,
  CardAction
} from 'rmwc/Card';

import { Grid, GridCell } from 'rmwc/Grid';

import { Button } from 'rmwc/Button';

import { Theme } from 'rmwc/Theme';

export const Home = () => {
  return (
    <React.Fragment>
      <Theme tag="header" use="primary-bg text-primary-on-primary">
        <div className="container">
          <Typography use="display2" tag="h1">
            React Material Web Components
          </Typography>
          <Typography use="headline" tag="h2">
            A React wrapper for Google's official Material
            Components&nbsp;for&nbsp;the&nbsp;Web
          </Typography>

          <Button theme="secondary-bg" raised>
            Get Started
          </Button>
          <Typography tag="h3" use="caption">
            v{version}
          </Typography>
        </div>
      </Theme>

      <aside tag="aside" className="intro">
        <div className="intro__inner">
          <Typography tag="p" use="title" className="container">
            RMWC was created to be the most performant, unopinionated, and
            simple implemenation of Material Design in React.
          </Typography>
        </div>
      </aside>
      <div>
        <Grid>
          <GridCell span={4}>
            <Link to="/getting-started">
              <Card themeDark theme="primary-bg">
                <CardPrimary>
                  <CardTitle large>Simple to Use</CardTitle>
                  <CardSubtitle>Get started in 5 minutes.</CardSubtitle>
                </CardPrimary>
                <CardSupportingText />
                <CardMedia
                  style={{
                    backgroundSize: 'fill',
                    backgroundImage:
                      'url(https://material.io/static/images/hub/gallery-poster.svg)',
                    height: '12.313rem'
                  }}
                />
                <CardActions>
                  <CardAction raised theme="secondary-bg">
                    Get Started
                  </CardAction>
                </CardActions>
              </Card>
            </Link>
          </GridCell>

          <GridCell span={4}>
            <Card
              theme="background"
              tag="a"
              href="https://material.io/components/web/"
            >
              <CardPrimary>
                <CardTitle large>Material Accuracy</CardTitle>
                <CardSubtitle>
                  This is Google's official library, wrapped in React.
                </CardSubtitle>
              </CardPrimary>
              <CardSupportingText />
              <CardMedia
                style={{
                  backgroundSize: 'cover',
                  backgroundImage:
                    'url(https://material.io/static/images/hub/material_components_dark.svg)',
                  height: '12.313rem'
                }}
              />
              <CardActions>
                <CardAction>Visit MDC</CardAction>
              </CardActions>
            </Card>
          </GridCell>

          <GridCell span={4}>
            <Link to="/getting-started">
              <Card style={{ backgroundColor: '#283b4c' }} themeDark>
                <CardPrimary>
                  <CardTitle large>Easy to Customize</CardTitle>
                  <CardSubtitle>
                    Integrate with a variety of CSS worfklows.
                  </CardSubtitle>
                </CardPrimary>
                <CardSupportingText />
                <CardMedia
                  style={{
                    backgroundImage:
                      'url(https://material.io/static/images/hub/color-tool.svg)',
                    height: '12.313rem'
                  }}
                />
                <CardActions>
                  <CardAction style={{ backgroundColor: 'white' }}>
                    Customize
                  </CardAction>
                </CardActions>
              </Card>
            </Link>
          </GridCell>
        </Grid>
      </div>
    </React.Fragment>
  );
};
export default Home;
