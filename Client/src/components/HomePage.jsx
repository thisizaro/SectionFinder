import React from "react";
import "../styles/App.css";
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Table from "./Table";
import ApplicantTable from "./Table/ApplicantTable";

function HomePage() {
  return (
    <div className="App">
      <h1>Applicants</h1>
      <ApplicantTable></ApplicantTable>
      {/* <h1>Semester 3 Section 2024</h1> */}
      {/* <Table></Table> */}
    </div>
  );
}

export default HomePage;
