import React from 'react';
import { Link } from 'react-router-dom';
import { RMWC_VERSION } from '@rmwc/base';
import { Typography } from '@rmwc/typography';

import { Card, CardMedia } from '@rmwc/card';
import { Grid, GridCell } from '@rmwc/grid';
import { Theme } from '@rmwc/theme';
import { Icon } from '@rmwc/icon';

import styles from './home.module.css';
import { Button } from '@rmwc/button';

import { galleryContent } from '../../common/menu-content';

const checklist = [
  "Uses Google's official material-components-web library",
  'Includes additional addon components not offered by Google.',
  'Works in React from 16.8.x and up',
  'First class Typescript Support',
  'Server side rendering support',
  'Individually packaged and released components'
];

function Example({
  ex,
  name,
  url
}: {
  ex: React.ReactNode;
  name: string;
  url: string;
}) {
  return (
    <Link
      to={url}
      className={styles.example}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className={styles.exampleInner}>
        <div>{ex}</div>
      </div>
      <div className={styles.exampleName}>
        <Typography use="headline6">{name}</Typography>
      </div>
    </Link>
  );
}

export const Home = () => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className="container">
          <Theme use={['onPrimary']}>
            <div className={styles.intro}>
              <Typography use="headline3" tag="h1" className={styles.headline1}>
                React Material Web Components
              </Typography>
              <Typography use="headline6" tag="h2" className={styles.headline2}>
                A React UI Kit built on Google's official Material Components
                Web library
              </Typography>

              <Link to="/installation">
                <Button theme={['secondaryBg', 'onSecondary']} raised>
                  Get Started
                </Button>
              </Link>
              <Typography tag="h3" use="caption">
                v{RMWC_VERSION}
              </Typography>

              <div className={styles.checklist}>
                {checklist.map((c) => (
                  <div key={c}>
                    <Icon theme="secondary" icon="check" /> <div>{c}</div>
                  </div>
                ))}
              </div>
            </div>
          </Theme>

          <Grid className={styles.featureGrid}>
            <GridCell span={4}>
              <Link to="/installation">
                <Card theme={['primaryBg', 'onPrimary']}>
                  <div style={{ padding: '1rem' }}>
                    <Typography use="headline6" tag="div">
                      Simple to Use
                    </Typography>
                    <Typography tag="div" use="body1">
                      Get started in 5 minutes.
                    </Typography>
                  </div>
                  <CardMedia
                    style={{
                      backgroundSize: 'fill',
                      backgroundImage: 'url(images/backgrounds/home-1.png)',
                      minHeight: '5rem',
                      flex: 1
                    }}
                  />
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
                  <Typography tag="div" use="body1">
                    Uses Google's official Material Components Web library.
                  </Typography>
                </div>

                <CardMedia
                  style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(images/backgrounds/home-2.png)',
                    minHeight: '5rem',
                    flex: 1
                  }}
                />
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
                    <Typography tag="div" use="body1">
                      Integrate with a variety of CSS workflows.
                    </Typography>
                  </div>

                  <CardMedia
                    style={{
                      backgroundSize: 'cover',
                      backgroundImage: 'url(images/backgrounds/home-3.png)',
                      minHeight: '5rem',
                      flex: 1
                    }}
                  />
                </Card>
              </Link>
            </GridCell>
          </Grid>
        </div>
      </header>

      <div className={styles.examples}>
        {galleryContent.map((ex) => {
          return (
            <Example
              key={ex.label}
              name={ex.label}
              ex={ex.gallery}
              url={ex.url!}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};
export default Home;
