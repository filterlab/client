import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import Page from "../ui/Page";
import Spacer from "../ui/Spacer";
import Divider from "../ui/Divider";

const FILES_FOLDER = "../../files/install/";
const files = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
];

const descriptions = [
  "",
  `After downloading your preset from Collections, open Lightroom, and click on "New item".`,
  `Now click on "Create New Album".`,
  `Name your new album a name, and press "Ok".`,
  `Press on add photo.`,
  `Find your downloaded preset by clicking on "Files" and going to your device downloads folder.`,
  `After importing your preset, click on it.`,
  `Press on the three dots.`,
  `Press on "Create Preset".`,
  `Name your preset and press done.`,
  `Choose one photo you would like to edit and find "Presets".`,
  `Press "User Presets", choose your new preset, and that's it!`,
];
const Step = ({ i, isTablet, img }) => {
  const WIDTH = isTablet ? 241.92 : 302.4;
  const HEIGHT = isTablet ? 524.16 : 655.2;
  const MARGIN = isTablet ? 10 : 20;
  return (
    <div style={{ margin: MARGIN, maxWidth: WIDTH }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon circular name="slack hash" />
          <b>{i}</b>
        </div>
      </div>
      <Spacer space={MARGIN} />
      <Divider />
      <Spacer space={MARGIN} />
      <center>
        <span style={{ display: "block", minHeight: 40 }}>
          {descriptions[i]}
        </span>
      </center>
      <Spacer space={MARGIN / 2} />
      <img alt={i} style={{ width: WIDTH, height: HEIGHT }} src={img} />
    </div>
  );
};

class Install extends React.Component {
  build = () => (
    <>
      <center>
        <Header>
          First time installing a preset?
          {this.props.isTablet && <br />} Follow these steps!
        </Header>
      </center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: this.props.isTablet ? 614.8 : 1330.4,
        }}
      >
        {files.map((file, i) => (
          <Step
            i={i + 1}
            isTablet={this.props.isTablet}
            img={`${FILES_FOLDER}${file}`}
          />
        ))}
      </div>
    </>
  );

  render() {
    return (
      <Page
        top={this.props.top}
        header={"How to use"}
        loading={false}
        loadingMessage={""}
        body={this.build()}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default compose(withRouter, connect(mapStateToProps))(Install);
