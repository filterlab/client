import React from "react";
import Fade from "react-reveal/Fade";
import { Header } from "semantic-ui-react";
import LoadingScreen from "./LoadingScreen";
import Spacer from "./Spacer";
import { ToastContainer } from "react-toastify";

const Page = ({ header, loading, loadingMessage, body }) => (
  <Fade clear delay={100}>
    <div style={{ margin: 5, paddingTop: 120, minHeight: "calc(100vh - 65px)" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        {!loading && <Header as="h1">{header}</Header>}
        <Spacer space={10} />
        {loading ? <LoadingScreen message={loadingMessage} /> : body}
      </div>
      <ToastContainer />
    </div>
  </Fade>
);
export default Page;
