import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import React, { useState } from "react";
import "./SideBar.css";
import HealingIcon from "@mui/icons-material/Healing";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Treatments } from "./treatment/Treatments";
import { Row, Col, Container } from "reactstrap";
import { Departments } from "./Departments";
import { Hospitals } from "./Hospitals";
import { Doctors } from "./Doctors";
import { Patients } from "./Patients";

export const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const handleMenuItemClick = (itemName) => {
    setActiveMenuItem(itemName);
  };

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
      <Container data-aos="fade-up">
        <Row>
          <Col lg="6" data-aos="fade-right">
            <ArrowForwardIosIcon
              onClick={toggleSidebar}
              style={{
                cursor: "pointer",
                width: "30px",
                height: "30px",
                color: "#3c879e",
              }}
            />
          </Col>
          <Col
            style={{ paddingLeft: "250px" }}
            lg="6"
            className="pt-4 pt-lg-0 content"
            data-aos="fade-left"
          >
            {activeMenuItem === "Treatments" && <Treatments />}
            {activeMenuItem === "Departments" && <Departments />}
            {activeMenuItem === "Hospitals" && <Hospitals />}
            {activeMenuItem === "Doctors" && <Doctors />}
            {activeMenuItem === "Patients" && <Patients />}
          </Col>
        </Row>
      </Container>
    </>
  );
};
