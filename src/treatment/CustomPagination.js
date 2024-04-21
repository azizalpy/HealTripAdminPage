import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const CustomPagination = ({ treatmentsPerPage, totalTreatments, paginate, currentPage }) => {
  const pageCount = Math.ceil(totalTreatments / treatmentsPerPage);

  const handleChange = (event, value) => {
    paginate(value);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" style={{marginBottom:"15px"}}>
      <Pagination count={pageCount} page={currentPage} onChange={handleChange} color="primary" />
    </Stack>
  );
};
