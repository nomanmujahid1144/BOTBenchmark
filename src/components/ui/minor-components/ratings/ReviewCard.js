import { timeAgo } from "../../../../constants/helperFunction";
import StarRating from "./StarRating"



export const ReviewCard = ({ feedback, ImageShow, Image, reviewTitle, rating, userName, date }) => {
    const dynamicTimeAgo = timeAgo(date);

    return (
        <div className="review_card">
            <div className="row">
                <div className="col-md-2 user_info">
                        <figure>
                            {ImageShow ? 
                                <img src={Image} style={{ widows: '60px', height: '60px', borderRadius: '7px'}} alt="" />
                            : null}
                        </figure>
                    <h5>{userName}</h5>
                </div>
                <div className="col-md-10 review_content">
                    <div className="clearfix add_bottom_15">
                        <span className="rating">
                            <StarRating
                                rating={rating}
                            />
                            <em>{rating}/5.00</em>
                        </span>
                        <em>Published {dynamicTimeAgo}</em>
                    </div>
                    <h4>"{reviewTitle}"</h4>
                    <p>
                        {feedback}
                    </p>
                    {/* <ul>
                        <li>
                            <a href="#0">
                            <i className="icon_like_alt" />
                            <span>Useful</span>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                            <i className="icon_dislike_alt" />
                            <span>Not useful</span>
                            </a>
                        </li>
                        <li>
                            <span>Share</span>{" "}
                            <a href="#0">
                            <i className="ti-facebook" />
                            </a>{" "}
                            <a href="#0">
                            <i className="ti-twitter-alt" />
                            </a>{" "}
                            <a href="#0">
                            <i className="ti-google" />
                            </a>
                        </li>
                    </ul> */}
                </div>
            </div>
            {/* /row */}
            {/* <div className="row reply">
                <div className="col-md-2 user_info">
                    <figure>
                        <img src="img/avatar.jpg" alt="" />
                    </figure>
                </div>
                <div className="col-md-10">
                    <div className="review_content">
                        <strong>Reply from Good Electronics</strong>
                        <em>Published 3 minutes ago</em>
                        <p>
                            <br />
                            Hi Monika,
                            <br />
                            <br />
                            Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod
                            scaevola sea. Et nec tantas accusamus salutatus, sit commodo
                            veritus te, erat legere fabulas has ut. Rebum laudem cum ea, ius
                            essent fuisset ut. Viderer petentium cu his. Tollit molestie
                            suscipiantur his et.
                            <br />
                            <br />
                            Thanks
                        </p>
                    </div>
                </div>
            </div> */}
            {/* /reply */}
        </div>
    )
}