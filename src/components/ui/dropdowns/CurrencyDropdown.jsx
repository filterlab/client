import React from "react";
import { connect } from "react-redux";
import { Form, Checkbox, Button, Segment } from "semantic-ui-react";
import OutsideClickHandler from "react-outside-click-handler";
import { changeCurrency } from "../../../actions/cartActions";

class CurrencyRadioGroup extends React.Component {
  state = {
    value: this.props.currency.toUpperCase(),
  };
  handleChange = (e, { value }) => {
    if (value !== this.state.value) {
      this.props.changeCurrency();
      this.setState({ value, enable: false });
    }
  };

  render() {
    return (
      <OutsideClickHandler
        onOutsideClick={() => this.setState({ enable: false })}
      >
        <Form>
          <Form.Field>
            <Button
              onClick={() => this.setState({ enable: !this.state.enable })}
            >
              <b>{this.state.value}</b>
            </Button>
          </Form.Field>
          <div
            style={{
              height: 0,
              marginTop: -10,
              marginLeft: -6.5,
              position: "absolute",
              zIndex: 1000000000,
            }}
          >
            {this.state.enable && (
              <Segment>
                <Form.Field>
                  <Checkbox
                    radio
                    label="EUR"
                    name="checkboxRadioGroup"
                    value="EUR"
                    checked={this.state.value === "EUR"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label="USD"
                    name="checkboxRadioGroup"
                    value="USD"
                    checked={this.state.value === "USD"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Segment>
            )}
          </div>
        </Form>
      </OutsideClickHandler>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.cart.currency,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: () => {
      dispatch(changeCurrency());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyRadioGroup);
