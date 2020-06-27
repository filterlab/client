import React from "react";
import Pulse from "react-reveal/Pulse";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import BeforeAfterSlider from "react-before-after-slider";
import { Card, Icon, Button } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../helpers/toasts";
import { addToCart } from "../../actions/cartActions";
import "react-toastify/dist/ReactToastify.css";
import Strapi from "strapi-sdk-javascript/build/main";
import FilterButton from "../ui/buttons/FilterButton";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const FILES_FOLDER = "../../files/images/filter";
class Filter extends React.Component {
  state = {
    expand: false,
    bought: false,
    download: "",
  };

  async componentDidMount() {
    // eslint-disable-next-line
    await strapi
      .request("POST", "/graphql", {
        data: {
          query: `query {
                filter(id:"${this.props.filter._id}") {
                    download
                    price
                    free
                  }
                }`,
        },
      })
      .then((res) => {
        this.setState({
          download: res.data.filter.download,
          price: res.data.filter.price,
          free: res.data.filter.free,
        });
      });
    // eslint-disable-next-line
    this.props.filters.map((filter) => {
      if (filter.id === this.props.filter._id) {
        this.setState({ bought: true });
      }
    });
  }

  async componentDidUpdate() {
    // eslint-disable-next-line
    await strapi
      .request("POST", "/graphql", {
        data: {
          query: `query {
                filter(id:"${this.props.filter._id}") {
                    download
                    price
                  }
                }`,
        },
      })
      .then((res) => {
        this.setState({
          download: res.data.filter.download,
          price: res.data.filter.price,
        });
      });
    // eslint-disable-next-line
    this.props.filters.map((filter) => {
      if (filter.id === this.props.filter._id) {
        this.setState({ bought: true });
      }
    });
  }

  handleShoppingClick = (id, price, name) => {
    this.props.addToCart(id, price, name);
    handleSuccess(`Added ${name} to cart!`);
  };

  render() {
    const { filter, index, categoryId, onOpenModal } = this.props;
    const { _id, name, price } = filter;
    const BEFORE = `${FILES_FOLDER}/${categoryId}/before/original.jpg`;
    const AFTER = `${FILES_FOLDER}/${categoryId}/after/${_id}.jpg`;
    return (
      <Fade clear delay={100 * index}>
        <div style={{ margin: 20, maxHeight: 421 }}>
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
                height={300}
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
                <span
                  onMouseEnter={() => this.setState({ expand: true })}
                  onMouseLeave={() => this.setState({ expand: false })}
                >
                  <Pulse left spy={this.state.expand}>
                    <Button
                      onClick={() => onOpenModal(filter)}
                      icon
                      color="black"
                    >
                      <Icon name="expand" />
                    </Button>
                  </Pulse>
                </span>
                <FilterButton
                  filter={this.props.filter}
                  price={this.state.price}
                  free={this.state.free}
                  isBought={this.state.bought}
                  isAuthed={this.props.isAuthed}
                  download={this.state.download}
                  buy={() => this.handleShoppingClick(_id, price, name)}
                />
              </div>
            </Card.Content>
          </Card>
        </div>
        <ToastContainer />
      </Fade>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.auth.filters,
    isAuthed: state.auth.key,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, price, name) => {
      dispatch(addToCart(id, price, name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
