import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import Spacer from "./Spacer";
import { Button } from "semantic-ui-react";

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
        <div style={{ width: isTablet ? 300 : 430 }}>
          <Fade right delay={200}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "justify",
              }}
            >
              <Spacer space={10} />
              <span>
                <b style={{ whiteSpace: "nowrap" }}>Filterlab's goal</b> is to
                develop high quality yet budget-friendly mobile{" "}
                <b style={{ whiteSpace: "nowrap" }}>Lightroom</b> presets that
                add value to your photos.
              </span>
              <br />
              <Spacer space={10} />
              <center>
                <Link
                  to={"/signup"}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button size="big" color="black">
                    Start now
                  </Button>
                </Link>
              </center>
              <Spacer space={8} />
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
