import React from "react";
import { Header } from "semantic-ui-react";
import Spacer from "./Spacer";

const Empty = ({ message }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
    }}
  >
    <Header>{message}</Header>
    <Spacer space={10} />
    <span
      role="img"
      aria-label="sad"
      style={{ fontFamily: "Segoe UI Emoji", fontSize: "3.5em" }}
    >
      😔
    </span>
  </div>
);

export default Empty;
