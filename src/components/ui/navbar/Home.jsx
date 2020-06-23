import React from "react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home = () => (
  <Link
    to="/"
    style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
  >
    <Icon name="home" size="big" />
  </Link>
);

export default Home;
