import React from "react";
import Pulse from "react-reveal/Pulse";

class Pulsable extends React.Component {
  state = {
    pulse: false,
  };

  componentDidMount = () => {
    setInterval(() => this.setState({ pulse: !this.state.pulse }), 2300);
  };

  render() {
    return <Pulse spy={this.state.pulse}>{this.props.children}</Pulse>;
  }
}
export default Pulsable;
