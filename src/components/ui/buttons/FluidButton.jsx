import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

const FluidButton = ({ isTablet, color, icon, text }) => {
  return (
    <Button fluid={isTablet} color={color ? color : "black"}>
      {icon && <Icon name={icon} />} {text}
    </Button>
  );
};

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default connect(mapStateToProps)(FluidButton);
