import { useEffect } from "react";
import { Headings } from "../main-heading/Heading";
import { SlickReviewSlider } from "../slider/SlickSlider";
import { RatingReviewCard } from "./RatingReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { getLatestReviews } from "../../../../redux/Actions/FeedBackAction";

export const LatestReviews = () => {

  const dispatch = useDispatch();

  const { latestFeedbacks } = useSelector(
    (state) => state.feedBackReducer
  )

  useEffect(() => {
    dispatch(getLatestReviews());
  },[])

  return (
    <>
      {latestFeedbacks?.length > 3 ?
          <div className="bg_color_1">
            <div className="container margin_60">
              <Headings
                Heading={"Latest Reviews"}
                isSubHeading={false}
                subHeading="Cum doctus civibus efficiantur in imperdiet deterruisset."
                goto={"/goto"}
              />
              <div id="reccomended" className="owl-carousel owl-theme owl-loaded owl-drag" style={{ display: "block" }}>
                <div className="owl-stage-outer">
                  <SlickReviewSlider >
                    {latestFeedbacks.map((feedback) => (
                      <RatingReviewCard
                        rating={feedback?.rating}
                        reviewTitle={feedback?.reviewTitle}
                        feedback={feedback?.feedback}
                        softwareName={feedback?.softwareId?.softwareName}
                        softwareId={feedback?.softwareId?._id}
                        date={feedback?.date}
                        userName={feedback?.userId?.fullName}
                      />
                    ))}
                  </SlickReviewSlider>
                </div>
              </div>
            </div>
          </div >
          :null}
    </>
    )
}