// src/components/Table/Table.js
import React, { useEffect, useState } from "react";
import { fetchData } from "./fetchData.js";
import styles from "./Table.module.css";
import SidebarContent from "../SidebarContent/SidebarContent";

const POLLING_INTERVAL = 5000;

function ApplicantTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };

    // Fetch data initially
    getData();

    // Set up polling
    const intervalId = setInterval(getData, POLLING_INTERVAL);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <h1>Applicants</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Applicant</th>
              <th>Current Section</th>
              <th>Need</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row["Email Address"]}</td>
                <td>{row["Current Section (CSE:  ___?) (1 - 48)"]}</td>
                <td>
                  {
                    row[
                      "Sections of your choice(You can choose multiple options.)"
                    ]
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <SidebarContent /> */}
    </div>
  );
}

export default ApplicantTable;
