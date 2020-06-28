import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

const FluidButton = (props) => (
  <Button fluid={props.isTablet} color={props.color ? props.color : "black"}>
    {props.iconName && <Icon name={props.iconName} />} {props.text}
  </Button>
);

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(FluidButton);
