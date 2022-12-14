import React, {useEffect, useState} from "react";
import Country from "./Country";
import {Table} from 'react-bootstrap';
import Search from './Search';

function Countries() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v2/all').then(res => res.json()).then(data => {
      setCountries(data.map(country => ({
        alpha3Code: country.alpha3Code,
        name: country.name,
        capital: country.capital || '---',
        population: country.population || 0,
        area: country.area || 0,
        region: country.region,
        active: false
      })));
    });
  }, [])

  function updateCountryState(countryName, activeState) {
    let result = [];
    for(let country of countries) {
      if(country.name === countryName) {
        country.active = activeState;
      }
      result.push(country);
    }
    setCountries(result);
  }

  function searchByCountryName(value) {
    setSearchValue(value);
    const result = countries.filter(country => country.name.toLowerCase().includes(value));
    setFilteredCountries(result);
  }

  return <div>
    <Search searchByCountryName={searchByCountryName} />

    <Table striped bordered hover>
      <thead>
      <tr><th>Name</th><th>Capital</th><th>Population</th><th>Area</th><th>Region</th></tr>
      </thead>
      <tbody>
      { (searchValue.length ? filteredCountries : countries).map(country => <Country
          updateCountryState={updateCountryState}
          country={country} countryTitle={country.name}
          key={country.alpha3Code} />) }
      </tbody>
    </Table>
  </div>
}

export default Countries;