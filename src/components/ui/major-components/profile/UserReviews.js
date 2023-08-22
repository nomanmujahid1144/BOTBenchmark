import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo } from "./UserInfo";
import { baseURL } from "../../../../constants/baseURL";
import defaultImage from '../../../../assets/images/default.jpg';
import { Loader } from "../../minor-components/loader/Loader";
import { getUsersReviews, getUsersReviewsCount } from "../../../../redux/Actions/FeedBackAction";
import { getSingleUser } from "../../../../redux/Actions/UserActions";
import { ReviewCard } from "../../minor-components/ratings/ReviewCard";

export const UserReviews = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(
        (state) => state.usersReducer
    );

    const { feedbackCount } = useSelector(
        (state) => state.feedBackReducer
    );
    const { feedbacks } = useSelector(
        (state) => state.feedBackReducer
    );

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    useEffect(() => {
        dispatch(getSingleUser());
        dispatch(getUsersReviewsCount());
        dispatch(getUsersReviews());
    }, []);

    return (
        <>
            {!loading ? 
                <>
                    <main className="margin_main_container">
                        <UserInfo
                            profileImage={user?.profilePhoto !== '' ? baseURL + user?.profilePhoto : defaultImage}
                            userName={user?.fullName}
                            userEmail={user?.email}
                            reviewCount={feedbackCount}
                        />
                        <div className="container margin_60_35">
                            <div className="row">
                                <div className="col-lg-8">
                                    {console.log(feedbacks)}
                                    {feedbacks?.map((feedback) => (
                                        <ReviewCard
                                            feedback={feedback?.feedback}
                                            reviewTitle={feedback?.reviewTitle}
                                            rating={feedback?.rating}
                                            userName={feedback?.softwareId?.softwareName}
                                            ImageShow={true}
                                            Image={baseURL + feedback?.softwareId?.softwareLogo}
                                            date={feedback?.date}
                                        />
                                    ))}
                                </div>
                                {/* /col */}
                                <div className="col-lg-4">
                                    <div className="box_general general_info">
                                    <h3>
                                        Delete a review
                                        <i className="pe-7s-help1" />
                                    </h3>
                                    <p>
                                        <strong>Mucius doctus constituto pri at.</strong> At vix utinam
                                        corpora, ea oblique moderatius usu. Vix id viris consul honestatis,
                                        an constituto deterruisset consectetuer pro quo corrumpit
                                        euripidis...
                                        <br />
                                        <strong>
                                        <a href="faq.html">Rear more</a>
                                        </strong>
                                    </p>
                                    <hr />
                                    <h3>
                                        Post a review
                                        <i className="pe-7s-help1" />
                                    </h3>
                                    <p>
                                        Dolor detraxit duo in, ei sea dicit reformidans. Mel te accumsan
                                        patrioque referrentur. Has causae perfecto ut, ex choro assueverit
                                        eum...
                                        <br />
                                        <strong>
                                        <a href="faq.html">Rear more</a>
                                        </strong>
                                    </p>
                                    <hr />
                                    <h3>
                                        Approve a review
                                        <i className="pe-7s-help1" />
                                    </h3>
                                    <p>
                                        Sed ne prompta insolens mediocrem, omnium fierent sed an, quod
                                        vivendo mel in. Argumentum honestatis ad mel, cu vis quot utroque...
                                        <br />
                                        <strong>
                                        <a href="faq.html">Rear more</a>
                                        </strong>
                                    </p>
                                    <hr />
                                    <div className="text-center">
                                        <a href="faq.html" className="btn_1 small">
                                        View al Faq
                                        </a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            {/* /row */}
                        </div>
                    </main>
                    </>
            : (<Loader />)}
        </>   
    )
}