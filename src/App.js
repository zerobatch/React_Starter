import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import NotFound from "components/Errors/NotFound";
import ErrorBoundary from "components/Errors/ErrorBoundary";
import EmptyLayout from "./components/Layouts/EmptyLayout";
import { PublicRoute, PrivateRoute } from "./RouteGuards/";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <Switch key={this.props.location.key}>
            {/*
          * EXAMPLE ROUTES
          * <PublicRoute
                exact
                path={['/login', '/forgot', '/password-reset']}
                layout={EmptyLayout}
                component={props => <TuComponenteAuth {...props} />}
              />

              <PrivateRoute
                exact
                path="/dashboard"
                layout={TuLayout}
                component={WaitingComponent(DashboardPage)}
                allowedRoles={['superadmin', 'admin']}
              />
               *
              */}

            <Route component={NotFound} />
          </Switch>
        </ErrorBoundary>
      </div>
    );
  }
}

export default withRouter(App);
