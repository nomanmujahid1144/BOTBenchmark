export const DetailRating = ({star, index}) => {
    return (
        <div className="row">
            <div className="col-lg-9 col-9">
                <div className="progress">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${star}%` }}
                        aria-valuenow={star}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div>
            </div>
            <div className="col-lg-3 col-3 text-end">
                <strong>{index} stars</strong>
            </div>
        </div>
    )
}