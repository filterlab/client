import React from "react";
import DotLoader from "react-spinners/DotLoader";

const Loader = () => (
  <div
    style={{
      height: 321,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <DotLoader />
  </div>
);
export default Loader;
