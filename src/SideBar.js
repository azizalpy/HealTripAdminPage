import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import React, { useState } from "react";
import "./SideBar.css";
import HealingIcon from "@mui/icons-material/Healing";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <Sidebar style={{ position: "fixed" }}>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "190px",
            }}
          >
            <IconButton
              edge="start"
              style={{ color: "#295d6d", padding: "0", margin: "0" }}
              aria-label="logo"
            >
              <HealingIcon />
            </IconButton>
            <h2 style={{ color: "#295d6d", fontWeight: "bold" }}>HealTrip</h2>
            <IconButton className="close-icon" onClick={toggleSidebar}>
              <CloseIcon />
            </IconButton>
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
