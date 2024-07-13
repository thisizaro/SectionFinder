import React from "react";
import "../styles/App.css";
import Section from "./Section";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import data from "./data.json";

function App() {
  const { headers, rows } = data;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
