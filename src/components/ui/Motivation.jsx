import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import Spacer from "./Spacer";
import { Button } from "semantic-ui-react";
import Pulsable from "./Pulsable";

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
              <Spacer space={30} />
              <span>
                Tired of paying{" "}
                <b style={{ whiteSpace: "nowrap" }}>overpriced</b> presets that
                don't suit your photos? <br />
                <b style={{ whiteSpace: "nowrap" }}>Filterlab's goal</b> is to
                develop high quality yet budget-friendly mobile{" "}
                <b style={{ whiteSpace: "nowrap" }}>Lightroom</b> presets.
              </span>
              <br />
              <Spacer space={7.5} />
              <span>
                Not conviced yet? No problem!
                <br />
                Get started with our month's{" "}
                <b style={{ whiteSpace: "nowrap" }}>free preset</b>!
              </span>
              <br />
              <Spacer space={5} />
              <center>
                <Link
                  to={"/signup"}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button size="big" color="black">
                    <Pulsable>Start now</Pulsable>
                  </Button>
                </Link>
              </center>
              <Spacer space={15} />
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
