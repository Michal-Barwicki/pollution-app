import React, { Component } from "react";
// import "./SearchBox.scss";
export class SearchBox extends Component {
  state = {
    filteredCountries: [],
    showOptions: false,
    inputValue: ""
  };

  componentWillMount() {
    localStorage.getItem("inputValue") &&
      this.setState({
        inputValue: localStorage.getItem("inputValue")
      });
  }

  handleChange = e => {
    const { availableCountries } = this.props;
    const inputValue = e.currentTarget.value;
    const filteredCountries = availableCountries.filter(
      country => country.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
    this.setState({
      filteredCountries,
      showOptions: true,
      inputValue
    });
  };

  handleClick = e => {
    this.setState({
      filteredCountries: [],
      showOptions: false,
      inputValue: e.currentTarget.innerText
    });
  };

  handleEnterKey = e => {
    const { filteredCountries } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        showOptions: false,
        inputValue: filteredCountries[0]
      });
    }
  };

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("inputValue", nextState.inputValue);
  }

  render() {
    const { filteredCountries, showOptions, inputValue } = this.state;
    let optionList;
    if (showOptions && inputValue) {
      if (filteredCountries.length) {
        optionList = (
          <ul className="search-box__ul">
            {filteredCountries.map((country, index) => {
              return (
                <li
                  className="search-box__options"
                  key={country}
                  onClick={this.handleClick}
                >
                  {country}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="search-box__ul">
            <em>Country is not available!</em>
          </div>
        );
      }
    }
    return (
      <form className="search-box">
        <input
          type="text"
          placeholder="Country name"
          className="search-box__input"
          onChange={this.handleChange}
          onKeyDown={this.handleEnterKey}
          value={inputValue}
        />
        <button
          type="submit"
          value=""
          className="search-box__btn"
          onClick={e => this.props.handleSubmit(e, inputValue)}
        >
          <i className="fas fa-search"></i>
        </button>
        {optionList}
      </form>
    );
  }
}
export default SearchBox;
