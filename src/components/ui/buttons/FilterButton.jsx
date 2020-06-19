import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";

class FilterButton extends React.Component {
  state = {
    error: "",
  };

  freeFilter = () => this.props.price === 0;
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
            price: 0,
            id: this.props.filter._id,
            quantity: 1,
            name: this.props.filter.name,
          },
        ],
      },
    });
  }

  buildCondition_1 = () =>
    this.state.error ? (
      <Link
        to={`/free`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <Button color="red">Login</Button>
      </Link>
    ) : this.freeFilter() && !this.props.isAuthed ? (
      <Button
        onClick={() => this.setState({ error: "Login first" })}
        color="green"
      >
        Free
      </Button>
    ) : (
      this.buildCondition_2()
    );

  buildCondition_2 = () => (
    <Link
      to={`/files/filters/${this.props.download}`}
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
    <Button onClick={() => this.props.buy()} color="green">
      {this.props.price}
    </Button>
  );

  buildCondition_4 = () => (
    <Link
      to={`/files/filters/${this.props.download}`}
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
    return this.freeFilter()
      ? this.buildCondition_1()
      : this.notAuthedOrNotBought()
      ? this.buildCondition_3()
      : this.buildCondition_4();
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.auth.filters,
    isAuthed: state.auth.key,
    userId: state.auth.accountId,
  };
};

export default connect(mapStateToProps)(FilterButton);
