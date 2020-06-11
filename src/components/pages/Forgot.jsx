import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { handleSuccess, handleError } from "../helpers/toasts";
import { addAuth } from "../../actions/authActions";
import Page from "../Page";
import { Button, Form } from "semantic-ui-react";
import Strapi from "strapi-sdk-javascript/build/main";

const recoveryUrl =
  process.env.recoveryUrl ||
  "http://localhost:3000/reset-password?code=privateCode.";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const isEmail = require("isemail");

const SUCCESS_EMAIL_SENT_MESSAGE =
  "Email sent! Check your spam folder, and copy the provided code";
const SUCCESS_PASSWORD_CHANGED_MESSAGE = "Password changed, please login";
const FAILURE_MESSAGE_INCORRECT_CODE = "Incorrect code provided";
const FAILURE_MESSAGE_UKNOWN_EMAIL =
  "Error, please contact support at filterlabstore@gmail.com";
const FAILURE_MESSAGE_INVALID_EMAIL = "Please type a valid e-mail";

class Forgot extends React.Component {
  state = {
    email: "",
    emailSent: false,
    loading: false,
    error: "",
  };

  setError = (error) => {
    handleError(error);
    this.setState({
      error,
    });
  };
  requestCode = async () => {
    const { email } = this.state;

    try {
      this.setState({ loading: true });
      // eslint-disable-next-line
      var response = await strapi.forgotPassword(email, recoveryUrl);

      this.setState({ loading: false, emailSent: true });
      handleSuccess(SUCCESS_EMAIL_SENT_MESSAGE);
    } catch (err) {
      handleError(FAILURE_MESSAGE_UKNOWN_EMAIL);
      this.setState({
        loading: false,
        error: FAILURE_MESSAGE_UKNOWN_EMAIL,
      });
    }
  };

  changePassword = async () => {
    const { code, password } = this.state;

    try {
      this.setState({ loading: true });
      // eslint-disable-next-line
      var response = await strapi.resetPassword(code, password, password);

      this.setState({ loading: false, emailSent: true });
      handleSuccess(SUCCESS_PASSWORD_CHANGED_MESSAGE);
      setTimeout(() => this.props.history.push("/login"), 2000);
    } catch (err) {
      handleError(FAILURE_MESSAGE_INCORRECT_CODE);
      this.setState({
        loading: false,
        error: FAILURE_MESSAGE_INCORRECT_CODE,
      });
    }
  };

  reset = () => {
    const { email } = this.state;

    if (!isEmail.validate(email)) {
      this.setError(FAILURE_MESSAGE_INVALID_EMAIL);
    } else {
      this.state.emailSent ? this.changePassword() : this.requestCode();
    }
  };

  build = () => (
    <div style={{ width: this.props.isTablet ? 300 : 500 }}>
      <Form>
        {this.state.emailSent ? (
          <>
            <Form.Field>
              <label>Code</label>
              <input
                onChange={(e) =>
                  this.setState({ code: e.target.value, error: "" })
                }
                placeholder="Check your inbox or spam folder and copy the sent code"
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
          </>
        ) : (
          <Form.Field>
            <label>E-mail</label>
            <input
              onChange={(e) =>
                this.setState({ email: e.target.value, error: "" })
              }
              placeholder="E-mail"
            />
          </Form.Field>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            loading={this.state.loading}
            disabled={this.state.error}
            onClick={() => this.reset()}
            type="submit"
          >
            {this.state.emailSent ? "Change your password" : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );

  render() {
    return (
      <Page
        header={"Forgot Password"}
        loading={false}
        loadingMessage={"Redirecting to forgot password page"}
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
)(Forgot);
