export const UserInfo = ({profileImage, userName, userEmail, reviewCount}) => {
    return (
        <div className="user_summary">
            <div className="wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <figure>
                                <img src={profileImage} alt="" />
                            </figure>
                            <h1>{userName}</h1>
                            <span>{userEmail}</span>
                        </div>
                        <div className="col-md-6">
                            <ul>
                                <li>
                                    <strong>{reviewCount}</strong>
                                    <a
                                    href="#0"
                                    className="tooltips"
                                    data-bs-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Reviews written by you"
                                    >
                                    <i className="icon_star" /> Total Reviews
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}