import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Header, Button, Segment } from "semantic-ui-react";
import Categories from "./pages/Categories";
import Page from "./ui/Page";
import Spacer from "./ui/Spacer";
import Motivation from "./ui/Motivation";
import MobileStoreButton from "./ui/buttons/MobileStoreButton";
import FreeFilters from "./pages/FreeFilters";
import InstagramBanner from "./ui/InstagramBanner";
import Logo from "./ui/Logo";
import Pulsable from "./ui/Pulsable";
import { Line } from "./ui/Line";
class App extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  allCategories = () => (
    <Link
      to={"/all"}
      style={{ marginTop: 30, color: "inherit", textDecoration: "inherit" }}
    >
      <Button color="black" size="big">
        <Pulsable>See all Categories</Pulsable>
      </Button>
    </Link>
  );

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
      <Spacer space={30} />
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
      {!this.props.isTablet && <FreeFilters />}
      <Spacer space={67} />
      <Line />
      <Spacer space={95} />
      {!this.props.isTablet && this.instructions()}
      {!this.props.isTablet && <Spacer space={25} />}
      {!this.props.isTablet && <center>{this.allCategories()}</center>}
    </div>
  );

  instructions = () => (
    <center>
      <Segment>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: !this.props.isTablet && 20,
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
          <Spacer space={this.props.isTablet ? 30 : 60} />
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
          </center>
          <Spacer space={this.props.isTablet ? 20 : 50} />
          <center>
            <Header as="h3">
              Apply your filters{" "}
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
          <Spacer space={14} />
          {this.props.isTablet && (
            <div style={{ marginTop: 10 }}>
              <InstagramBanner />
            </div>
          )}
        </div>
      </Segment>
    </center>
  );
  render() {
    const { isTablet } = this.props;
    const build = () => (
      <>
        <Spacer space={!isTablet && 20} />
        {!isTablet && (
          <center>
            <Logo bigger />
            <Header as="h1">Easy to use, one click photo filters</Header>
            <Spacer space={35} />
            <InstagramBanner />
            <Spacer space={35} />
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.props.isTablet && (
              <center>
                <Logo />
              </center>
            )}
            {this.props.isTablet && this.instructions()}
            {this.props.isTablet && <FreeFilters />}
          </div>
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
    isAuthed: state.auth.key,
  };
}

export default connect(mapStateToProps)(App);
