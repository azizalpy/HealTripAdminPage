import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import React, { useState } from "react";
import "./SideBar.css";
import HealingIcon from "@mui/icons-material/Healing";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        <Sidebar  backgroundColor="#3c879e" style={{ position: "fixed", height:"100%"}}>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "190px",
            }}
          >
              <HealingIcon aria-label="logo" edge="start" style={{ color: "#fff", paddingLeft:"20px", paddingRight:"10px" }} />

            <h2 style={{ color: "#fff", fontWeight: "bold" }}>HealTrip</h2>
              <CloseIcon style={{color:"#fff", cursor: "pointer", marginLeft:"50px"}} onClick={toggleSidebar} />
          </div>

          <Menu>
            <MenuItem className="custom-menu-item">Treatments</MenuItem>
            <MenuItem className="custom-menu-item">Departments</MenuItem>
            <MenuItem className="custom-menu-item">Hospitals</MenuItem>
            <MenuItem className="custom-menu-item">Doctors</MenuItem>
            <MenuItem className="custom-menu-item">Patients</MenuItem>
          </Menu>
        </Sidebar>
      )}
      
      <div style={{ display: "flex", alignItems: "center", height: "100vh"}}>
        <div>
        <ArrowForwardIosIcon id="arrow-icon" onClick={toggleSidebar} style={{ cursor: "pointer", color:"#295d6d" }} />

        </div>
      </div>
    </>
  );
};
