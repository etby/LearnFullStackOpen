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

  console.log("showList", countriesToShow);

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>

      {/* show too many */}
      {countriesToShow.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {/* countries */}
      {countriesToShow.length < 10 &&
        countriesToShow.map((country, index) => (
          <Country
            key={country.name + index}
            country={country}
            expanded={countriesToShow.length < 2}
          />
        ))}
    </div>
  );
};

export default App;
