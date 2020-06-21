import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { Icon, Button, Header } from "semantic-ui-react";
import Logo from "./Logo";
import Spacer from "./Spacer";
import Cart from "./Cart";
import { removeKey } from "../../actions/authActions";
import CurrencyDropdown from "./dropdowns/CurrencyDropdown";
import InstagramBanner from "./InstagramBanner";

const BLACK = "black";
const RED = "red";

const authedLinks = [
  { linkName: "How to use", linkRoute: "/install", color: BLACK },
  { linkName: "Collections", linkRoute: "/collections", color: BLACK },
  { linkName: "Checkout", linkRoute: "/checkout", color: BLACK },
  { linkName: "Logout", linkRoute: "/", color: RED },
];

const nonAuthedLinks = [
  { linkName: "How to use", linkRoute: "/install", color: BLACK },
  { linkName: "Register", linkRoute: "/signup", color: BLACK },
  { linkName: "Login", linkRoute: "/login", color: "" },
];

const link = (linkName, linkRoute, color, iconName) => (
  <span>
    <Link
      style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
      to={linkRoute}
    >
      <Button color={color}>
        {iconName && <Icon name={iconName} />} {linkName}
      </Button>
    </Link>
  </span>
);
const mobileLink = (link) => <div style={{ maxWidth: 200 }}>{link}</div>;
const homeButton = () => (
  <span>
    <Link
      style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
      to="/"
    >
      <Button icon>
        <Icon name="home" />
      </Button>
    </Link>
  </span>
);
class Navbar extends Component {
  state = {
    clicked: false,
  };

  noScroll = () => window.scrollTo(0, 0);

  disable = () => {
    window.removeEventListener("scroll", this.noScroll);
    this.setState({ clicked: false });
  };

  enable = () => {
    window.addEventListener("scroll", this.noScroll);
    this.setState({ clicked: true });
  };

  buildTabletNavList = () => {
    return (
      <>
        <div
          onClick={() => this.disable()}
          style={{
            minHeight: "calc(100vh - 21px)",
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Spacer space={10} />
          {<Header as="h1">What do you want to do?</Header>}
          <Spacer space={10} />
          {this.props.isAuthed !== undefined ? (
            <Button.Group vertical>
              {mobileLink(link("Home", "/", BLACK))}
              {mobileLink(
                link(
                  authedLinks[0].linkName,
                  authedLinks[0].linkRoute,
                  authedLinks[0].color
                )
              )}
              {mobileLink(
                link(
                  authedLinks[1].linkName,
                  authedLinks[1].linkRoute,
                  authedLinks[1].color
                )
              )}
              {mobileLink(
                link(
                  authedLinks[2].linkName,
                  authedLinks[2].linkRoute,
                  authedLinks[2].color,
                  "shopping cart"
                )
              )}
              <span onClick={() => this.props.removeKey(this.props.isAuthed)}>
                {mobileLink(
                  link(
                    authedLinks[3].linkName,
                    authedLinks[3].linkRoute,
                    authedLinks[3].color
                  )
                )}
              </span>
            </Button.Group>
          ) : (
            <Button.Group vertical>
              {mobileLink(link("Home", "/", BLACK))}
              {mobileLink(
                link(
                  nonAuthedLinks[0].linkName,
                  nonAuthedLinks[0].linkRoute,
                  nonAuthedLinks[0].color
                )
              )}
              {mobileLink(
                link(
                  nonAuthedLinks[1].linkName,
                  nonAuthedLinks[1].linkRoute,
                  nonAuthedLinks[1].color
                )
              )}
              {mobileLink(
                link(
                  nonAuthedLinks[2].linkName,
                  nonAuthedLinks[2].linkRoute,
                  nonAuthedLinks[2].color
                )
              )}
            </Button.Group>
          )}
          <InstagramBanner />
        </div>
      </>
    );
  };

  buildTabletNav = () => {
    const clicked = this.state.clicked;

    return clicked ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: "calc(100vw - 10px)",
        }}
      >
        <Fade clear>
          <span style={{ marginTop: 15 }}>
            <Icon name="delete" size="big" onClick={() => this.disable()} />
          </span>
        </Fade>
        {this.buildTabletNavList()}
      </div>
    ) : (
      <Fade clear>
        <div
          style={{
            minWidth: "calc(100vw - 10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "white",
          }}
        >
          <Icon name="bars" size="big" onClick={() => this.enable()} />
          <Logo isTablet />
          <Cart />
        </div>
      </Fade>
    );
  };

  buildDeskNav = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: 10,
      }}
    >
      {this.props.isAuthed !== undefined ? (
        <Button.Group>
          {homeButton()}
          <CurrencyDropdown />
          {link(
            authedLinks[0].linkName,
            authedLinks[0].linkRoute,
            authedLinks[0].color
          )}
          {link(
            authedLinks[1].linkName,
            authedLinks[1].linkRoute,
            authedLinks[1].color
          )}
          {link(
            authedLinks[2].linkName,
            authedLinks[2].linkRoute,
            authedLinks[2].color,
            "shopping cart"
          )}
          <span onClick={() => this.props.removeKey(this.props.isAuthed)}>
            {link(
              authedLinks[3].linkName,
              authedLinks[3].linkRoute,
              authedLinks[3].color
            )}
          </span>
        </Button.Group>
      ) : (
        <Button.Group>
          {homeButton()}
          <CurrencyDropdown />
          {link(
            nonAuthedLinks[0].linkName,
            nonAuthedLinks[0].linkRoute,
            nonAuthedLinks[0].color
          )}
          {link(
            nonAuthedLinks[1].linkName,
            nonAuthedLinks[1].linkRoute,
            nonAuthedLinks[1].color
          )}
          {link(
            nonAuthedLinks[2].linkName,
            nonAuthedLinks[2].linkRoute,
            nonAuthedLinks[2].color
          )}
        </Button.Group>
      )}
    </div>
  );

  render() {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: "100%",
          margin: 5,
          marginTop: 0,
          background: "white",
        }}
      >
        {!this.props.isTablet && (
          <Link
            to="/"
            style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
          >
            <Logo />
          </Link>
        )}
        {this.props.isTablet ? this.buildTabletNav() : this.buildDeskNav()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthed: state.auth.key,
    isTablet: state.responsive.isTablet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeKey: (key) => {
      dispatch(removeKey(key));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
