import React from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Header } from "semantic-ui-react";
import Page from "../ui/Page";
import Spacer from "../ui/Spacer";

class InfoCollection extends React.Component {
  build = () => (
    <div
      style={{
        width: this.props.isTablet ? 300 : 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spacer space={20} />
      <Fade right>
        <Header>
          Glad you asked{" "}
          <span
            role="img"
            aria-label="celebrate"
            style={{ fontFamily: "Segoe UI Emoji" }}
          >
            🥳
          </span>
        </Header>
      </Fade>
      <Spacer space={10} />
      <div>
        Filterlab's<b style={{ whiteSpace: "nowrap" }}> Collections</b>{" "}
        <span>is your preset vault! </span>
        <br />
        <br />
        <span>
          When you buy a Filterlab preset, it is immediately added to your
          Collections, becoming available for download on any of your devices,
          just like the image below.
        </span>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Fade>
            <img
              width={290}
              height={313}
              alt="download"
              src={"../../files/collection/download.png"}
            />
          </Fade>
        </div>
        <br />
        <br />
        <span>
          To access it, just hit{" "}
          <Link
            to={"/login"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button size="mini">Login</Button>
          </Link>
          and then click on the Collections menu option!
        </span>
      </div>
      <Spacer space={20} />
      <Link to={"/"} style={{ color: "inherit", textDecoration: "inherit" }}>
        <Button>Home</Button>
      </Link>
    </div>
  );

  render() {
    return (
      <Page
        header={"What's Collections all about?"}
        loading={false}
        loadingMessage={""}
        body={this.build()}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps, null)(InfoCollection);
