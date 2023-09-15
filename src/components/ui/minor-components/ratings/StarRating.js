const StarRating = ({ rating }) => {
    const starsTotal = 5; // Total number of stars
    const fullStars = Math.floor(rating); // Get the integer part of the rating
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
  
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= starsTotal; i++) {
        if (i <= fullStars) {
          stars.push(<i key={i} className="icon_star" />);
        } else if (i === fullStars + 1 && hasHalfStar) {
          stars.push(<i key={i} className="icon_star-half" />);
        } else {
          stars.push(<i key={i} className="icon_star empty" />);
        }
      }
      return stars;
    };
  
    return <>{renderStars()}</>;
  };
  
export default StarRating;
  