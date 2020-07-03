import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { removeItem } from "../../../actions/cartActions";
import { formatCurrency } from "../../helpers/currency";
import Pulsable from "../Pulsable";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";

class FilterButton extends React.Component {
  state = {
    error: "",
    clicked: false,
  };

  componentDidMount() {
    this.props.items.map(
      (item) =>
        item.id === this.props.filter._id && this.setState({ clicked: true })
    );
  }

  freeFilter = () => this.props.free;
  notAuthedOrNotBought = () => !this.props.isAuthed || !this.props.isBought;
  showDownload = () => this.props.isAuthed && this.props.isBought;

  async freeDownload() {
    await axios({
      method: "POST",
      url: `${apiUrl}/orders`,
      headers: {
        Authorization: `Bearer ${this.props.isAuthed}`,
      },
      data: {
        user: this.props.userId,
        amount: 1,
        free: "true",
        filters: [
          {
            free: this.props.free,
            price: this.props.price,
            id: this.props.filter._id,
            quantity: 1,
            name: this.props.filter.name,
          },
        ],
      },
    });
  }
  login = () => (
    <Link
      to={this.props.free ? "/free" : "/login"}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Button color="red">Login</Button>
    </Link>
  );
  buildCondition_1 = () =>
    this.state.error ? (
      this.login()
    ) : this.props.price && !this.props.isAuthed ? (
      <Button
        onClick={() => this.setState({ error: "Login first" })}
        color="green"
      >
        <Pulsable>Free</Pulsable>
      </Button>
    ) : (
      this.buildCondition_2()
    );

  buildCondition_2 = () => (
    <Link
      to={`/files/filters/${this.props.filter._id}.dng`}
      style={{ color: "inherit", textDecoration: "inherit" }}
      target="_blank"
      download
    >
      <Button onClick={() => this.freeDownload()} color="green">
        Download
      </Button>
    </Link>
  );

  buildCondition_3 = () => (
    <span
      onClick={() =>
        !this.props.isAuthed
          ? this.setState({ error: true })
          : this.setState({ clicked: !this.state.clicked })
      }
    >
      <Button
        loading={!this.props.price}
        onClick={() =>
          this.state.clicked
            ? this.props.removeItem(
                this.props.filter._id,
                this.props.price,
                this.props.filter.name
              )
            : this.props.buy()
        }
        color={this.state.clicked ? "red" : "green"}
      >
        {this.state.clicked ? (
          <span>
            Remove from <Icon name="cart" />
          </span>
        ) : (
          this.props.price &&
          formatCurrency(this.props.price, this.props.currency)
        )}
      </Button>
    </span>
  );

  buildCondition_4 = () => (
    <Link
      to={`/files/filters/${this.props.filter._id}.dng`}
      style={{ color: "inherit", textDecoration: "inherit" }}
      target="_blank"
      download
    >
      <Button loading={!this.props.price} color="green">
        Download
      </Button>
    </Link>
  );

  render() {
    return this.state.error
      ? this.login()
      : this.freeFilter()
      ? this.buildCondition_1()
      : this.notAuthedOrNotBought()
      ? this.buildCondition_3()
      : this.buildCondition_4();
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    currency: state.cart.currency,
    isAuthed: state.auth.key,
    userId: state.auth.accountId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id, price, name) => {
      dispatch(removeItem(id, price, name));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterButton);
