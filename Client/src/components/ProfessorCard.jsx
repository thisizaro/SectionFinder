import React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import Comments from "./Comments";
import "./../styles/ProfessorCard.css";
import data from "./data.json";

const ProfessorCard = ({ index, professor }) => {
  const { headers, rows } = data;

  return (
    <div className="CardContainer">
      <Card className="professorCard">
        <Card.Body>
          <Card.Title>Professor: {professor}</Card.Title>
          <Card.Text>Subject: {headers[index + 1]}</Card.Text>
          <Comments postId={professor} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfessorCard;
