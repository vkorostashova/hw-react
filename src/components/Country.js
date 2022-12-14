import React from "react";

function Country({country, countryTitle, updateCountryState}) {
  return <tr
      onClick={() => updateCountryState(country.name, !country.active)}
      title={countryTitle}
      className={country.active ? 'bg-warning' : ''}
  >
    <td>{country.name}</td>
    <td>{country.capital}</td>
    <td>{country.population}</td>
    <td>{country.area}</td>
    <td>{country.region}</td>
  </tr>
}

export default Country;