import React from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Header } from "semantic-ui-react";
import Page from "../ui/Page";
import Spacer from "../ui/Spacer";

class Download extends React.Component {
  divider = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        marginBottom: this.props.isTablet && 20,
      }}
    >
      <Header as={this.props.isTablet ? "h3" : "h1"}>OR</Header>
    </div>
  );
  buildCollections = () => (
    <div
      style={{
        width: this.props.isTablet ? 300 : 500,
        margin: 20,
        marginTop: !this.props.isTablet && -15,
      }}
    >
      <center>
        You can use Filterlab's
        <b style={{ whiteSpace: "nowrap" }}> Collections</b>!{" "}
      </center>
      <br />
      <span>
        Collections is your own preset hub, with{" "}
        <b style={{ whiteSpace: "nowrap" }}>all your presets</b>.
        <br />
        No more <i>e-mails</i> with preset files!
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
    </div>
  );

  buildCategories = () => (
    <div
      style={{
        width: this.props.isTablet ? 300 : 500,
        margin: 20,
        marginBottom: this.props.isTablet && 0,
        marginTop: !this.props.isTablet && 50,
      }}
    >
      You can easily download your presets directly from it's Category.
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Fade>
          <img
            width={300}
            height={"100%"}
            alt="download"
            src={"../../files/collection/download_other.png"}
          />
        </Fade>
      </div>
      <br />
    </div>
  );
  build = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Spacer space={20} />
      <Fade right>
        <Header as="h2">
          There are two ways to do this{" "}
          <span
            role="img"
            aria-label="celebrate"
            style={{ fontFamily: "Segoe UI Emoji" }}
          >
            🥳
          </span>
        </Header>
      </Fade>
      <Spacer space={25} />
      <Header as="h3">
        After you{" "}
        <Link
          to={"/login"}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button>Login</Button>
        </Link>
      </Header>
      <Spacer space={25} />
      <center>
        <div
          style={{
            display: "flex",
            flexDirection: this.props.isTablet ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: this.props.isTablet ? 500 : 1080,
          }}
        >
          {this.buildCategories()}
          {this.divider()}
          {this.buildCollections()}
        </div>
      </center>
      <Spacer space={20} />
      <Link to={"/"} style={{ color: "inherit", textDecoration: "inherit" }}>
        <Button>Home</Button>
      </Link>
    </div>
  );

  render() {
    return (
      <Page
        header={"How to download a preset?"}
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

export default connect(mapStateToProps, null)(Download);
