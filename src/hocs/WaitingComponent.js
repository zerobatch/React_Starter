import React from "react";
import PageSpinner from "components/Spinners/PageSpinner";

export default function WaitingComponent(Component) {
  return props => (
    <React.Suspense fallback={<PageSpinner />}>
      <Component {...props} />
    </React.Suspense>
  );
}
