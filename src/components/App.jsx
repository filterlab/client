import React, { Component } from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { Header } from "semantic-ui-react";
import Categories from "./pages/Categories";
import Page from "./ui/Page";
import Spacer from "./ui/Spacer";
import Motivation from "./ui/Motivation";

class App extends Component {
  render() {
    const { isTablet } = this.props;
    const build = () => (
      <>
        <Motivation />
        <Spacer space={isTablet ? 40 : 20} />
        <Fade left>
          <Header as="h1">Categories</Header>
        </Fade>
        <Spacer space={10} />
        <Categories />
        <Spacer space={10} />
      </>
    );

    return (
      <Page
        top={isTablet && 40}
        loadingMessage={"Loading awesome filters"}
        body={build()}
        footer
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(App);
