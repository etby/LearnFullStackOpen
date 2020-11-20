import React, { useState } from "react";

const Country = ({ country, expanded }) => {
  const [content, setContent] = useState(expanded);

  const handleShowClick = (event) => {
    setContent(true);
  };

  return (
    <div>
      <h2>
        {country.name}{" "}
        {!content && <button onClick={handleShowClick}>show</button>}
      </h2>

      {/* show content */}
      {content && (
        <div>
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
      )}
    </div>
  );
};

export default Country;
