import React from "react";

const EmptyLayout = ({ children, ...restProps }) => (
  <main {...restProps}>{children}</main>
);

export default EmptyLayout;
