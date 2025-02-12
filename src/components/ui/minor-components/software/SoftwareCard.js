import { Link } from "react-router-dom";
import StarRating from "../ratings/StarRating";
import { toSnakeCase } from "../../../../constants/helperFunction";

export const SoftwareCard = ({softwareId, softwareName, softwareLogo, softwaredescription, rating, totalRatings}) => {
    return (
        <div className="company_listing isotope-item high">
            <div className="row">
                <div className="col-md-9">
                    <div className="company_info">
                        <figure>
                                <img src={softwareLogo} alt="" />
                        </figure>
                        <h3>{softwareName}</h3>
                        <p dangerouslySetInnerHTML={{ __html: softwaredescription.slice(0, 200) + '...'}}></p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="text-center float-lg-end">
                        {totalRatings !== 0 ? 
                            <span className="rating">
                                <strong>Based on {totalRatings} reviews</strong>
                                <StarRating
                                    rating={rating}
                                />
                            </span>
                        : null}
                        <Link to={`/review/${softwareId}/${toSnakeCase(softwareName)}`} className="btn_1 small">Read more</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}