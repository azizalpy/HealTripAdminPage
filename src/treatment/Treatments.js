import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustomPagination } from "./CustomPagination";
import ImageComponentFromBase64 from "../ImageComponentFromBase64";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";


export const Treatments = () => {
  const paperStyle = {
    padding: 20,
    height: "480px",
    width: 400,
    margin: "20px auto",
  };
  const btnstyle = { margin: "30px 0", backgroundColor: "#265867" };

  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [treatmentsPerPage] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [departments, setDepartments] = useState([]);


  useEffect(() => {
    fetchTreatments();
  }, []);

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

  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
  
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    e.preventDefault();
  
    const treatmentName = e.target.elements.treatmentName.value;
  
    console.log("Treatment Name:", treatmentName);
  
    axios
      .post("https://healtrip.azurewebsites.net/retreat/add", {
        treatmentName,
      }, {headers})
      .then(() => {
        fetchTreatments();
        Swal.fire("Successfully!", "Treatment added successfully.", "success");
      })
      .catch((error) => {
        console.error("An error occurred while attempting to delete the section.", error);
        Swal.fire("Error!", "An error occurred while attempting to delete the section.", "error");
      });
  
    e.target.reset();
    setShowPopup(false);
  };
  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this treatment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .delete(`https://healtrip.azurewebsites.net/retreat/delete/${id}`, { headers })
          .then(() => {
            fetchTreatments();
            Swal.fire("Deleted!", "Deleted Successfully.", "success");
          })
          .catch((error) => {
            console.error("An error occurred while attempting to delete the section.", error);
            Swal.fire("An error occurred while attempting to delete the section.", error);
          });
      }
    });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios.get("https://healtrip.azurewebsites.net/department/getAll")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  };

  const handleAddButtonClick = () => {
    setShowPopup(true);
    setTreatments([]);
  };

  const indexOfLastTreatment = currentPage * treatmentsPerPage;
  const indexOfFirstTreatment = indexOfLastTreatment - treatmentsPerPage;
  const currentTreatments = treatments.slice(
    indexOfFirstTreatment,
    indexOfLastTreatment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Grid>
      <Button
        style={{
          marginLeft: "65%",
          width: "155px",
          backgroundColor: "#265867",
          color: "#fff",
        }}
        onClick={handleAddButtonClick}
      >
        Add Treatment
      </Button>
    <div className="container mt-5">
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
                  justifyContent: "space-between", 
                  width: "80%",
                  padding: "10px",
                  paddingRight: "100px",
                  marginTop:"20px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ImageComponentFromBase64 base64String={treatment.image.image} />
                  <span style={{ paddingLeft: "40px" }}>{treatment.retreat_name}</span>
                </div>
                <div style={{paddingLeft:"20px"}}>
                  <EditIcon style={{ cursor: "pointer", color: "#265867", marginRight: "10px" }} />
                  <DeleteIcon style={{ cursor: "pointer", color: "#d33" }} onClick={() => handleDelete(treatment.id)} />
                </div>
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

    {showPopup && (
        <div className="popup-login">
          <form onSubmit={handleSubmit}>
            <Paper elevation={10} style={paperStyle}>
              <Grid container direction="column" alignItems="center">
                <h2 style={{ color: "#265867" }}>Add Treatment</h2>
                <TextField
                  name="treatmentName"
                  label="Treatment Name"
                  placeholder="Enter Treatment Name"
                  fullWidth
                  required
                  style={{ marginTop: "10px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <TextField
                  name="treatmentDescription"
                  label="Treatment Description"
                  placeholder="Enter Treatment Description"
                  fullWidth
                  required
                  style={{ marginTop: "20px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <FormControl fullWidth required style={{ marginTop: "20px" }}>
                  <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedOption}
                    onChange={(event) => setSelectedOption(event.target.value)}
                  >
                    {departments.map((department) => (
                      <MenuItem value={department.departmentName}>{department.departmentName}</MenuItem>))
                      
                      
                    }

                  </Select>
                </FormControl>
                
               
                <input
                  accept="image/*"
                  style={{ display: "none"}}
                  id="raised-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" color="primary" component="span" style={{ marginTop: "50px" }}>
                    Upload Image
                  </Button>
                </label>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                >
                  Add
                </Button>
              </Grid>
            </Paper>
          </form>
        </div>)}
    </Grid>
  );
};
