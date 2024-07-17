import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Applicants
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/cse-sections">
                  Sections
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/matches-found">
                  Matches Found
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/apply">
                  Apply Here
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <p style={{ textAlign: "left" }}>
        If you are on desktop, you can press <kbd>Ctrl</kbd> + <kbd>F</kbd> and
        search for your entry!
      </p>
    </>
  );
}

export default NavBar;
