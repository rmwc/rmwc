import React from 'react';

import ReactGA from 'react-ga';
import { Location, useLocation } from 'react-router-dom';

const doPageView = (loc: Location) =>
  ReactGA.pageview(loc.pathname + loc.search);

export const Analytics = () => {
  const location = useLocation();

  React.useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID as string);
    doPageView(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    doPageView(location);
  }, [location]);

  return null;
};
