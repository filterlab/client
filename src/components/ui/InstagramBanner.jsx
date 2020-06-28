import React from "react";
import { connect } from "react-redux";
import { Header, Icon } from "semantic-ui-react";

const InstagramBanner = ({ isTablet }) => (
  <center>
    <Header as={isTablet ? "h3" : "h2"} style={{ marginLeft: 20 }}>
      Tag #filterlab and get featured on <Icon name="instagram" />
    </Header>
  </center>
);

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(InstagramBanner);
