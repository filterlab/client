import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon, Button, Header } from "semantic-ui-react";
import Logo from "./Logo";
import Spacer from "./Spacer";
import { removeKey } from "../../actions/authActions";
import InstagramBanner from "./InstagramBanner";
import FluidButton from "./buttons/FluidButton";

const BLACK = "black";

const links = [{ linkName: "How to use", linkRoute: "/install", color: BLACK }];

const link = (linkName, linkRoute, color, iconName) => (
  <span>
    <Link
      style={{
        color: "inherit",
        textDecoration: "inherit",
        margin: 1,
      }}
      to={linkRoute}
    >
      <FluidButton color={color} icon={iconName} text={linkName} />
    </Link>
  </span>
);

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

  navbar = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: 10,
      }}
    >
      <Button.Group>
        {homeButton()}
        {link(links[0].linkName, links[0].linkRoute, links[0].color)}
      </Button.Group>
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
          justifyContent: "flex-end",
          minWidth: "calc(100vw)",
          margin: 5,
        }}
      >
        {this.navbar()}
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
