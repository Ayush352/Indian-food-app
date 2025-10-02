import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      const res = await api.get(`/dishes?name=${value}`);
      setResults(res.data);
    }
  };

  return (
    <header>
      <input type="text" value={query} onChange={handleSearch} placeholder="Search dishes..." />
      {results.length > 0 && (
        <ul>
          {results.map((dish, idx) => (
            <li key={idx} onClick={() => navigate(`/dish/${idx}`)}>
              {dish.name}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
