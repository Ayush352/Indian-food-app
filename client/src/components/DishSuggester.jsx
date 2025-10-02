import React, { useState } from "react";
import api from "../utils/api";

const DishSuggester = () => {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [results, setResults] = useState([]);

  const addIngredient = () => {
    if (input && !ingredients.includes(input)) {
      setIngredients([...ingredients, input]);
      setInput("");
    }
  };

  const suggest = async () => {
    const res = await api.post("/dishes/suggest", { ingredients });
    setResults(res.data);
  };

  return (
    <div>
      <h3>Dish Suggester</h3>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter ingredient" />
      <button onClick={addIngredient}>Add</button>
      <button onClick={suggest}>Suggest Dishes</button>
      <ul>
        {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>
      <h4>Possible Dishes:</h4>
      <ul>
        {results.map((dish, i) => <li key={i}>{dish.name}</li>)}
      </ul>
    </div>
  );
};

export default DishSuggester;
