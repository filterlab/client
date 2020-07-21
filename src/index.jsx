import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import cart from "./reducers/cartReducer";
import auth from "./reducers/authReducer";
import { reducer as responsive, mediaQueryTracker } from "redux-mediaquery";
import "./styles.css";

import App from "./components/App";
import Install from "./components/pages/Install";
import ScrollToTop from "./components/ui/ScrollToTop";

const Root = () => (
  <Router>
    <ScrollToTop>
      <React.Fragment>
        <Switch>
          <Route component={App} exact path="/" />
          <Route component={Install} path="/install" />
        </Switch>
      </React.Fragment>
    </ScrollToTop>
  </Router>
);

const combinedReducer = combineReducers({
  responsive,
  auth,
  cart,
});

const store = createStore(combinedReducer, composeWithDevTools());

// eslint-disable-next-line
const unlisten = mediaQueryTracker(
  {
    isTablet: "screen and (max-width: 700px)",
  },
  store.dispatch
);
ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
