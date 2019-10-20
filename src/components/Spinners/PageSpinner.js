import React from "react";
import { BarLoader } from "react-spinners";

const PageSpinner = () => {
  return (
    <div className="cr-page-spinner">
      <BarLoader size={30} />
    </div>
  );
};

export default PageSpinner;
