import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import Spacer from "./Spacer";
import { Header } from "semantic-ui-react";

const Motivation = ({ isTablet }) => {
  return (
    <div
      style={{
        width: 300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!isTablet ? (
        <Header as="h2">
          Start editing like a PRO{" "}
          <span
            role="img"
            aria-label="painter"
            style={{ fontFamily: "Segoe UI Emoji" }}
          >
            👨‍🎨
          </span>
        </Header>
      ) : (
        <center>
          <Header as="h2">
            Start editing like a PRO{" "}
            <span
              role="img"
              aria-label="painter"
              style={{ fontFamily: "Segoe UI Emoji" }}
            >
              👨‍🎨
            </span>
          </Header>
        </center>
      )}

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
            Tired of paying <b style={{ whiteSpace: "nowrap" }}>overpriced</b>{" "}
            presets that don't suit your photos? <br />
            <b style={{ whiteSpace: "nowrap" }}>Filterlab's goal</b> is to
            develop high quality yet budget-friendly mobile{" "}
            <b style={{ whiteSpace: "nowrap" }}>Lightroom</b> presets.
          </span>
          <br />
          <Spacer space={7.5} />
        </div>
      </Fade>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(Motivation);
