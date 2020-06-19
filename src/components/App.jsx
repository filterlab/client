import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Button, Segment } from "semantic-ui-react";
import Categories from "./pages/Categories";
import Page from "./ui/Page";
import Spacer from "./ui/Spacer";
import Motivation from "./ui/Motivation";
import MobileStoreButton from "./ui/MobileStoreButton";
import { Link } from "react-router-dom";
class App extends Component {
  rightWing = () => (
    <div
      style={{
        width: this.props.isTablet
          ? "calc(100vw)"
          : "calc(60vw)" > 663
          ? "calc(60vw)"
          : 663,
      }}
    >
      <Categories />
    </div>
  );

  leftWing = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Spacer space={20} />
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
      <Spacer space={20} />
      <Motivation />
      <Spacer space={20} />
      <div
        style={{
          minWidth: "100%",
          height: 0.5,
          background: "grey",
          opacity: 0.6,
        }}
      />
      <Spacer space={20} />
      {!this.props.isTablet && this.instructions()}
    </div>
  );

  instructions = () => (
    <Segment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: !this.props.isTablet && 20,
        }}
      >
        <center>
          <Header as="h3">Install Lightroom</Header>
        </center>
        <Spacer space={20} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MobileStoreButton store="ios" />
          <div style={{ minWidth: 20 }} />
          <MobileStoreButton store="android" />
        </div>
        <Spacer space={this.props.isTablet ? 20 : 50} />
        <center>
          <Header as="h3">
            <Link
              to="/login"
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              <Button size="small">Login</Button>
            </Link>{" "}
            and get your favourite filters
          </Header>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>
              You can download them later at the{" "}
              <b style={{ whiteSpace: "nowrap" }}>Collections</b> tab
            </span>
          </div>
        </center>
        <Spacer space={this.props.isTablet ? 20 : 50} />
        <center>
          <Header as="h3">Apply your filters</Header>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>First time importing a preset? Follow our </span>
            <Link
              to="/install"
              style={{
                marginLeft: 5,
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              <Button size="tiny" color="black">
                Guide
              </Button>
            </Link>
          </div>
        </center>
        <Spacer space={this.props.isTablet ? 20 : 50} />
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
      </div>
    </Segment>
  );
  render() {
    const { isTablet } = this.props;
    const build = () => (
      <>
        <Spacer space={isTablet ? 40 : 20} />
        {!isTablet && (
          <center>
            <Header as="h1">Easy to use, one click photo filters</Header>
            <Spacer space={70} />
          </center>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {!this.props.isTablet && this.rightWing()}
          {!this.props.isTablet && this.leftWing()}
          {this.props.isTablet && this.instructions()}
          {this.props.isTablet && this.rightWing()}
          {this.props.isTablet && this.leftWing()}
        </div>

        <Spacer space={10} />
      </>
    );

    return (
      <Page
        top={isTablet && 40}
        loadingMessage={"Loading awesome filters"}
        body={build()}
        footer
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(App);
