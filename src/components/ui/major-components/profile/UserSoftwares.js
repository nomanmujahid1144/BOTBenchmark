import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersReviews, getUsersReviewsCount } from "../../../../redux/Actions/FeedBackAction";
import { Loader } from "../../minor-components/loader/Loader";
import defaultImage from '../../../../assets/images/default.jpg';
import { UserInfo } from "./UserInfo";
import { baseURL } from "../../../../constants/baseURL";
import { getSingleUser } from "../../../../redux/Actions/UserActions";
import { Headings } from "../../minor-components/main-heading/Heading";
import { getSingleUserClaimedSoftwares, getWidgetImage } from "../../../../redux/Actions/ClaimedSoftwares";
import StarRating from "../../minor-components/ratings/StarRating";
import { Link } from "react-router-dom";
import { toSnakeCase } from "../../../../constants/helperFunction";

export const UserSoftware = () => {

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

    const { userClaimedSoftwares, widgetLink} = useSelector(
        (state) => state.claimedSoftwareReducer
    );

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    useEffect(() => {
        dispatch(getSingleUserClaimedSoftwares());
        dispatch(getSingleUser());
        dispatch(getUsersReviewsCount());
        dispatch(getUsersReviews());
    }, []);

    const getWidgetCopy = (softwareId) => {
        dispatch(getWidgetImage(softwareId))
    }

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
                        <div className="container margin_60_35" >
                            <Headings
                                Heading={"Claimed Softwares"}
                                isSubHeading={false}
                                subHeading="Cum doctus civibus efficiantur in imperdiet deterruisset."
                                goto={"/categories"}
                            />
                            <table className="table border table-hover rounded">
                                <thead className="table-light">
                                    <tr>
                                    <th scope="col">Software Logo</th>
                                    <th scope="col">Software Name</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Action</th>
                                    {/* <th scope="col">Copy Code</th> */}
                                    </tr>
                                </thead>
                                <tbody style={{verticalAlign: '-webkit-baseline-middle'}}>
                                    {userClaimedSoftwares.map((software) => (
                                        <tr>
                                            <th scope="row">
                                                <Link to={`/review/${software?.softwareId?._id}/${toSnakeCase(software?.softwareId?.softwareName)}`}>
                                                    <img style={{width: '5rem'}} className="rounded" src={baseURL + software?.softwareId?.softwareLogo} />
                                                </Link>
                                            </th>
                                            <td>
                                                <Link to={`/review/${software?.softwareId?._id}/${toSnakeCase(software?.softwareId?.softwareName)}`}>
                                                    {software?.softwareId?.softwareName}
                                                </Link>
                                            </td>
                                            <td>
                                                <span className="rating">
                                                    <StarRating
                                                        rating={software?.softwareId?.averageRating}
                                                    />
                                                </span>
                                            </td>
                                            {software?.claimed ? 
                                                <td>
                                                    <a target="_black" onClick={() => getWidgetCopy(software?.softwareId?._id)}>Click to Copy Code</a>
                                                </td>
                                            :
                                                <td>
                                                    <a target="_black" href={software?.hostedLink}>Click to Proceed Payment</a>
                                                </td>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                    <span dangerouslySetInnerHTML={{__html: widgetLink}}></span>
                </>
            : (<Loader />)}
        </>
    )
}