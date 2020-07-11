import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Page from "../ui/Page";
import Spacer from "../ui/Spacer";
import { Header } from "semantic-ui-react";

class Privacy extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  build = () => (
    <div
      style={{
        width: this.props.isTablet ? 300 : 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header as="h1">Privacy Policy</Header>
      <Spacer space={20} />
      We are committed to protecting your privacy online. This privacy policy
      has been compiled to better serve those who are concerned with how their
      “personally identifiable information” (PII) is being used online.
      <br /> PII is information that can be used on its own or with other
      information to identify, contact, or locate a single person, or to
      identify an individual in context. Please read our privacy policy
      carefully to get a clear understanding of how we collect, use, protect or
      otherwise handle your personally identifiable information in accordance
      with our website www.filterlab.store (“website”), (“site”).
      <br />
      Any information collected on this website will not be sold or shared with
      third parties. We collect information from you when you sign up on our
      website and make a payment. This site collects the personal information
      you voluntarily provide to us, which includes only the email address.
      Besides the e-mail address, we also collect information about your orders
      and prices paid, which does not include any credit/debit card information.
      <br />
      <Header as="h3">Right to be forgotten</Header> If after you opt-in, you
      change your mind, you may withdraw your consent for us to contact you, for
      the continued collection, use or disclosure of your information, or to
      cancel your account at any time, send us an e-mail to
      filterlabstore@gmail.com, from the account you want to erase with suject
      "Right to be forgotten". Your account and order history will then be
      erased.
      <br />
      <Header as="h3">Information we collect</Header>Your privacy is important
      to us.
      <br />
      Any information collected on this website will not be sold or shared with
      third parties. We collect information from you when you sign up on our
      website and make a payment. This site collects the personal information
      you voluntarily provide to us, which includes only the email address.
      Besides the e-mail address, we also collect information about your orders
      and prices paid, which does not include any credit/debit card information.
      <br />
      To mention that we collect this information solely for statistical
      purposes used only by ourselves.
      <br />
      <br /> Note that your credentials are encrypted in our database meaning
      that we can only see random characters.
      <br /> You may change your password by recovering your password on the
      login menu.
      <Header as="h3">What we do with your information?</Header> We use the
      information mentioned above only for statistical analysis on our products
      in order to provide the highest possible level of service to you.
      <br />
      <Header as="h3">How do you get my consent?</Header>
      When you provide us with personal information to complete a transaction,
      verify your credit card or place an order, we imply that you consent to us
      collecting it and using it for that specific reason only. If we ask for
      your personal information for a secondary reason, like marketing, we will
      either ask you directly for your expressed consent or provide you with an
      opportunity to say no.
      <Header as="h3">Payments</Header>
      Our payments processing system uses Stripe.
      <br />
      Stripe is a suite of payment APIs (Application Programming Interface) that
      powers commerce for online businesses. As we use Stripe’s gateway to
      process your payments, we do not have any kind of access to your personal
      financial data, including your credit/debit card number, expiration date,
      nor cvc code.
      {/*<Header as="h3">Google Analytics</Header> Our site may use Google
      Analytics to help us learn about who visits our site and what pages are
      being looked at. Google Adsense You may see some sort of advertising in
      our website. Some of the ads may be served by Google. Google's use of the
      DART cookie enables it to serve ads to Users based on their visit to our
      Site and other sites on the Internet. DART uses "non personally
      identifiable information" and does NOT track personal information about
      you, such as your name, email address, physical address, etc. You may opt
      out of the use of the DART cookie by visiting the Google ad and content
      network privacy policy. Disclosure We may disclose your personal
      information if we are required by law to do so or if you violate our
      terms.*/}
      <Header as="h3">Modifications</Header> We reserve the right to modify any
      portion of our site and service, including our terms and policies at any
      time, so please review it frequently. If we make material changes to this
      policy, we will notify you here that it has been updated, so that you are
      aware of what information we collect, how we use it, and under what
      circumstances, if any, we use and/or disclose it. You acknowledge and
      agree that it is your responsibility to review this website, our terms,
      and this policy periodically and to be aware of any modifications.
      Amendments are effective immediately upon posting to the website. Any use
      of the website or service by you after being notified means you accept
      these amendments.
      <Header as="h3">Updates</Header> You can review the most current version
      of the terms of service at any time on this page. We reserve the right to
      update, change or replace any part of these terms of service by posting
      updates and/or changes to our website. It is your responsibility to check
      this page periodically for changes.
      <br /> Your continued use of or access to the website following the
      posting of any changes constitutes acceptance of those changes.
      <br />
      <br />
      Updated July 5, 2020.
      <br />
      <br />
      <Header as="h3">CONTACT</Header>
      If you have any questions, please contact us at filterlabstore@gmail.com.
      <Spacer space={20} />
    </div>
  );

  render() {
    return (
      <Page
        header={""}
        loading={false}
        loadingMessage={""}
        body={this.build()}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}
export default compose(withRouter, connect(mapStateToProps, null))(Privacy);
