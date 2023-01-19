import { FC, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import Storage from './utils/storage';
import { clearUser, getUser } from './store/user';
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
  const history = useHistory();
  const isExpireTimeToken =
    Storage.getExpireTimeToken() &&
    new Date().getTime() >= Number(Storage.getExpireTimeToken());
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!accessToken || isExpireTimeToken) {
      dispatch(clearUser());
      history.push('/login');
      return;
    }
    dispatch(getUser());
    dispatch(initMetadata());
  }, [accessToken]);

  return (
    <>
      <Switch>
        <PublicRoute path={'/login'} component={LoginPage} />
        <PrivateRoute path={'/'} component={HomePage} />
      </Switch>
      <>
        {/* <ModalSignatureRequired />
        <ModalSubmittingTransaction />
        <ModalFinishTransaction /> */}
      </>
    </>
  );
};

const PublicRoute = ({ component: Component, path, ...rest }: any) => {
  const accessToken = Storage.getAccessToken();
  return (
    <Route
      {...rest}
      render={(props) =>
        !accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const accessToken = Storage.getAccessToken();

  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        !!accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
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
