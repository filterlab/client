import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";

const Motivation = ({ isTablet }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          marginLeft: 5,
          marginRight: 5,
          display: "flex",
          justifyContent: isTablet ? "center" : "start",
          alignItems: "center",
        }}
      >
        <div
          style={{ width: isTablet ? 300 : 500, marginLeft: !isTablet && 130 }}
        >
          <Fade up delay={200}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Fade>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(Motivation);
