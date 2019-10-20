import React from "react";

const NotFound = props => {
  return (
    <main>
      <h2>404 - Not Found</h2>

      <p>
        {window.location.origin}
        <span>{window.location.pathname}</span>
      </p>

      <p>
        The route above you've put in the address bar
        <strong> does not exist within this web page</strong>
      </p>

      <button color="warning" size="lg" onClick={() => props.history.push("/")}>
        Volver atrás
      </button>
    </main>
  );
};

export default NotFound;
