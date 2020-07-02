import React from "react";
import { Link } from "react-router-dom";
import FluidButton from "../buttons/FluidButton";
import { connect } from "react-redux";
import { Header, Icon } from "semantic-ui-react";
import Fade from "react-reveal/Fade";
import OutsideClickHandler from "react-outside-click-handler";
import { removeKey } from "../../../actions/authActions";
import Spacer from "../Spacer";
import { Line } from "../Line";

const BLACK = "black";
const RED = "red";
const GREEN = "green";

const sidebarStyle = {
  maxWidth: "calc(50vw)",
  minHeight: "calc(100vh)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  background: "#ffffff",
};
const innerSidebarStyle = {
  margin: 20,
  minHeight: "calc(100vh)",
  display: "flex",
  flexDirection: "column",
};
const authedLinks = [
  { linkName: "How to use", linkRoute: "/install", color: undefined },
  { linkName: "Categories", linkRoute: "/all", color: undefined },
  { linkName: "Collections", linkRoute: "/collections", color: undefined },
  {
    linkName: "Checkout",
    linkRoute: "/checkout",
    color: undefined,
  },
];

const authedLinks_user = [{ linkName: "Logout", linkRoute: "/", color: RED }];

const nonAuthedLinks = [
  { linkName: "Categories", linkRoute: "/all", color: undefined },
  {
    linkName: "Collections",
    linkRoute: "/collections_login",
    color: undefined,
  },
  { linkName: "Checkout", linkRoute: "/checkout_login", color: undefined },
];

const nonAuthedLinks_user = [
  { linkName: "Register", linkRoute: "/signup", color: BLACK },
  { linkName: "Login", linkRoute: "/login", color: GREEN },
];

const MySidebar = ({ open, isAuthed, onClick, removeKey }) => {
  const links = isAuthed ? authedLinks : nonAuthedLinks;
  const links_user = isAuthed ? authedLinks_user : nonAuthedLinks_user;
  const linkify = (linkName, linkRoute, color, iconName, paddingTop) => (
    <span>
      <Link
        style={{
          color: "inherit",
          textDecoration: "inherit",
          margin: 1,
          paddingTop: paddingTop,
        }}
        to={linkRoute}
      >
        {color ? (
          linkName === "Logout" ? (
            <span onClick={() => removeKey(isAuthed)}>
              <FluidButton color={color} icon={iconName} text={linkName} />
            </span>
          ) : (
            <FluidButton color={color} icon={iconName} text={linkName} />
          )
        ) : (
          linkName
        )}
      </Link>
    </span>
  );
  return (
    open && (
      <Fade left>
        <div style={sidebarStyle}>
          <OutsideClickHandler onOutsideClick={() => onClick(false)}>
            <div style={innerSidebarStyle}>
              <Fade clear>
                <span style={{ marginLeft: -5 }}>
                  <Icon
                    name="delete"
                    size="big"
                    onClick={() => onClick(false)}
                  />
                </span>
              </Fade>
              <Header as="h1">Menu</Header>
              <Spacer space={50} />
              <div
                style={{
                  minHeight: "calc(100vh - 350px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {links.map((link) => (
                  <div onClick={() => onClick(false)}>
                    {linkify(
                      link.linkName,
                      link.linkRoute,
                      link.color,
                      link.iconName
                    )}
                    <Spacer space={10} />
                  </div>
                ))}
                <Spacer space={100} />
                {links_user.map((link) => (
                  <div onClick={() => onClick(false)}>
                    {linkify(
                      link.linkName,
                      link.linkRoute,
                      link.color,
                      link.iconName
                    )}
                  </div>
                ))}
                <Spacer space={25} />
                <Line />
                <Spacer space={15} />
                <center>
                  <a
                    href="https://www.instagram.com/filterlab.store"
                    style={{
                      color: "inherit",
                      textDecoration: "inherit",
                    }}
                  >
                    <Icon size="big" name="instagram" />
                  </a>
                </center>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </Fade>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthed: state.auth.key,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeKey: (key) => {
      dispatch(removeKey(key));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MySidebar);
