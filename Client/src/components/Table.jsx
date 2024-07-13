import React from "react";
import data from "./data.json";
import "../styles/Table.css";

function Table() {
  const { headers, rows } = data;

  // Generate header columns
  const headerColumns = headers.map((header, index) => (
    <th key={`header-${index}`}>{header}</th>
  ));

  // Handle row click
  const handleRowClick = (rowIndex) => {
    window.open(`/cse${rowIndex + 1}`, "_blank");
  };

  // Generate table rows
  const tableRows = rows.map((row, rowIndex) => (
    <tr
      key={`row-${rowIndex}`}
      onClick={() => handleRowClick(rowIndex)}
      className="clickable-row"
    >
      {row.map((cell, colIndex) => (
        <td key={`row-${rowIndex}-col-${colIndex}`}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <div className="table-container">
      <table className="table table-bordered">
        <thead>
          <tr>{headerColumns}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default Table;
