import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

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
          style={{ width: isTablet ? 300 : 430, marginLeft: !isTablet && 130 }}
        >
          <Fade right delay={200}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "justify",
              }}
            >
              <span>
                <b style={{ whiteSpace: "nowrap" }}>Filterlab's mission</b> is
                to develop high quality yet budget-friendly mobile{" "}
                <b style={{ whiteSpace: "nowrap" }}>Lightroom</b> presets that
                add value to your photos.
              </span>
              <br />
              <span>
                Join now, and start building your{" "}
                <b
                  style={{ whiteSpace: "nowrap", textDecoration: "underline" }}
                >
                  <Link
                    to={"/collection"}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Collections
                  </Link>
                </b>{" "}
                with presets that suit you best.
              </span>
            </div>
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
