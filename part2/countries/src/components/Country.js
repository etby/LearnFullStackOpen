import React from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>populaton {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="200px" alt="flag" />
    </div>
  );
};

export default Country;
