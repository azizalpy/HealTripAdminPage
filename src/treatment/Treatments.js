import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustomPagination } from "./CustomPagination";
import ImageComponentFromBase64 from "../ImageComponentFromBase64";

export const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [treatmentsPerPage] = useState(5);

  useEffect(() => {
    const fetchTreatments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://healtrip.azurewebsites.net/retreat/getAll"
        );
        setTreatments(response.data);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
      setLoading(false);
    };

    fetchTreatments();
  }, []);

  const indexOfLastTreatment = currentPage * treatmentsPerPage;
  const indexOfFirstTreatment = indexOfLastTreatment - treatmentsPerPage;
  const currentTreatments = treatments.slice(
    indexOfFirstTreatment,
    indexOfLastTreatment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1>Treatments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {currentTreatments.map((treatment) => (
              <li
                key={treatment.id}
                className="list-group-item"
                style={{
                  border: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  width: "80%",
                  padding: "10px",
                  paddingRight: "100px"
                }}
              >
                <ImageComponentFromBase64 base64String={treatment.image.image} />
                <span style={{ paddingLeft: "20px"}}>{treatment.retreat_name}</span>
              </li>
            ))}
          </ul>
          <CustomPagination
            treatmentsPerPage={treatmentsPerPage}
            totalTreatments={treatments.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );  
};
