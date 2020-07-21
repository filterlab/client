import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
const FILES_FOLDER = "../../files/images/logo.svg";
const Logo = () => {
  return (
    <Fade left>
      <Link
        style={{
          color: "inherit",
          textDecoration: "inherit",
          margin: 1,
        }}
        to="/"
      >
        <Image src={FILES_FOLDER} size={"small"} />
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
