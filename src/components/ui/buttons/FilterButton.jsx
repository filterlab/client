import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { removeItem } from "../../../actions/cartActions";
import { formatCurrency } from "../../helpers/currency";
import Pulsable from "../Pulsable";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
class FilterButton extends React.Component {
  state = {
    error: "",
    clicked: false,
  };

  async componentDidMount() {
    this.props.items.map(
      (item) =>
        item.id === this.props.filter._id && this.setState({ clicked: true })
    );
  }

  freeFilter = () => this.props.free;
  notAuthedOrNotBought = () => !this.props.isAuthed || !this.props.isBought;
  showDownload = () => this.props.isAuthed && this.props.isBought;

  async freeDownload() {
    if (this.props.userId) {
      let bought;
      const { data } = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
            user(id: "${this.props.userId}") {
              _id
              orders {
                filters
              }
            }
          }`,
        },
      });

      const orders = data.user.orders;
      if (orders) {
        this.props.history.push("/");
      }
      orders.map((order) =>
        order.filters.map((filter) =>
          filter.id === this.props.filter._id ? (bought = true) : ""
        )
      );
      if (!bought)
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
    <a
      href={`/files/filters/${this.props.filter._id}.dng`}
      style={{ color: "inherit", textDecoration: "inherit" }}
      rel="noopener noreferrer"
      download
      target="_self"
    >
      <Button onClick={() => this.freeDownload()} color="green">
        Download
      </Button>
    </a>
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
    <a
      href={`/files/filters/${this.props.filter._id}.${
        this.props.isPack ? "zip" : "dng"
      }`}
      style={{ color: "inherit", textDecoration: "inherit" }}
      target="_self"
      download
    >
      <Button loading={!this.props.price} color="green">
        Download
      </Button>
    </a>
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FilterButton)
);
