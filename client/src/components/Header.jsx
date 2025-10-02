import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Autocomplete, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (event, value) => {
    setQuery(value);

    if (value.length > 1) {
      try {
        const res = await api.get(`/dishes?name=${value}`);
        // Attach ID for navigation
        const withIds = res.data.map((dish, index) => ({ id: dish.id ?? index, label: dish.name }));
        setOptions(withIds);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (event, value) => {
    if (value && value.id !== undefined) {
      navigate(`/dish/${value.id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2", mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
  <Typography variant="h6" sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/home")}> 
          🍛 Indian Food Explorer
        </Typography>

        {/* Search Bar */}
        <Box sx={{ width: 350, backgroundColor: "white", borderRadius: 2, px: 1 }}>
          <Autocomplete
            freeSolo
            options={options}
            onInputChange={handleSearch}
            onChange={handleSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search by dish"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} />,
                }}
              />
            )}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
