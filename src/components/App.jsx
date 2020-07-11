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
import Fade from "react-reveal/Fade";
class App extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  desktop = () => {
    return (
      <>
        {
          <center>
            <Logo bigger />
            <Header as="h1">Easy to use, one click photo filters</Header>
            <Spacer space={35} />
            <InstagramBanner />
            <Spacer space={75} />
          </center>
        }
        <div
          style={{
            width: "calc(100vw)" > 900 ? "calc(100vw)" : 900,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {this.startEditing()}
            {<Motivation />}
            <Spacer space={15} />
            {this.instructions()}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            {<FreeFilters />}
          </div>
        </div>
        <Spacer space={40} />
        <center>
          <Header as="h1">Check our categories</Header>
        </center>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "calc(100vw)",
            }}
          >
            <Categories />
          </div>
        </div>
      </>
    );
  };
  mobile = () => {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
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
          <Spacer space={15} />
          {this.startEditing()}
          {<Motivation />}
          <Spacer space={15} />
          {<FreeFilters />}
        </div>
        <div
          style={{
            width: "calc(100vw)",
          }}
        >
          <Categories />
        </div>
        <center style={{ marginBottom: 50 }}>
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
              <Spacer space={30} />
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
                  </Link>
                  and get your favourite presets
                </Header>
              </center>
              <Spacer space={20} />
              <center>
                <Header as="h3">
                  Apply your presets
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
              <Spacer space={20} />
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
              {
                <div style={{ marginTop: 10 }}>
                  <InstagramBanner />
                </div>
              }
            </div>
          </Segment>
        </center>
      </div>
    );
  };

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

  startEditing = () => (
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
            <Spacer space={this.props.isTablet ? 30 : 40} />
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
                and get your favourite presets
              </Header>
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
            {this.props.isTablet && (
              <div style={{ marginTop: 10 }}>
                <InstagramBanner />
              </div>
            )}
          </div>
        </Segment>
      </center>
    </Fade>
  );
  render() {
    const { isTablet } = this.props;
    const build = () => (isTablet ? this.mobile() : this.desktop());

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
