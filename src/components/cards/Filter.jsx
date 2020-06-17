import React from "react";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import BeforeAfterSlider from "react-before-after-slider";
import { Card, Icon, Button } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../helpers/toasts";
import { addToCart } from "../../actions/cartActions";
import "react-toastify/dist/ReactToastify.css";
const FILES_FOLDER = "../../files/images/filter";

class Filter extends React.Component {
  handleShoppingClick = (id, price, name) => {
    this.props.addToCart(id, price, name);
    handleSuccess(`Added ${name} to cart!`);
  };
  render() {
    const { filter, index, categoryId } = this.props;
    const { _id, name, price } = filter;
    const BEFORE = `${FILES_FOLDER}/${categoryId}/before/original.jpg`;
    const AFTER = `${FILES_FOLDER}/${categoryId}/after/${_id}.jpg`;
    return (
      <Fade clear delay={100 * index}>
        <div style={{ margin: 20, maxHeight: 321 }}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <BeforeAfterSlider
                before={AFTER}
                after={BEFORE}
                height={200}
                width={290}
              />
            </div>

            <Card.Content>
              <div style={{ height: 40 }}>
                <Card.Header>
                  <b>
                    <center>{name}</center>
                  </b>
                </Card.Header>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button icon color="black">
                  <Icon name="expand" />
                </Button>
                <Button
                  onClick={() => this.handleShoppingClick(_id, price, name)}
                >
                  <Icon name="shopping cart" />
                  {price}€
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
        <ToastContainer />
      </Fade>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, price, name) => {
      dispatch(addToCart(id, price, name));
    },
  };
};

export default connect(null, mapDispatchToProps)(Filter);
