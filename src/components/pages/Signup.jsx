import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { handleSuccess, handleError } from "../helpers/toasts";
import { addAuth } from "../../actions/authActions";
import Page from "../Page";
import { Button, Checkbox, Form } from "semantic-ui-react";
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const isEmail = require("isemail");

const SUCCESS_MESSAGE = "Account successfully created!";
const FAILURE_MESSAGE_EMAIL_TAKEN =
  "E-mail taken, please use another one or contact support";
const FAILURE_MESSAGE_CHECKBOX = "Please enable the checkbox";
const FAILURE_MESSAGE_PASSWORD = "Your password is too short";
const FAILURE_MESSAGE_INVALID_EMAIL = "Please type a valid e-mail";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    checkbox: false,
    loading: false,
    error: "",
  };

  setError = (error) => {
    handleError(error);
    this.setState({
      error,
    });
  };
  auth = async () => {
    const { email, password } = this.state;

    try {
      this.setState({ loading: true });
      var response = await strapi.register(email, email, password);
      this.setState({ loading: false });
      this.props.addAuth(response.jwt, response.user.id, response.user.email);
      handleSuccess(SUCCESS_MESSAGE);
      this.props.history.push("/");
    } catch (err) {
      handleError(FAILURE_MESSAGE_EMAIL_TAKEN);
      this.setState({
        loading: false,
        error: FAILURE_MESSAGE_EMAIL_TAKEN,
      });
    }
  };

  validateForm = () => {
    const { email, password, checkbox } = this.state;

    if (!checkbox) {
      this.setError(FAILURE_MESSAGE_CHECKBOX);
    } else if (password.length < 6) {
      this.setError(FAILURE_MESSAGE_PASSWORD);
    } else if (!isEmail.validate(email)) {
      this.setError(FAILURE_MESSAGE_INVALID_EMAIL);
    } else {
      this.auth();
    }
  };

  build = () => (
    <div style={{ width: this.props.isTablet ? 300 : 500 }}>
      <Form>
        <Form.Field>
          <label>E-mail</label>
          <input
            onChange={(e) =>
              this.setState({ email: e.target.value, error: "" })
            }
            placeholder="E-mail"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            onChange={(e) =>
              this.setState({ password: e.target.value, error: "" })
            }
            placeholder="Password"
            type="password"
          />
        </Form.Field>
        <Form.Field>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              onClick={() =>
                this.setState({ checkbox: !this.state.checkbox, error: "" })
              }
            />
            <div style={{ margin: 5 }} />
            <Link
              to="/terms"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              I agree to the Terms and Conditions
            </Link>
          </div>
        </Form.Field>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            disabled={this.state.error}
            onClick={() => this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );

  render() {
    return (
      <Page
        header={"Sign up"}
        loading={false}
        loadingMessage={"Redirecting to sign up page"}
        body={this.build()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
    isAuthed: state.auth.key,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAuth: (key, accountId, email) => {
      dispatch(addAuth(key, accountId, email));
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Signup);
