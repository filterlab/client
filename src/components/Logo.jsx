import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

const Logo = ({ isTablet }) => {
  return (
    <Fade left>
      <Link
        style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
        to="/"
      >
        <div style={{ fontSize: isTablet ? 20 : 35 }}>Filterlab</div>
      </Link>
    </Fade>
  );
};

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(Logo);
