import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Page from "../Page";
import { Button, Header, Icon } from "semantic-ui-react";
import Spacer from "../Spacer";

class Install extends React.Component {
  build = () => (
    <>
      <Header>Which operating system are you using?</Header>
      <Spacer space={10} />
      <div
        style={{
          width: 300,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <>iOS</> <Icon name="app store ios" />
          </div>
        </Button>
        <Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <>Android</> <Icon name="android" />
          </div>
        </Button>
      </div>
    </>
  );

  render() {
    return (
      <Page
        header={"How to Install"}
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

export default compose(withRouter, connect(mapStateToProps))(Install);
