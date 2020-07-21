import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Header, Button, Segment } from "semantic-ui-react";
import Page from "./ui/Page";
import Spacer from "./ui/Spacer";
import Motivation from "./ui/Motivation";
import MobileStoreButton from "./ui/buttons/MobileStoreButton";
import InstagramBanner from "./ui/InstagramBanner";
import Logo from "./ui/Logo";
import Fade from "react-reveal/Fade";
class App extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  build = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {
            <center>
              <Logo />
            </center>
          }
          <Spacer space={!this.props.isTablet ? 40 : 15} />
          {this.intro()}
          {this.iframe()}
        </div>
      </div>
    );
  };

  iframe = () => (
    <center>
      <iframe
        title="app"
        height={!this.props.isTablet ? 900 : 400}
        allowtransparency="true"
        style={{
          overflow: "hidden",
          width: !this.props.isTablet ? 900 : "calc(100vw)",
          border: "none",
        }}
        src="https://sellfy.com/filterlab/embed/store"
      />
    </center>
  );

  intro = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          minWidth: !this.props.isTablet && 700,
          flexDirection: this.props.isTablet ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        <Motivation />
        {this.instructions()}
      </div>
      <Spacer space={this.props.isTablet ? 15 : 30} />
      <InstagramBanner />
      <Spacer space={this.props.isTablet ? 15 : 30} />
      <center>
        <Header as="h1">Our Presets and Packs</Header>
      </center>
      <Spacer space={this.props.isTablet ? 15 : 30} />
    </div>
  );

  instructions = () => (
    <Fade>
      <center>
        <Segment>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Spacer space={20} />
            <center>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Header as="h3">Install Lightroom</Header>
                </div>
                <div style={{ marginRight: 10 }} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MobileStoreButton store="ios" />
                  <div style={{ minWidth: 10 }} />
                  <MobileStoreButton store="android" />
                </div>
              </div>
            </center>
            <Spacer space={this.props.isTablet ? 20 : 40} />
            <center>
              <Header as="h3">
                Apply your presets{" "}
                <Link
                  to="/install"
                  style={{
                    marginLeft: 5,
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                >
                  <Button size="tiny" color="black">
                    How to use
                  </Button>
                </Link>
              </Header>
            </center>
            <Spacer space={this.props.isTablet ? 20 : 40} />
            <center>
              <Header as="h3">
                Done!{" "}
                <span
                  role="img"
                  aria-label="party-popper"
                  style={{ fontFamily: "Segoe UI Emoji" }}
                >
                  🎉
                </span>
              </Header>
            </center>
            <Spacer space={14} />
          </div>
        </Segment>
      </center>
    </Fade>
  );
  render() {
    const { isTablet } = this.props;

    return (
      <Page
        top={isTablet && 40}
        loadingMessage={"Loading awesome filters"}
        body={this.build()}
        footer
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
    isAuthed: state.auth.key,
  };
}

export default connect(mapStateToProps)(App);
