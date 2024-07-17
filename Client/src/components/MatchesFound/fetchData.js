// src/components/MatchesFound/fetchData.js
import axios from "axios";
import Papa from "papaparse";

export const fetchData = async (sheetId) => {
  const url = `https://docs.google.com/spreadsheets/d/1lbMjNIFn2dj93tsrXb8WSj16gRziSIjqDQo_wbk6BFU/export?format=csv`;
  const response = await axios.get(url);
  const parsedData = Papa.parse(response.data, { header: true });
  return parsedData.data;
};
