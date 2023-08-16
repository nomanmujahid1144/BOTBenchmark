import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleSoftwares } from "../../../../redux/Actions/SoftwareAction";
import InputField from "../fields/InputField";
import TextField from "../fields/TextField";
import { addFeedBack } from "../../../../redux/Actions/FeedBackAction";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { useAlert } from "react-alert";
import { RatingReviewCard } from "./RatingReviewCard";
import { Loader } from "../loader/Loader";

export const WriteReview = () => {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [softwareDetail, setSoftware] = useState({});
    const [rating, setRatingPoints] = useState(0);
    const [getFeedBack, setFeedBack] = useState({
        reviewTitle: "",
        feedback: "",
    });

    const today = new Date();

    // Extract day, month, and year components
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const year = today.getFullYear();

    // Format the date as desired (e.g., "DD/MM/YYYY" or "MM/DD/YYYY")
    const formattedDate = `${day}/${month}/${year}`;

    const softwareId = params.softwareId;

    const { software } = useSelector(
        (state) => state.softwareReducer
    );

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );
    

    useEffect(() => {
        if (softwareId) {
            dispatch(getSingleSoftwares(softwareId));
        }
    }, [])
    
    useEffect(() => {
        setSoftware(software)
    },[software])

    const onChange = (e) => {
        setFeedBack({ ...getFeedBack, [e.target.name]: e.target.value });
    };

    // const token = useSelector((state) => state.ProfileReducer);

    const handleSubmitRating = async (e) => {
        e.preventDefault();

        const feedback = getFeedBack.feedback;
        const reviewTitle = getFeedBack.reviewTitle;

        if (localStorage.getItem('token')) {
            dispatch(addFeedBack(rating, reviewTitle, feedback, softwareDetail?._id, softwareDetail?.softwareName, alert, navigate ))
        } else {
            const targetUrl = window.location.pathname + window.location.search;
            alert.show('Please Sign in first');
            navigate("/login", { state: { targetUrl } });
        }

    }


    return (
        <>
            {!loading ? 
                <>
                    <main className="margin_main_container">
                        <div className="container margin_60_35">
                            <div className="row">
                                <div className="col-lg-8">
                                    <form onSubmit={handleSubmitRating}>
                                        <div className="box_general write_review">
                                            <h1>Write a review of {software?.softwareName}</h1>
                                            <div className="rating_submit">
                                                <div className="form-group d-flex justify-content-between">
                                                    <div>
                                                        <label className="d-block">Overall rating</label>
                                                            <span className="rating">
                                                                <ReactStars
                                                                    count={5}
                                                                    value={rating}
                                                                    edit={true}
                                                                    onChange={(points, newRating) => {
                                                                        setRatingPoints(points);
                                                                    }}
                                                                    size={30}
                                                                    isHalf={true}
                                                                    a11y={true}
                                                                    emptyIcon={<i className="far fa-star"></i>}
                                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                    fullIcon={<i className="fa fa-star"></i>}
                                                                    activeColor="#32a067"
                                                                />
                                                        </span>
                                                    </div>
                                                    <div >
                                                        <label className="d-block">Date of Review*</label>
                                                        {formattedDate}
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            {/* /rating_submit */}
                                                <InputField
                                                    variant="auth"
                                                    extra="mb-3"
                                                    label="Title of your review*"
                                                    placeholder="If you could say it in one sentence, what would you say?"
                                                    required={true}
                                                    id="reviewTitle"
                                                    type="text"
                                                    value={getFeedBack.reviewTitle}
                                                    onChange={onChange}
                                                />
                                                <TextField
                                                    variant="auth"
                                                    extra="w-100"
                                                    label="Your review*"
                                                    placeholder="Write your review to help others learn about this online business"
                                                    required={true}
                                                    id="feedback"
                                                    cols={3}
                                                    rows={10}
                                                    type="text"
                                                    value={getFeedBack.feedback}
                                                    onChange={onChange}
                                                />
                                            <button type="submit" className="btn_1 mt-2">
                                                Submit review
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {/* /col */}
                                <div className="col-lg-4">
                                    <div className="latest_review">
                                        <h4>
                                            Recent reviews for {software?.softwareName}
                                        </h4>
                                        {software?.feedbacks?.slice(0, 2).map((feedback) => (
                                            <RatingReviewCard
                                            rating={feedback?.rating}
                                            reviewTitle={feedback?.reviewTitle}
                                            feedback={feedback?.feedback}
                                            softwareName={software?.softwareName}
                                            softwareId={feedback?.softwareId?._id}
                                            date={feedback?.date}
                                            userName={feedback?.userId?.fullName}
                                            />
                                        ))}
                                    </div>
                                    {/* /latest_review */}
                                </div>
                            </div>
                            {/* /row */}
                        </div>
                        {/* /container */}
                    </main>
                    </>
            : (<Loader />)}
        </>
    )
}