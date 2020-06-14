import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const Footer = () => {
  const entry = (content) => (
    <div
      style={{
        minHeight: 250 / 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      {content}
    </div>
  );
  const build = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {entry(
          <div style={{ display: "flex", alignItems: "center" }}>
            <a
              style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
              href="mailto:filterlabstore@gmail.com"
            >
              Contact us
            </a>
            <Icon name="mail" />
          </div>
        )}
        {entry(
          <div style={{ display: "flex", alignItems: "center" }}>
            <a
              href="https://www.instagram.com/filterlab.store"
              style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
            >
              Filterlab
            </a>
            <Icon name="instagram" />
          </div>
        )}
        {entry(
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
              to="/terms"
            >
              Terms and Conditions
            </Link>
            <Icon name="question circle outline" />
          </div>
        )}
      </div>
    );
  };
  return (
    <div
      style={{ marginTop: 20, width: "100%", height: 250, background: "black" }}
    >
      {build()}
    </div>
  );
};

export default Footer;
