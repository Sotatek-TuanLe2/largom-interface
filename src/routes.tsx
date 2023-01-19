import { PublicRoute } from './components';
import React, { FC, useEffect } from 'react';
import {
  BrowserRouter as Router,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import Storage from './utils/storage';
import { getUser } from './store/user';
import { initMetadata } from './store/metadata';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';


/**
 * Main App routes.
 */

const Routes: FC<RouteComponentProps> = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<any>();
  const accessToken = Storage.getAccessToken();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(initMetadata());
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken]);

  return (
    <>
      <Switch>
        <PublicRoute path={'/login'} component={LoginPage} />
        <PublicRoute path={'/'} component={HomePage} />
      </Switch>
      <>
        {/* <ModalSignatureRequired />
        <ModalSubmittingTransaction />
        <ModalFinishTransaction /> */}
      </>
    </>
  );
};

const RoutesHistory = withRouter(Routes);

const routing = function createRouting() {
  return (
    <>
      <Router>
        <RoutesHistory />
      </Router>
    </>
  );
};

/**
 * Wrap the app routes into router
 *
 * PROPS
 * =============================================================================
 * @returns {React.Node}
 */
export default routing;
