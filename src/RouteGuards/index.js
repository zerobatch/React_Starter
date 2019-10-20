import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getTokenFromSession, isUserAuthorized } from "../Utils/TokenUtils";

let PrivateRoute = ({
  component: Component,
  layout: Layout,
  path,
  exact,
  ...routeProps
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        const session = isUserAuthorized(routeProps.allowedRoles);

        /**
         * Nos deshacemos de la propiedad staticContext porque da problemas en el render
         * y tampoco la usamos en nuestra app.
         */
        const { staticContext, ...properties } = props;

        return session ? (
          <Layout session={session} {...properties}>
            <Component {...properties} session={session} />
          </Layout>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

let PublicRoute = ({
  component: Component,
  layout: Layout,
  path,
  exact,
  ...routeProps
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        const session = getTokenFromSession();

        /**
         * Nos deshacemos de la propiedad staticContext porque da problemas en el render
         * y tampoco la usamos en nuestra app.
         */
        const { staticContextDisabled, ...properties } = props;

        return !session ? (
          <Layout>
            <Component {...properties} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export { PublicRoute, PrivateRoute };
