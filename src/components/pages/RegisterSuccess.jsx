import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Header } from "semantic-ui-react";
import Page from "../ui/Page";
import Spacer from "../ui/Spacer";
import Pulsable from "../ui/Pulsable";

class Success extends React.Component {
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
      <Spacer space={100} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Header>Thank you for registering!</Header>
        <Spacer space={10} />
        <span
          role="img"
          aria-label="party"
          style={{ fontFamily: "Segoe UI Emoji", fontSize: "3.5em" }}
        >
          🥳
        </span>
      </div>
      <Spacer space={20} />
      <Link to={"/"} style={{ color: "inherit", textDecoration: "inherit" }}>
        <Button>
          <Pulsable>Start now</Pulsable>
        </Button>
      </Link>
    </div>
  );

  render() {
    return (
      <Page
        header={"Account created!"}
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

export default connect(mapStateToProps, null)(Success);
