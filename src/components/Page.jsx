import React from "react";
import Fade from "react-reveal/Fade";
import { Header } from "semantic-ui-react";
import LoadingScreen from "./LoadingScreen";
import Spacer from "./Spacer";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

const Page = ({ header, top, loading, loadingMessage, body }) => (
  <Fade clear delay={100}>
    <div
      style={{
        margin: 5,
        paddingTop: top ? top : 80,
        minHeight: "calc(100vh)",
      }}
    >
      <Helmet>
        <title>Filterlab</title>
        <meta
          name="description"
          content="Looking for awesome Lightroom presets? Find them at Filterlab!"
        />
      </Helmet>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 10,
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
