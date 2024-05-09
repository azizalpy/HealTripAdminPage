import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustomPagination } from "./treatment/CustomPagination";
import ImageComponentFromBase64 from "./ImageComponentFromBase64";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";


export const Doctors = () => {
  const paperStyle = {
    padding: 20,
    height: "480px",
    width: 400,
    margin: "20px auto",
  };
  const btnstyle = { margin: "30px 0", backgroundColor: "#265867" };

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [treatmentsPerPage] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [image, setImage] = useState("");
  const [selectedHospitalId, setSelectedHospitalId] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    const reader = new FileReader(); 
  
    reader.onload = () => {
      const base64Image = reader.result; 
      setImage(base64Image);
    };
  
    reader.readAsDataURL(file);
  };
  

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://healtrip.azurewebsites.net/doctor/getAll"
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const experienceYear = e.target.elements.experienceYear.value;
      const doctorName = e.target.elements.doctorName.value;
      const base64Image = image.split(",")[1];
      const desc = e.target.elements.desc.value;
  
      await axios.post(
        "https://healtrip.azurewebsites.net/doctor/add",
        {
          experience_year: experienceYear,
          doctorName: doctorName,
          doctorImage: base64Image,
          hospital_id: selectedHospitalId,
          department_id: selectedDepartmentId,
          description: desc
        },
        { headers }
      );
  
      fetchDoctors();
      Swal.fire("Successfully!", "Doctor added successfully.", "success");
    } catch (error) {
      console.error("An error occurred while attempting to add the doctor.", error);
      Swal.fire("Error!", "An error occurred while attempting to add the doctor.", "error");
    } finally {
      e.target.reset();
      setShowPopup(false);
    }
  };
  
  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this doctor?",
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
          .delete(`https://healtrip.azurewebsites.net/doctor/delete/${id}`, { headers })
          .then(() => {
            fetchDoctors();
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

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = () => {
    axios.get("https://healtrip.azurewebsites.net/hospital/getAll")
      .then((response) => {
        setHospitals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hospitals:", error);
      });
  };

  const handleAddButtonClick = () => {
    setShowPopup(true);
    setDoctors([]);
  };

  const indexOfLastTreatment = currentPage * treatmentsPerPage;
  const indexOfFirstTreatment = indexOfLastTreatment - treatmentsPerPage;
  const currentTreatments = doctors.slice(
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
        Add Doctor
      </Button>
    <div className="container mt-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {currentTreatments.map((doctor) => (
              <li
                key={doctor.id}
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
                  <ImageComponentFromBase64 base64String={doctor.doctorImage} />
                  <span style={{ paddingLeft: "40px" }}>{doctor.doctorName}</span>
                </div>
                <div style={{paddingLeft:"20px"}}>
                  <EditIcon style={{ cursor: "pointer", color: "#265867", marginRight: "10px" }} />
                  <DeleteIcon style={{ cursor: "pointer", color: "#d33" }} onClick={() => handleDelete(doctor.id)} />
                </div>
              </li>
            ))}
          </ul>
          <CustomPagination
            treatmentsPerPage={treatmentsPerPage}
            totalTreatments={doctors.length}
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
                <h2 style={{ color: "#265867" }}>Add Doctor</h2>
                <TextField
                  name="doctorName"
                  label="Doctor Name"
                  placeholder="Enter Doctor Name"
                  fullWidth
                  required
                  style={{ marginTop: "10px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <TextField
                  name="experienceYear"
                  label="Doctor Experience"
                  placeholder="Enter Doctor Experience"
                  fullWidth
                  
                  style={{ marginTop: "10px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <TextField
                  name="desc"
                  label="Doctor Description"
                  placeholder="Enter Doctor Description"
                  fullWidth
                  required
                  style={{ marginTop: "20px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                /> 
                <FormControl fullWidth required style={{ marginTop: "20px" }}>
                  <InputLabel id="demo-simple-select-label">Select Hospital</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedHospitalId}
                    onChange={(event) => setSelectedHospitalId(event.target.value)}
                  >
                    {hospitals.map((hospital) => (
                      <MenuItem value={hospital.id}>{hospital.hospitalName}</MenuItem>))
                    }
                  </Select>
                </FormControl>
                <FormControl fullWidth required style={{ marginTop: "20px" }}>
                  <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedDepartmentId}
                    onChange={(event) => setSelectedDepartmentId(event.target.value)}
                  >
                    {departments.map((department) => (
                      <MenuItem value={department.id}>{department.departmentName}</MenuItem>))
                    }
                  </Select>
                </FormControl>                     
                <input
                  accept="image/*"
                  style={{ display: "none"}}
                  name="image"
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleImageChange}
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
