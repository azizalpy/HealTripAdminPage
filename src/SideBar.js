import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import React, { useState } from "react";
import "./SideBar.css";
import HealingIcon from "@mui/icons-material/Healing";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Treatments } from "./Treatments";

export const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTreatment, setShowTreatment] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [showHospital, setShowHospital] = useState(false);
  const [showDoctor, setShowDoctor] = useState(false);
  const [showPatient, setShowPatient] = useState(false);

  const handleMenuItemClick = (itemName) => {
    if(itemName === "Treatments"){
      setShowTreatment(true)
      setShowDepartment(false)
      setShowHospital(false)
      setShowDoctor(false)
      setShowPatient(false)
    }

    if(itemName === "Deparments"){
      setShowTreatment(false)
      setShowDepartment(true)
      setShowHospital(false)  
      setShowDoctor(false)
      setShowPatient(false)
    }
    if(itemName === "Hospitals"){
      setShowTreatment(false)
      setShowDepartment(false)
      setShowHospital(true)
      setShowDoctor(false)
      setShowPatient(false)
    }
    if(itemName === "Doctors"){
      setShowTreatment(false)
      setShowDepartment(false)
      setShowHospital(false)
      setShowDoctor(true)
      setShowPatient(false)
    }if(itemName === "Patients"){
      setShowTreatment(false)
      setShowDepartment(false)
      setShowHospital(false)
      setShowDoctor(false)
      setShowPatient(true)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    const arrowIcon = document.getElementById("arrow-icon");
    if (arrowIcon) {
      arrowIcon.style.display = sidebarOpen ? "block" : "none";
    }
  };

  return (
    <>
      {sidebarOpen && (
        <Sidebar
          backgroundColor="#3c879e"
          style={{ position: "fixed", height: "100%" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "190px",
            }}
          >
            <HealingIcon
              aria-label="logo"
              edge="start"
              style={{
                color: "#fff",
                paddingLeft: "20px",
                paddingRight: "10px",
              }}
            />

            <h2 style={{ color: "#fff", fontWeight: "bold" }}>HealTrip</h2>
            <CloseIcon
              style={{ color: "#fff", cursor: "pointer", marginLeft: "50px" }}
              onClick={toggleSidebar}
            />
          </div>

          <Menu>
            <MenuItem
              className="custom-menu-item"
              onClick={() => handleMenuItemClick("Treatments")}
            >
              Treatments
            </MenuItem>
            <MenuItem
              className="custom-menu-item"
              onClick={() => handleMenuItemClick("Departments")}
            >
              Departments
            </MenuItem>
            <MenuItem
              className="custom-menu-item"
              onClick={() => handleMenuItemClick("Hospitals")}
            >
              Hospitals
            </MenuItem>
            <MenuItem
              className="custom-menu-item"
              onClick={() => handleMenuItemClick("Doctors")}
            >
              Doctors
            </MenuItem>
            <MenuItem
              className="custom-menu-item"
              onClick={() => handleMenuItemClick("Patients")}
            >
              Patients
            </MenuItem>
          </Menu>
        </Sidebar>
      )}

      <div>
        <div>
          <ArrowForwardIosIcon
            onClick={toggleSidebar}
            style={{
              cursor: "pointer",
              width:"30px",
              height:"30px",
              color: "#3c879e"
            }}
          />
        </div>
      </div>
    </>
  );
};
