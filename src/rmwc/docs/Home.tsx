import * as React from 'react';
//@ts-ignore
import { Link } from 'react-router-dom';
import { version } from '../';
import { Typography } from '@rmwc/typography';

import { Card, CardMedia, CardActions, CardActionButton } from '@rmwc/card';
import { Grid, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Theme } from '@rmwc/theme';
import { Icon } from '@rmwc/icon';

const checklist = [
  "Uses Google's official material-components-web library",
  'Includes Addon components for ones missing from the official spec',
  'Works in any version of React from 15.5.x to 16.5.x',
  'First class Typescript (Beta) and Flow Support',
  'Server side rendering support',
  'Individually packaged and released components'
];

export const Home = () => {
  return (
    <React.Fragment>
      <Theme tag="header" use={['primaryBg', 'onPrimary'] as any}>
        <div className="container">
          <Typography use="headline3" tag="h1">
            React Material Web Components
          </Typography>
          <Typography use="headline5" tag="h2">
            A React wrapper for Google's official Material
            Components&nbsp;for&nbsp;the&nbsp;Web
          </Typography>

          <Link to="/installation">
            <Button theme={['secondaryBg', 'onSecondary']} raised>
              Get Started
            </Button>
          </Link>
          <Typography tag="h3" use="caption">
            v{version}
          </Typography>

          <div className="home__checklist">
            {checklist.map(c => (
              <div key={c}>
                <Icon theme="secondary" icon="check" /> <div>{c}</div>
              </div>
            ))}
          </div>
        </div>
      </Theme>

      <aside className="intro">
        <div className="intro__inner">
          <Typography tag="p" use="headline6" className="container">
            RMWC was created to be the most performant, un-opinionated, and
            simple implementation of Material Design in React.
          </Typography>
        </div>
      </aside>
      <div>
        <Grid>
          <GridCell span={4}>
            <Link to="/installation">
              <Card theme={['primaryBg', 'onPrimary']}>
                <div style={{ padding: '1rem' }}>
                  <Typography use="headline6" tag="div">
                    Simple to Use
                  </Typography>
                  <Typography use="body1">Get started in 5 minutes.</Typography>
                </div>
                <CardMedia
                  style={{
                    backgroundSize: 'fill',
                    backgroundImage:
                      'url(https://material.io/assets/1KmITLHaWxyCaX9IbEu3WL9piFpb03LHs/making-more-material-1x1-small.png)',
                    height: '12.313rem'
                  }}
                />
                <CardActions>
                  <CardActionButton
                    raised
                    theme={['secondaryBg', 'onSecondary']}
                  >
                    Get Started
                  </CardActionButton>
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
              <div style={{ padding: '1rem' }}>
                <Typography use="headline6" tag="div">
                  Material Accuracy
                </Typography>
                <div>This is Google's official library, wrapped in React.</div>
              </div>

              <CardMedia
                style={{
                  backgroundSize: 'cover',
                  backgroundImage:
                    'url(https://material.io/assets/1n0USi3jGBT9CHS9YH-1x7L0grDc_MToO/gm-2x1-large.png)',
                  height: '12.313rem'
                }}
              />
              <CardActions>
                <CardActionButton>Visit MDC</CardActionButton>
              </CardActions>
            </Card>
          </GridCell>

          <GridCell span={4}>
            <Link to="/styling-theming">
              <Card
                style={{ backgroundColor: '#212121' }}
                theme="textPrimaryOnDark"
              >
                <div style={{ padding: '1rem' }}>
                  <Typography use="headline6" tag="div">
                    Easy to Customize
                  </Typography>
                  <Typography use="body1">
                    Integrate with a variety of CSS workflows.
                  </Typography>
                </div>

                <CardMedia
                  style={{
                    backgroundSize: 'cover',
                    backgroundImage:
                      'url(https://material.io/assets/1KaOG1QEZWBZTKIP93WDPAHTDplrgri6j/material-poster.png)',
                    height: '12.313rem'
                  }}
                />
                <CardActions>
                  <CardActionButton style={{ backgroundColor: 'white' }}>
                    Customize
                  </CardActionButton>
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
