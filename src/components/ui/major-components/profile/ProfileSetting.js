import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeUserPassword, getSingleUser, updateUser } from "../../../../redux/Actions/UserActions";
import defaultImage from '../../../../assets/images/default.jpg';
import InputField from "../../minor-components/fields/InputField";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { baseURL } from "../../../../constants/baseURL";
import { Loader } from "../../minor-components/loader/Loader";
import { getUsersReviewsCount } from "../../../../redux/Actions/FeedBackAction";
import { UserInfo } from "./UserInfo";

export const ProfileSetting = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const [credentials, setcredentials] = useState({
        profilePhoto: "",
        fullName: "",
        email: "",
    });
    const [newPassword, setPassword] = useState({
        password: "",
        cpassword: ""
    });
    const [filePreview, setFilePreview] = useState(null);
    const [profileFile, setProfileFile] = useState(null);

    const { user } = useSelector(
        (state) => state.usersReducer
    );

    const { feedbackCount } = useSelector(
        (state) => state.feedBackReducer
    );

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    useEffect(() => {
        dispatch(getSingleUser());
        dispatch(getUsersReviewsCount());
    }, []);
    
    useEffect(() => {
        dispatch(getSingleUser());
        setPassword({
            password: "",
            cpassword: ""
        })
    },[dispatch])

    useEffect(() => {
        setcredentials({
            profilePhoto: user?.profilePhoto,
            fullName: user?.fullName,
            email: user?.email
        })
    }, [user])

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fullName, email } = credentials;
        var formData = new FormData();
        formData.append('profilePhoto', profileFile)
        let values = {};
        values.fullName = fullName;
        values.email = email;
        dispatch(updateUser(formData, values, alert));
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const { password, cpassword } = newPassword;
        if (password.length < 8 || cpassword.length < 8) {
            alert.show("Kindly establish an 8-digit password")
        }else if (password !== cpassword) {
            alert.show("Password does not Match")
        } else { 
            dispatch(changeUserPassword(password, navigate, alert));
        }
    };

    const onPasswordChange = (e) => {
        setPassword({ ...newPassword, [e.target.name]: e.target.value });
    };

    return (
        <>
            {!loading ? 
                <>
                    <main className="margin_main_container">
                        <UserInfo
                            profileImage={credentials?.profilePhoto !== '' ? baseURL + credentials?.profilePhoto : defaultImage}
                            userName={user?.fullName}
                            userEmail={user?.email}
                            reviewCount={feedbackCount}
                        />
                        <div className="container margin_60_35">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="settings_panel">
                                        <h3>Personal settings</h3>
                                        <hr />
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <div className="mx-auto d-flex justify-content-center">
                                                    <div className="mx-auto col-md-6">
                                                        <label htmlFor="softwareLogo" className="mx-auto mb-2 d-flex justify-content-center h-120 w-120 cursor-pointer rounded-circle" >
                                                            <img
                                                                className="mb-2 d-block rounded-circle"
                                                                style={{height: '140px', width: '140px', cursor: 'pointer'}}
                                                                src={credentials?.profilePhoto  !== '' && !filePreview ? baseURL + credentials?.profilePhoto : filePreview ? filePreview : defaultImage}
                                                                alt="img"
                                                            />
                                                            <input
                                                                className="d-none"
                                                                id="softwareLogo"
                                                                name="image"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(event) => {
                                                                    setProfileFile(event.currentTarget.files[0])
                                                                    setFilePreview(URL.createObjectURL(event.target.files[0]));
                                                                }}
                                                            />
                                                        </label>
                                                        <label className="d-flex justify-content-center">
                                                            Edit Photo
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="form-group">
                                                <InputField
                                                    variant="auth"
                                                    extra="mb-3"
                                                    label="Edit Email"
                                                    placeholder="mail@example.com"
                                                    required={true}
                                                    id="email"
                                                    type="email"
                                                    value={credentials.email}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <InputField
                                                    variant="auth"
                                                    extra="mb-4"
                                                    label="Edit Full name"
                                                    placeholder="Syed Asif"
                                                    required={true}
                                                    id="fullName"
                                                    type="text"
                                                    value={credentials.fullName}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <p className="text-end">
                                                <button type="submit" className="btn_1 small add_top_15">
                                                    Save personal info
                                                </button>
                                            </p>
                                        </form>
                                    </div>
                                    <div className="settings_panel">
                                        {/* <h3>Change password</h3>
                                        <hr />
                                        <div className="form-group">
                                            <label>Current Password</label>
                                            <input className="form-control" type="password" id="password" />
                                        </div>
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input className="form-control" type="password" id="password1" />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <input className="form-control" type="password" id="password2" />
                                        </div>
                                        <div id="pass-info" className="clearfix" />
                                        <p className="text-end">
                                            <a className="btn_1 small" href="#0">
                                            Save password
                                            </a>
                                        </p> */}
                                        <form onSubmit={handlePasswordSubmit} className="text-start">
                                            <div className="grid grid-cols-1"> 
                                                <InputField
                                                    variant="auth"
                                                    extra="mb-3"
                                                    label="Password*"
                                                    placeholder="Min. 8 characters"
                                                    required={true}
                                                    id="password"
                                                    type="password"
                                                    value={newPassword.password}
                                                    onChange={onPasswordChange}
                                                />
                                                <InputField
                                                    variant="auth"
                                                    extra="mb-3"
                                                    label="Confirm Password*"
                                                    placeholder="Min. 8 characters"
                                                    required={true}
                                                    id="cpassword"
                                                    type="password"
                                                    value={newPassword.cpassword}
                                                    onChange={onPasswordChange}
                                                />
                                                <p className="text-end">
                                                    <button type="submit" className="btn_1 small add_top_15">
                                                        Save personal info
                                                    </button>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4" id="sidebar">
                                    <div className="box_general">
                                    <h5>Delete account</h5>
                                    <p>
                                        At nec senserit aliquando intellegat, et graece facilisis pro. Per
                                        in ridens sensibus interesset, eos ei nonumes incorrupte, iriure
                                        diceret an eos.
                                    </p>
                                    <a href="#" className="btn_1 small">
                                        Delete account
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            : (<Loader />)}
        </>   
    )
}