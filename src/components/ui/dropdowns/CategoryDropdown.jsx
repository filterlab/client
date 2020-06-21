import React from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import { Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class CategoryDropdown extends React.Component {
  state = { categories: "" };

  async componentDidMount() {
    const categoryId = this.props.categoryId;

    await strapi
      .request("POST", "/graphql", {
        data: {
          query: `query {
            categories(where: { id_ne: "${categoryId}" }) {
              _id
              name
            }
          }`,
        },
      })
      .then((res) => this.setState({ categories: res.data.categories }))
      .catch((err) => console.log(err));
  }
  buildEntries = (categories) =>
    categories &&
    categories.map((cat) => (
      <Dropdown.Item
        onClick={() => this.props.history.push(`/category/${cat._id}`)}
        text={cat.name}
      />
    ));

  render() {
    const categories = this.state.categories;
    return (
      <div style={{ width: 290 }}>
        <Dropdown placeholder="Looking for another category?" fluid selection>
          <Dropdown.Menu>{this.buildEntries(categories)}</Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
export default withRouter(CategoryDropdown);
