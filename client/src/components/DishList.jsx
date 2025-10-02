import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { Box, CircularProgress } from "@mui/material";

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dishes").then((res) => {
      // Add ID field for DataGrid
      const withId = res.data.map((dish, index) => ({ id: index, ...dish }));
      setDishes(withId);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  const columns = [
    {
      field: "name",
      headerName: "Dish Name",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/dish/${params.row.id}`} style={{ color: "#1976d2", textDecoration: "none" }}>
          {params.value}
        </Link>
      ),
    },
    { field: "diet", headerName: "Diet", flex: 0.5 },
    { field: "prep_time", headerName: "Prep Time (mins)", type: "number", flex: 0.5 },
    { field: "cook_time", headerName: "Cook Time (mins)", type: "number", flex: 0.5 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "region", headerName: "Region", flex: 0.5 },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", mt: 2 }}>
      <DataGrid
        rows={dishes}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        disableSelectionOnClick
      />
    </Box>
  );
};

export default DishList;
