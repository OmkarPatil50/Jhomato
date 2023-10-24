import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "..";
import { ReviewCard } from "../Components/ReviewCard";

export function RestoDetails() {
  const { restoID } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const [restoDetails, setRestoDetails] = useState({});
  const [newReviewData, setNewReviewData] = useState({
    rating: 0,
    comment: "",
    revName: "user",
    pp:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tbKdv1HDbAjPc526SK0yDZuoOmaaOyGNoj_e1q3ngruK2bTqzub3&s=0"
  });
  const [showNewReviewWindow, setShowNewReviewWindow] = useState(false);

  const getResto = () => {
    const data = state.restaurantsData.find(({ id }) => id == restoID);
    setRestoDetails(data);
  };

  useEffect(() => {
    getResto();
  }, [restoID, state.restaurantsData]);

  return (
    <div className="resto-details-page">
      <Link to="/" className="back-arrow">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <div className="resto-details-box">
        <div className="resto-details-page-header">
          <div className="resto-info">
            <h1 className="resto-name-details-page">{restoDetails?.name}</h1>
            <ul className="resto-manu-ul-details-page">
              {restoDetails?.menu?.map((menu) => {
                return <li key={menu.name}>{menu.name}, </li>;
              })}
            </ul>
            <p className="resto-info-details-page">{restoDetails?.address}</p>
            <p className="resto-info-details-page">
              Average Rating: {restoDetails?.averageRating?.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => setShowNewReviewWindow(true)}
            className="btn-add-review"
          >
            Add Review
          </button>
        </div>
        <div className="reviews-section">
          <h2 className="reviews-section-heading">Reviews</h2>
          <ul className="review-list-ul">
            {restoDetails?.ratings?.map((review) => {
              return (
                <li className="review-list-li" key={review.revName}>
                  <ReviewCard review={review} />
                </li>
              );
            })}
          </ul>
        </div>
        {showNewReviewWindow && (
          <div className="new-review-window">
            <div className="new-review-box">
              <i
                className="fa-solid fa-xmark"
                onClick={() => {
                  setShowNewReviewWindow(false);
                  setNewReviewData({
                    rating: 0,
                    comment: "",
                    revName: "user",
                    pp:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tbKdv1HDbAjPc526SK0yDZuoOmaaOyGNoj_e1q3ngruK2bTqzub3&s=0"
                  });
                }}
              ></i>
              <h2 className="new-review-heading">Add Your Review</h2>
              <div className="new-review-input-section">
                <label htmlFor="rating">Rating</label>
                <select
                  name="rating"
                  required
                  onChange={(event) => {
                    setNewReviewData(() => ({
                      ...newReviewData,
                      rating: event.target.value
                    }));
                  }}
                  value={newReviewData.rating}
                >
                  <option value="0">Select Rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <label htmlFor="comment">Comment</label>
                <textarea
                  required
                  name="comment"
                  value={newReviewData.comment}
                  placeholder="Add Review Comment Here"
                  onChange={(event) => {
                    setNewReviewData(() => ({
                      ...newReviewData,
                      comment: event.target.value
                    }));
                  }}
                ></textarea>
                <button
                  type="submit"
                  className="new-review-btn"
                  onClick={() => {
                    if (newReviewData.rating !== 0 && newReviewData.comment) {
                      setShowNewReviewWindow(false);
                      dispatch({
                        type: "ADD_NEW_REVIEW",
                        payload: newReviewData,
                        id: restoDetails.id
                      });
                      setNewReviewData({
                        rating: 0,
                        comment: "",
                        revName: "user",
                        pp:
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tbKdv1HDbAjPc526SK0yDZuoOmaaOyGNoj_e1q3ngruK2bTqzub3&s=0"
                      });
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
