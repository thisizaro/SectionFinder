import React from "react";
import styles from "./ApplyHere.module.css";

const ApplyHere = () => {
  return (
    <div className={styles.container}>
      <h1>Apply Here</h1>
      <p>Please fill out the form by clicking the button below:</p>
      <a
        href="https://forms.gle/BEe9XyJXc5hDRRX98"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        Open Form
      </a>
    </div>
  );
};

export default ApplyHere;
