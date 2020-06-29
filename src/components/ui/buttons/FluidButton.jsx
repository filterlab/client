import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

const FluidButton = ({ isTablet, color, iconName, text }) => (
  <Button fluid={isTablet} color={color ? color : "black"}>
    {iconName && <Icon name={iconName} />} {text}
  </Button>
);

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(FluidButton);
