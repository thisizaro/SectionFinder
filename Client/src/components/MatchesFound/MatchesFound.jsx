// src/components/MatchesFound/MatchesFound.jsx
import React, { useEffect, useState } from "react";
import { fetchData } from "./fetchData";
import styles from "./MatchesFound.module.css";
// import qrCode from "./Code.png";
import SidebarContent from "../SidebarContent/SidebarContent";

const sheetId = "1lbMjNIFn2dj93tsrXb8WSj16gRziSIjqDQo_wbk6BFU";

const MatchesFound = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(sheetId);
      setData(result);
    };

    // Fetch data initially
    getData();

    // Set up polling
    const intervalId = setInterval(getData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Person A</th>
              <th>A's Current Section</th>
              <th>Person B</th>
              <th>B's Current Section</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row["Email 1"]}</td>
                <td>{row["Section 1"]}</td>
                <td>{row["Email 2"]}</td>
                <td>{row["Section 2"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SidebarContent />
    </div>
  );
};

export default MatchesFound;
