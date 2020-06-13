import React, { Component } from "react";
import { connect } from "react-redux";
import Page from "./Page";
import Spacer from "./Spacer";
import Motivation from "./Motivation";
import Categories from "./pages/Categories";
import Fade from "react-reveal/Fade";
import { Header } from "semantic-ui-react";
import Divider from "./Divider";
import Footer from "./Footer";

class App extends Component {
  render() {
    const { isTablet } = this.props;
    const build = () => (
      <>
        <Motivation />
        <Spacer space={isTablet ? 40 : 20} />
        <Fade left>
          <Header as="h1">Our categories</Header>
        </Fade>
        <Spacer space={10} />
        <Categories />
        <Spacer space={10} />
        <Divider />
        <Footer />
      </>
    );

    return (
      <Page
        top={isTablet && 40}
        loadingMessage={"Loading awesome filters"}
        body={build()}
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
