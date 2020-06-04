import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const LoadingScreen = ({ message }) => (
  <Dimmer active inverted>
    <div style={{ minHeight: "100vh" }}>
      <Loader inverted content={message} />
    </div>
  </Dimmer>
);

export default LoadingScreen;
