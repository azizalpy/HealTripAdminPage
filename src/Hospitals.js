import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustomPagination } from "./treatment/CustomPagination";
import ImageComponentFromBase64 from "./ImageComponentFromBase64";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { Grid, Paper, TextField, Button, FormControl,
  FormGroup, FormControlLabel, Checkbox, FormLabel } from "@material-ui/core";

export const Hospitals = () => {
  const paperStyle = {
    padding: 20,
    height: "875px",
    width: 400,
    margin: "20px auto",
  };
  const btnstyle = { margin: "30px 0", backgroundColor: "#265867" };

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [treatmentsPerPage] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [image, setImage] = useState("");

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
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://healtrip.azurewebsites.net/hospital/getAll"
      );
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
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
  
      const bedCapacity = e.target.elements.bedCapacity.value;
      const hospitalName = e.target.elements.hospitalName.value;
      const country = e.target.elements.country.value;
      const city = e.target.elements.city.value;
      const addressDetail = e.target.elements.addressDetail.value;
      const contactPhone = e.target.elements.contactPhone.value;
      const base64Image = image.split(",")[1];
      const imageResponse = await axios.post(
        "https://healtrip.azurewebsites.net/image/hospital/save",
        {
          image:base64Image
        },
        { headers }
      );
      
      console.log("after image is worked")
      const imageId = imageResponse.data;
      console.log("image id", imageId);
      

      const addressResponse = await axios.post(
        "https://healtrip.azurewebsites.net/address/add",
        {
          country: country,
          city: city,
          addressDetail: addressDetail
        },
        { headers }
      );

      console.log("after address is worked")
      const addressId = addressResponse.data.id;
      console.log("address id", addressId);
  
      await axios.post(
        "https://healtrip.azurewebsites.net/hospital/add",
        {
          bed_capacity: bedCapacity,
          hospitalName: hospitalName,
          addressId: addressId,
          contactPhone: contactPhone,
          department_ids: selectedDepartmentIds,
          hospitalImageIds: [imageId]
        },
        { headers }
      );
      
      fetchHospitals();
      Swal.fire("Successfully!", "Hospital added successfully.", "success");
    } catch (error) {
      console.error("An error occurred while attempting to add the hospital.", error);
      Swal.fire("Error!", "An error occurred while attempting to add the hospital.", "error");
    } finally {
      e.target.reset();
      setShowPopup(false);
    }
  };
  
  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this hospital?",
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
          .delete(`https://healtrip.azurewebsites.net/hospital/delete/${id}`, { headers })
          .then(() => {
            fetchHospitals();
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
    setHospitals([]);
  };

  const indexOfLastTreatment = currentPage * treatmentsPerPage;
  const indexOfFirstTreatment = indexOfLastTreatment - treatmentsPerPage;
  const currentTreatments = hospitals.slice(
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
        Add Hospital
      </Button>
      <div className="container mt-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ul className="list-group mb-4">
              {currentTreatments.map((hospital) => (
                <li
                  key={hospital.id}
                  className="list-group-item"
                  style={{
                    border: "1px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "80%",
                    padding: "10px",
                    paddingRight: "100px",
                    marginTop: "20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ImageComponentFromBase64
                      base64String={hospital.hospitalImages[0].image}
                    />
                    <span style={{ paddingLeft: "40px" }}>
                      {hospital.hospitalName}
                    </span>
                  </div>
                  <div style={{ paddingLeft: "20px" }}>
                    <EditIcon
                      style={{
                        cursor: "pointer",
                        color: "#265867",
                        marginRight: "10px",
                      }}
                    />
                    <DeleteIcon
                      style={{ cursor: "pointer", color: "#d33" }}
                      onClick={() => handleDelete(hospital.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <CustomPagination
              treatmentsPerPage={treatmentsPerPage}
              totalTreatments={hospitals.length}
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
                <h2 style={{ color: "#265867" }}>Add Hospital</h2>
                <TextField
                  name="hospitalName"
                  label="Hospital Name"
                  placeholder="Enter Hospital Name"
                  fullWidth
                  required
                  style={{ marginTop: "10px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <TextField
                  name="country"
                  label="Country"
                  placeholder="Enter Country"
                  fullWidth
                  required
                  style={{ marginTop: "10px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <TextField
                  name="city"
                  label="City"
                  placeholder="Enter City"
                  fullWidth
                  required
                  style={{ marginTop: "10px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <TextField
                  name="addressDetail"
                  label="Address Detail"
                  placeholder="Enter Address Detail"
                  fullWidth
                  required
                  style={{ marginTop: "10px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <TextField
                  name="contactPhone"
                  label="Contact Phone"
                  placeholder="Enter Contact Phone"
                  fullWidth
                  required
                  style={{ marginTop: "20px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <TextField
                  name="bedCapacity"
                  label="Bed Capacity"
                  placeholder="Enter Bed Capacity"
                  fullWidth
                  required
                  style={{ marginTop: "20px" }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <FormControl
                  component="fieldset"
                  style={{ marginTop: "20px", width: "100%" }}
                >
                  <FormLabel component="legend">Select Departments</FormLabel>
                  <FormGroup>
                    {departments.map((department) => (
                      <FormControlLabel
                        key={department.id}
                        control={
                          <Checkbox
                            checked={selectedDepartmentIds.includes(
                              department.id
                            )}
                            onChange={(event) => {
                              const departmentId = department.id;
                              setSelectedDepartmentIds((prevIds) => {
                                if (event.target.checked) {
                                  return [...prevIds, departmentId];
                                } else {
                                  return prevIds.filter(
                                    (id) => id !== departmentId
                                  );
                                }
                              });
                            }}
                            name={department.departmentName}
                          />
                        }
                        label={department.departmentName}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  name="image"
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{ marginTop: "50px" }}
                  >
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
        </div>
      )}
    </Grid>
  );
};
