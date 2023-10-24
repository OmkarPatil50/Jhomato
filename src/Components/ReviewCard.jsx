export function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-card-name">
          <img src={review?.pp} alt="user" className="review-user-img" />
          <h3 className="review-user-name">{review?.revName}</h3>
        </div>
        <p className="review-user-rating">
          {review.rating} <i className="fa-solid fa-star"></i>
        </p>
      </div>
      <p className="review-user-comment">{review?.comment}</p>
    </div>
  );
}
