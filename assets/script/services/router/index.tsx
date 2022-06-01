import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { makeAuthenticator, Callback } from 'react-oidc';

import OidcService from '../../helpers/OidcService';
import UserPage from '../../pages/UserPage';
import AdminPage from '../../pages/AdminPage';
import Error404 from '../../pages/Error404';
import userManager from '../userManager';

const WithAuth = makeAuthenticator({ userManager });

// APP, top level entry point.
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/callback"
          render={(routeProps) => (
            <Callback
              // sign in succes.
              // Do after sign-in function here.
              onSuccess={(user) => {
                if (user.state != null) {
                  // placeholder
                }

                console.log('succes');

                // Instantly identify the user in the identity pool and request credentials.
                OidcService.saveIdToken(user.id_token);
                OidcService.saveAccessToken(user.access_token);
                // `user.state` will reflect the state that was passed in via signinArgs.
                routeProps.history.push('/');
              }}
              onError={(error) => {
                console.log(`Authorization failed. ${error}`);
              }}
              userManager={userManager}
            />
          )}
        />
        <Route path="/admin" exact component={WithAuth(AdminPage)} />
        <Route path="/" exact component={WithAuth(UserPage)} />
        <Route path="/" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}
