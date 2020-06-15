import React from "react";

class Hover extends React.Component {
  state = {
    hover: false,
  };
  setHover = (condition) => this.setState({ hover: condition });

  render() {
    return (
      <div
        onMouseEnter={() => this.setHover(true)}
        onMouseLeave={() => this.setHover(false)}
        style={{ opacity: this.state.hover ? 0.6 : 1 }}
      >
        {this.props.children}
      </div>
    );
  }
}
export default Hover;
