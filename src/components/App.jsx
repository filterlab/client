import React, { Component } from "react";
import Page from "./Page";
import Spacer from "./Spacer";
import Install from "./pages/Install";
import Logo from "./Logo";
import Categories from "./pages/Categories";

class App extends Component {
  render() {
    const build = () => (
      <>
        <Logo size="big" />
        <Spacer space={50} />
        <Categories />
        <Spacer space={10} />
        <Install />
      </>
    );

    return <Page loadingMessage={"Loading awesome filters"} body={build()} />;
  }
}

export default App;
