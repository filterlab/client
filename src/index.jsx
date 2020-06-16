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

import PrivateRoute from "./components/helpers/PrivateRoute";
import App from "./components/App";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import StripedCheckout from "./components/pages/checkout/StripedCheckout";
import Filters from "./components/pages/Filters";
import Collections from "./components/pages/Collections";
import FilterDetail from "./components/pages/FilterDetail";
import Forgot from "./components/pages/Forgot";
import Page404 from "./components/pages/Page404";
import Terms from "./components/pages/Terms";
import Install from "./components/pages/Install";
import Navbar from "./components/ui/Navbar";
import RegisterSuccess from "./components/pages/RegisterSuccess";

const Root = () => (
  <Router>
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route component={App} exact path="/" />
        <Route component={Signup} path="/signup" />
        <Route component={Login} path="/login" />
        <Route component={Forgot} path="/forgot" />
        <Route component={Filters} path="/category/:categoryId" />
        <Route component={FilterDetail} path="/filter/:filterId" />
        <Route component={Page404} path="/404" />
        <Route component={Terms} path="/terms" />
        <Route component={Install} path="/install" />
        <Route component={RegisterSuccess} path="/success" />
        <PrivateRoute component={Collections} path="/collections" />
        <PrivateRoute component={StripedCheckout} path="/checkout" />
      </Switch>
    </React.Fragment>
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
