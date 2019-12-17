import React, { Component } from "react";
import axios from "axios";
// import "./CityItem.scss";

class CityItem extends Component {
  state = {
    cityDescription: "",
    visibleDescription: false
  };
  handleClick = () => {
    this.toggleVisible();
    this.getDescription();
  };

  toggleVisible = () => {
    this.setState({ visibleDescription: !this.state.visibleDescription });
  };

  getDescription = () => {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&generator=search&gsrnamespace=0&gsrlimit=1&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${this.props.city}`
      )
      .then(res => {
        const page = res.data.query.pages;
        const pageId = Object.keys(page)[0];
        const pageDescription = page[pageId].extract;
        const purePageDescription = pageDescription.replace("(listen)", "");
        this.setState({
          cityDescription: purePageDescription
        });
      })
      .catch(err => console.log(`Something went wrong ${err.message}`));
  };
  componentWillReceiveProps() {
    this.setState({
      visibleDescription: false,
      cityDescription: ""
    });
  }
  render() {
    const { index, city, value, parameter } = this.props;
    const { cityDescription, visibleDescription } = this.state;
    return (
      <>
        <div className="city-item" onClick={this.handleClick}>
          <div>
            <span className="city-item__name">
              {index + 1}. {city}:
            </span>
            <span className="city-item__value">
              {value.toFixed(1)} {parameter}
            </span>
          </div>
        </div>
        <div className="city-item__description">
          {visibleDescription && cityDescription}
        </div>
      </>
    );
  }
}
export default CityItem;
