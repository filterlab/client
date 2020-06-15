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
          style={{ width: isTablet ? 300 : 430, marginLeft: !isTablet && 130 }}
        >
          <Fade up delay={200}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "justify",
              }}
            >
              <span>
                <b style={{ whiteSpace: "nowrap" }}>Our mission</b> is to
                develop high quality yet budget-friendly mobile Lightroom
                presets.
              </span>
              <span>
                With <b style={{ whiteSpace: "nowrap" }}>Filterlab</b>, you get
                to decide which preset suits you best, without having to buy a
                whole pack.
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
