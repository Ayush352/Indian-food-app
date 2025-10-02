import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import DishPage from "./pages/DishPage";
import SuggesterPage from "./pages/SuggesterPage";

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dish/:id" element={<DishPage />} />
      <Route path="/suggester" element={<SuggesterPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;