import React from 'react';
import {
  BrowserRouter, Switch, Route, RouteChildrenProps,
} from 'react-router-dom';
import { makeAuthenticator, Callback } from 'react-oidc';

import OidcService from '../../helpers/OidcService';
import UserPage from '../../pages/UserPage';
import AdminPage from '../../pages/AdminPage';
import Error404 from '../../pages/Error404';
import userManager from '../userManager';

const WithAuth = makeAuthenticator({ userManager });

/*
class Callback1 extends React.Component {
  constructor(props:any) {
    super(props);
  }

  // Bullshit workaround cuz oidc is bugged with the lastest version of react.
  render() {

    const call = new Callback(
      {...this.props,
      onSuccess : (user) => {
        if (user.state != null) {
          // placeholder
        }
        console.log('succes');
        OidcService.saveIdToken(user.id_token);

        // `user.state` will reflect the state that was passed in via signinArgs.
        //this.props.routeProps.history.push('/');

        // sign in succes.
        // Do after sign-in function here.
      },
      onError : (error) => {
        console.log(`Authorization failed. ${error}`);
      },
      userManager,
      }
      ,{});

    call.render();

    return (
      <div>
        ssss
      </div>
    );
  }
}
*/

// APP, top level entry point.
/* export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/callback"
        >
          <Callback1/>
        </Route>
        <Route path="/admin" exact>
          <Callback1 />
        </Route>
        <Route path="/" exact component={WithAuth(AdminPage)} />
        <Route path="/" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
} */

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
