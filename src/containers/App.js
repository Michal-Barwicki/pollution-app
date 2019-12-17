import React, { Component } from "react";
import axios from "axios";
import "./App.scss";
import SearchBox from "../components/SearchBox/SearchBox";
import CityList from "../components/CityList/CityList";

class App extends Component {
  state = {
    citiesData: []
  };
  availableCountries = ["Poland", "Germany", "Spain", "France"];

  changeCountryToCode = countryName => {
    switch (countryName) {
      case "poland":
        return "PL";
      case "germany":
        return "DE";
      case "spain":
        return "ES";
      case "france":
        return "FR";
      default:
        return false;
    }
  };

  handleSubmit = (e, inputValue) => {
    e.preventDefault();
    if (this.availableCountries.indexOf(inputValue) > -1) {
      inputValue = inputValue.toLowerCase();
      const countryCode = this.changeCountryToCode(inputValue);
      const currentDate = new Date().toISOString().substring(0, 10);
      axios
        .get(
          `https://api.openaq.org/v1/measurements?country=${countryCode}&parameter=pm25&date_from=${currentDate}&order_by=value&sort=desc&limit=80`
        )
        .then(res => {
          const citiesData = res.data.results;
          this.setState({
            citiesData
          });
        })
        .catch(err => console.log(`Something went wrong ${err.message}`));
    } else {
      return;
    }
  };

  render() {
    return (
      <div className="App">
        <SearchBox
          availableCountries={this.availableCountries}
          handleSubmit={this.handleSubmit}
        />
        <CityList citiesData={this.state.citiesData} />
      </div>
    );
  }
}

export default App;
