import React from "react";
import LogoutButton from "../Logout/LogoutButton";
import "./HomePage.css";
import DynamicMapViewer from "../DynamicMapViewer/DynamicMapViewer";

function HomePage() {
  return (
    <>
      <div className="homepage-container">
        <LogoutButton />
        <DynamicMapViewer />
      </div>
    </>
  );
}

export default HomePage;
