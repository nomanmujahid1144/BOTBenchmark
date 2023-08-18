import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleSoftwares } from "../../../../redux/Actions/SoftwareAction";
import { useState } from "react";
import { baseURL } from "../../../../constants/baseURL";
import { DetailRating } from "../../minor-components/ratings/DetailRating";
import StarRating from "../../minor-components/ratings/StarRating";
import { ReviewCard } from "../../minor-components/ratings/ReviewCard";
import InputField from "../../minor-components/fields/InputField";
import topArrow from '../../../../assets/top-arrow.svg';
import bottomArrow from '../../../../assets/bottom-arrow.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from 'react-paginate';
import { Loader } from "../../minor-components/loader/Loader";

export const SoftwarePage = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const { software } = useSelector(
        (state) => state.softwareReducer
    )

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const [softwareDetail, setSoftware] = useState({});
    const softwareId = params.softwareId;
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(software?.feedbacks?.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        if (softwareId) {
            dispatch(getSingleSoftwares(softwareId));
        }
    },[])


    useEffect(() => {
        setSoftware(software)
    },[software])


    return (
        <>
            {!loading ? 
                <>
                    <div className="reviews_summary">
                        <div className="wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <figure>
                                            <img src={baseURL + softwareDetail?.softwareLogo} alt="" />
                                        </figure>
                                        <small>{softwareDetail?.categoryId?.categoryName}</small>
                                        <h1>{softwareDetail?.softwareName}</h1>
                                        <span className="rating">
                                            <StarRating
                                                rating={software?.averageRating}
                                            />
                                            <em>{software?.averageRating}/5.00 - based on {software?.feedbacks?.length} reviews</em>
                                        </span>
                                    </div>
                                    <div className="col-lg-4 review_detail d-flex align-self-center gap-3 justify-content-center justify-content-lg-end">
                                            <Link to={`/write-review/${software?._id}/${softwareDetail?.softwareName}`} className="btn_top d-block text-center w-75">
                                                Write a Review
                                            </Link>
                                            <Link to={`/botscore/upgrade/${software?._id}/${softwareDetail?.softwareName}`} className="btn_top d-block text-center w-75">
                                                Claim This Software
                                            </Link>
                                    </div>
                                </div>
                            </div>
                            {/* /container */}
                        </div>
                    </div>
                    <div className="container margin_60_35">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="box_general company_info">
                                    <h3>{softwareDetail?.softwareName}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: software?.description}}></p>
                                    <p>
                                        {software?.contacts?.location?.address ? 
                                            <>
                                                <strong>Address</strong>
                                                <br />
                                                {software?.contacts?.location?.address}
                                            </>
                                        : null}
                                    </p>
                                    
                                    <p>
                                        {software?.contacts?.webLink != '' ? 
                                            <>
                                                <strong>Website</strong>
                                                <br />
                                                <a target="_black" href={
                                                    software?.contacts?.webLink.includes("://")
                                                    ? software?.contacts?.webLink
                                                    : `http://${software?.contacts?.webLink}`
                                                }>{software?.contacts?.webLink}</a>
                                            </>
                                        : null}
                                    </p>
                                    <p>
                                        {software?.contacts?.email != '' ? 
                                            <>
                                                <strong>Email</strong>
                                                <br />
                                                <a href={`mailto:${software?.contacts?.email}`}>{software?.contacts?.email}</a>
                                            </>
                                        : null}
                                    </p>
                                    <p>
                                        {software?.contacts?.contactno != '' ? 
                                            <>
                                                <strong>Telephone</strong>
                                                <br />
                                                <a href={`tel:${software?.contacts?.contactno}`}>{software?.contacts?.contactno}</a>
                                            </>
                                        : null}
                                    </p>
                                    {/* <p className="follow_company">
                                        <strong>Follow us</strong>
                                        <br />
                                        <a href="#0">
                                            <i className="social_facebook_circle" />
                                        </a>
                                        <a href="#0">
                                            <i className="social_twitter_circle" />
                                        </a>
                                        <a href="#0">
                                            <i className="social_googleplus_circle" />
                                        </a>
                                        <a href="#0">
                                            <i className="social_instagram_circle" />
                                        </a>
                                    </p> */}
                                </div>
                            </div>
                        </div>
                        {software?.feedbacks?.length > 0 ? 
                            <div className="row " style={{marginTop: '70px'}}>
                            <div className="col-lg-4 review_detail">
                                <DetailRating
                                    key="5"
                                    index="5"
                                    star={softwareDetail?.percentageOfEachStart?.star5}
                                />
                                <DetailRating
                                    key="4"
                                    index="4"
                                    star={softwareDetail?.percentageOfEachStart?.star4}
                                />
                                <DetailRating
                                    key="3"
                                    index="3"
                                    star={softwareDetail?.percentageOfEachStart?.star3}
                                />
                                <DetailRating
                                    key="2"
                                    index="2"
                                    star={softwareDetail?.percentageOfEachStart?.star2}
                                />
                                <DetailRating
                                    key="1"
                                    index="1"
                                    star={softwareDetail?.percentageOfEachStart?.star1}
                                />
                            </div>
                            <div className="col-lg-8 marginTop">
                                <div className='d-flex justify-content-between mb-3' style={{marginTop : '-83px'}}>
                                    <div className="d-flex align-items-end gap-2 h-12">
                                        <h6 className="text-xs">Show</h6>
                                        <div className="d-flex flex-grow-1">
                                            <InputField
                                                type="text"
                                                value={itemsPerPage}
                                                disabled={true}
                                                extra={'d-flex align-items-center'}
                                                style={{ maxWidth: "80px" }}
                                            />
                                            <div style={{marginLeft: '5px'}} className="d-flex flex-column align-items-center gap-2 justify-content-center">
                                                <img
                                                    onClick={(e) =>
                                                    setItemsPerPage(itemsPerPage < software?.feedbacks?.length ? itemsPerPage + 1 : itemsPerPage)
                                                    }
                                                    className="w-2 cursor-pointer"
                                                    src={topArrow}
                                                    alt="top-arrow"
                                                />
                                                <img
                                                    onClick={(e) => setItemsPerPage(itemsPerPage > 5 ? itemsPerPage - 1 : itemsPerPage)}
                                                    className="w-2 cursor-pointer"
                                                    src={bottomArrow}
                                                    alt="bottom-arrow"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between gap-2">
                                        <Link to={`/write-review/${software?._id}/${softwareDetail?.softwareName}`} className="btn_top d-block text-center w-100">
                                            Write a Review
                                        </Link>
                                    </div>
                                </div>
                                {software?.feedbacks?.slice(pagesVisited, pagesVisited + itemsPerPage).map((feedback) => (
                                    <ReviewCard
                                        feedback={feedback?.feedback}
                                        reviewTitle={feedback?.reviewTitle}
                                        rating={feedback?.rating}
                                        userName={feedback?.userId?.fullName}
                                        date={feedback?.date}
                                    />
                                ))}

                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="text-xs text-left">
                                        Showing {software?.feedbacks?.slice(pagesVisited, pagesVisited + itemsPerPage).length} results of {software?.feedbacks?.length}
                                    </p>
                                    <div className="d-flex justify-center">
                                        <div className="pagination__wrapper add_bottom_15">
                                            <ReactPaginate
                                                previousLabel={<FontAwesomeIcon icon="fa-solid fa-chevron-left" />}
                                                nextLabel={<FontAwesomeIcon icon="fa-solid fa-chevron-right" />}
                                                pageCount={pageCount}
                                                onPageChange={changePage}
                                                containerClassName={"pagination"}
                                                previousLinkClassName={"prev"}
                                                nextLinkClassName={"next"}
                                                disabledClassName={"disabled"}
                                                activeClassName={"active"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        : null}
                    </div>
                    </>
            : (<Loader />)}
        </>
    )
}