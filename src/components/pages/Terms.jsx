import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Page from "../ui/Page";
import Spacer from "../ui/Spacer";
import { Header } from "semantic-ui-react";

class Terms extends React.Component {
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
      <Header as="h1">Terms and Conditions</Header>
      <Spacer space={20} />
      This website is operated by Filterlab. Throughout the site, you may see
      the terms “we”, “us” and “our”, that refer to Filterab. We offers this
      website, including all information, tools, and products available from
      this site to you, the user, conditioned upon your acceptance of all terms,
      conditions, policies and notices stated here.
      <Header as="h3">Refund Policy</Header> Due to the digital nature of our
      products, we cannot issue a refund once the files have been downloaded.
      Nothing herein grants an obligation by Filterlab to issue a refund. We
      stand behind our products and with our customers! These presets are the
      product of our work and dedication, and we want you to be
      satisfied with the outcome! If, by any means, the outcome is not what you
      expected, please reach out to us and we will help you finding a solution
      so you can achieve the results you were aiming for. Please feel free to
      get in touch with us at filterlabstore@gmail.com with any questions or
      concerns and we'll be glad to help!{" "}
      <Header as="h3">Shipping Policy</Header>Due to the digital nature of our
      products, all orders are instantly available for download as soon as we
      process your payment.
      <Header as="h4">I. GENERAL CONDITIONS</Header> We reserve the right to
      refuse service to anyone for any reason at any time. You understand that
      your content (not including credit card information), may be transferred
      unencrypted and involve (a) transmissions over various networks; and (b)
      changes to conform and adapt to technical requirements of connecting
      networks or devices. Credit card information is always encrypted during
      transfer over networks.{" "}
      <Header as="h4">
        II. ACCURACY, COMPLETENESS, & TIMELINESS OF INFORMATION
      </Header>{" "}
      We are not responsible if information made available on this site is not
      accurate, complete or current. The material on this site is provided for
      general information only and should not be relied upon or used as the sole
      basis for making decisions without consulting primary, more accurate, more
      complete or more timely sources of information. Any reliance on the
      material on this site is at your own risk. We reserve the right to modify
      the contents of this site at any time, but we have no obligation to update
      any information on our site. You agree that it is your responsibility to
      monitor changes to our site.{" "}
      <Header as="h4">III. MODIFICATIONS TO THE PRODUCT & PRICES</Header>
      Prices for our products are subject to change without notice. We reserve
      the right at any time to modify or discontinue the product (or any part or
      content thereof) without notice at any time. We shall not be liable to you
      or to any third-party for any modification, price change, suspension or
      discontinuance of the product.{" "}
      <Header as="h4">IV. PRODUCTS OR SERVICES</Header> Our products are
      exclusively available online through the website. These products or
      services may have limited quantities and are not subject to return or
      exchange according to our return policy. We have made every effort to
      display as accurately as possible the colors and images of our products
      that appear in the shop. We cannot guarantee that your computer monitor's
      display of any color will be accurate. We do not warrant that the quality
      of any products, services, information, or other material purchased or
      obtained by you will meet your expectations, or that any errors in the
      service will be corrected, but we surely tried our best to provide you the
      best quality products and service.{" "}
      <Header as="h4">V. PERSONAL INFORMATION</Header> Your submission of
      personal information through the shop is governed by our privacy policy.
      <Header as="h4">VI. CHANGES TO TERMS OF SERVICE</Header> You can review
      the most current version of the Terms of service at any time at this page.
      We reserve the right, at our sole discretion, to update, change or replace
      any part of these terms of service by posting updates and changes to our
      website. It is your responsibility to check our website periodically for
      changes. Your continued use of or access to our website or the service
      following the posting of any changes to these terms of service constitutes
      acceptance of those changes.{" "}
      <Header as="h4">VII. CONTACT INFORMATION</Header> Questions about the
      terms of service should be sent to us via email at
      filterlabstore@gmail.com. <Header as="h4">CREDIT & COURTESY</Header> If
      you find something inspiring on this website that you’d like to repost,
      please credit and link back to Filterlab (www.filterlab.store). All
      content found on this site must be credited and linked to the original
      post, page, or listing. We work very hard to keep providing you the best
      quality product, so please give credit where credit is due. Thank you!
      <Header as="h4">MODIFICATIONS</Header> We reserve the right to modify any
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
      <Header as="h4">UPDATES</Header>You can review the most current version of
      the terms of service at any time on this page. We reserve the right to
      update, change or replace any part of these terms of service by posting
      updates and/or changes to our website. It is your responsibility to check
      this page periodically for changes. Your continued use of or access to the
      website following the posting of any changes constitutes acceptance of
      those changes.
      <br />
      <br />
      Updated July 3, 2020.
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

export default compose(withRouter, connect(mapStateToProps, null))(Terms);
