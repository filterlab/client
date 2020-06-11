import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";

const Logo = ({ isTablet }) => {
  return (
    <Fade left>
      <div style={{ fontSize: isTablet ? 50 : 70 }}>Filterlab</div>
    </Fade>
  );
};

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(Logo);
