// src/components/SidebarContent/SidebarContent.jsx
import React from "react";
import styles from "./SidebarContent.module.css";
import qrCode from "./Code.png";

const SidebarContent = () => (
  <div className={styles.sidebar}>
    <img src={qrCode} alt="QR Code" className={styles.qrCode} />
    <p>Please consider making a donation!</p>
    <p>
      This project has been made open to all and managed by volunteers. If you
      would like to support the project, please consider making a donation. Even
      an amount as small as ₹10 to ₹20 can help us cover our costs. Thank you!
    </p>
  </div>
);

export default SidebarContent;
