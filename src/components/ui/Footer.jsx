import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import Divider from "../ui/Divider";
import Spacer from "../ui/Spacer";
import Hover from "./Hover";

const Footer = (props) => {
  const { isTablet } = props;
  const entry = (content) => (
    <Hover>
      <span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            minWidth: 150,
            marginTop: 10,
          }}
        >
          {content}
        </div>
      </span>
    </Hover>
  );

  const build = () => {
    return (
      <div>
        <Divider />
        <Spacer space={20} />
        <b style={{ whiteSpace: "nowrap" }}>2020 | Filterlab</b>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: isTablet && "space-around",
              maxWidth: isTablet ? 150 : 1000,
            }}
          >
            {entry(
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <a
                  href="https://www.instagram.com/filterlab.store"
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                >
                  Filterlab
                </a>
                <div style={{ marginRight: 5 }} />
                <Icon name="instagram" />
              </div>
            )}
            {entry(
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Link
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  to="/terms"
                >
                  Terms and Policy
                </Link>
                <div style={{ marginRight: 5 }} />
                <Icon name="clipboard list" />
              </div>
            )}
            {entry(
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <a
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  href="mailto:filterlabstore@gmail.com"
                >
                  Contact us
                </a>
                <div style={{ marginRight: 5 }} />
                <Icon name="mail" />
              </div>
            )}
          </div>
        </div>
        <Spacer space={20} />
      </div>
    );
  };

  return <div style={{ margin: 20, width: "100%" }}>{build()}</div>;
};
function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(Footer);
