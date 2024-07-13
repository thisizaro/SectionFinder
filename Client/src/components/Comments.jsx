import React, { useState, useEffect } from "react";
import "./../styles/Comments.css";
import axios from "axios";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null); // Initialize as null
  const backendUrl = "http://localhost:3001"; // Change to your backend URL

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/posts/${postId}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error(error));
    axios
      .get(`${backendUrl}/api/posts/${postId}/rating`)
      .then((response) => {
        if (response.data.averageRating === null) {
          setAverageRating(0); // Handle null case
        } else {
          setAverageRating(response.data.averageRating);
        }
      })
      .catch((error) => console.error(error));
  }, [postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${backendUrl}/api/posts/${postId}/comments`, {
        comment: newComment,
        rating: newRating,
      })
      .then((response) => {
        setComments(response.data);
        axios
          .get(`${backendUrl}/api/posts/${postId}/rating`)
          .then((response) => {
            if (response.data.averageRating === null) {
              setAverageRating(5); // Handle null case
            } else {
              setAverageRating(response.data.averageRating);
            }
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
    setNewComment("");
    setNewRating(5);
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <p>
        Average Rating:{" "}
        {averageRating !== null ? averageRating.toFixed(1) : "0.0"} / 5
      </p>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {comment.comment}
            <span className="rating">Rating: {comment.rating}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <div className="rating-input">
          <span>Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star}>
              <input
                type="radio"
                value={star}
                checked={newRating === star}
                onChange={() => setNewRating(star)}
                required
              />
              {star}
            </label>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comments;
