import React from "react";
import CityItem from "../CityItem/CityItem";
const CityList = props => {
  const removeDuplicates = (array, key) => {
    if (array.length !== 0) {
      let storage = {};
      let result = [];
      array.forEach(element => {
        if (!storage[element[key]]) {
          storage[element[key]] = true;
          result.push(element);
        }
      });
      return result;
    } else return props.citiesData;
  };

  const uniqueCities = removeDuplicates(props.citiesData, "city");
  uniqueCities.length = 10;
  return uniqueCities.map((city, index) => (
    <CityItem {...city} index={index} key={index} />
  ));
};

export default CityList;
