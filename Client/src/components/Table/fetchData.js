// src/components/Table/fetchData.js
import axios from "axios";
import Papa from "papaparse";

export const fetchData = async () => {
  console.log("parsing data...");
  const url =
    "https://docs.google.com/spreadsheets/d/1SDw-uxPvT6ADKr0KlgMpkjGFPiikF11N6ulp9ZqQg-Q/export?format=csv";
  const response = await axios.get(url);
  const parsedData = Papa.parse(response.data, { header: true });
  return parsedData.data;
};
