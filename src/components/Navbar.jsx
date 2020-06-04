import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeKey } from "../actions/authActions";
import { Icon, Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Spacer from "./Spacer";

const GRAY = "grey";
const RED = "red";

const authedLinks = [
  { linkName: "How to install", linkRoute: "/install", color: GRAY },
  { linkName: "Collections", linkRoute: "/collections", color: GRAY },
  { linkName: "Checkout", linkRoute: "/checkout", color: GRAY },
  { linkName: "Logout", linkRoute: "/", color: RED },
];

const nonAuthedLinks = [
  { linkName: "How to install", linkRoute: "/install", color: GRAY },
  { linkName: "Sign up", linkRoute: "/signup", color: GRAY },
  { linkName: "Login", linkRoute: "/login", color: GRAY },
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
class Navbar extends Component {
  state = {
    clicked: false,
  };

  buildTabletNavList = () => {
    return (
      <>
        <div
          onClick={() => this.setState({ clicked: false })}
          style={{
            minHeight: "calc(100vh - 21px)",
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Spacer space={70} />
          {<Header as="h1">What do you want to do?</Header>}
          <Spacer space={10} />
          {this.props.isAuthed !== undefined ? (
            <Button.Group vertical>
              {mobileLink(link("Go to Home", "/", GRAY))}
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
              {mobileLink(link("Go to Home", "/", GRAY))}
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
          <Icon
            name="delete"
            size="big"
            onClick={() => this.setState({ clicked: false })}
          />
        </Fade>
        {this.buildTabletNavList()}
      </div>
    ) : (
      <Fade clear>
        <Icon
          name="bars"
          size="big"
          onClick={() => this.setState({ clicked: true })}
        />
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
        }}
      >
        {!this.props.isTablet && link("Home", "/", GRAY)}
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
