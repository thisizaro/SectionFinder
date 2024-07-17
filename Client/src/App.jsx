import React from "react";
import "./App.css";
import Section from "./components/Section";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SectionsList from "./components/SectionsList";
import data from "./components/data.json";
import ApplicantTable from "./components/Table/ApplicantTable";
import NavBar from "./components/NavBar/NavBar";
import MatchesFound from "./components/MatchesFound/MatchesFound";

function App() {
  const { headers, rows } = data;

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ApplicantTable />} />
          <Route path="/cse-sections" element={<SectionsList />} />
          <Route path="/applicants" element={<ApplicantTable />} />
          <Route path="/matches-found" element={<MatchesFound />} />
          {/* Placeholder for Matches Found */}
          {rows &&
            rows.map((row, index) => (
              <Route
                key={index}
                path={`/${row[0]}`}
                element={<Section data={row} />}
              />
            ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
