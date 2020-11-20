import React, { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("response", response.data);
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    console.log("handleFilterChange", filter);
    setFilter(filter);
  };

  const countriesToShow = countries.filter(
    (country) => filter === "" || country.name.includes(filter)
  );

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>

      {/* show too many */}
      {countriesToShow.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {/* countries name */}
      {countriesToShow.length < 10 &&
        countriesToShow.length > 1 &&
        countriesToShow.map((country) => (
          <p key={country.name}>{country.name}</p>
        ))}

      {/* country info */}
      {countriesToShow.length === 1 && <Country country={countriesToShow[0]} />}
    </div>
  );
};

export default App;
