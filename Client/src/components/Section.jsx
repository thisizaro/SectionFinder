import React from "react";
import ProfessorCard from "./ProfessorCard";
import "../styles/Section.css";

const Section = ({ data }) => {
  // const data = [
  //   "CSE1",
  //   "Dr. Prasanta Ku. Das",
  //   "Dr. Subhra Debdas",
  //   "Dr. Rajat Kumar Behera",
  //   "Prof. R. K. Khanna",
  //   "Dr. Soumya Ranjan Nayak",
  //   "Dr. Alivarani Mohapatra",
  //   "Prof. R. K. Khanna",
  //   "Dr. Rajat Kumar Behera",
  // ];
  const section = data[0];
  const professors = data.slice(1);

  return (
    <div className="section">
      <h1 className="section-title">Section: {section}</h1>
      <div className="cards">
        {professors.map((professor, index) => (
          <ProfessorCard key={index} index={index} professor={professor} />
        ))}
      </div>
    </div>
  );
};

export default Section;
