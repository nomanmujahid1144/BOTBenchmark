import { Link } from "react-router-dom"
import StarRating from "./StarRating"
// import { timeAgo } from "../../../../constants/helperFunction";

export const RatingReviewCard = ({ rating, reviewTitle, feedback, softwareName, softwareId, date, userName, isActive }) => {
  // const dynamicTimeAgo = timeAgo(date);
  
    return (
      <div className={`owl-item adjustWidth ${isActive ? 'center active' : ''} `}>
        <div className="item">
          <div className="review_listing">
            <div className="clearfix">
              <figure>
                <img src="img/avatar3.jpg" alt="" />
              </figure>
              <span className="rating">
                <StarRating
                  rating={rating}
                />
                  <em>{rating}/5.00</em>
              </span>
              <small>Shops</small>
            </div>
            <h3>
              <strong>{userName}</strong> reviewed{" "}
              <Link to={`review/${softwareId}/${softwareName}`}>{softwareName}</Link>
            </h3>
            <h4>"{reviewTitle}"</h4>
            <p>{feedback.length > 50 ?  feedback.slice(0, 50) + "..." : feedback}</p>
            {/* <ul className="clearfix">
              <li>
                <small>Published: {dynamicTimeAgo}</small>
              </li>
              <li>
                <a href="reviews-page.html" className="btn_1 small">
                  Read review
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    )
}