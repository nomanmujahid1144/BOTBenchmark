import { useState } from "react";
import { Background } from "./Background";
import { AuthCard } from "./Card";
import { BackBtn } from "./FixedBtnForBack";
import { TopHeading } from "./TopHeading";
import InputField from "../../minor-components/fields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { userLoginFun, userSocialSignUp } from "../../../../redux/Actions/UserActions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Loader } from "../../minor-components/loader/Loader";
import { GotoPage } from "./GotoPage";
import { SignInWithGoogle } from "./SignInWithGoogle";
export const SignIn = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const alert = useAlert();

    const targetUrl = location.state && location.state.targetUrl;

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const [credentials, setcredentials] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        dispatch(userLoginFun(email, password, navigate, alert, targetUrl));
    };

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleGoogleCredentials = async (Auths) => {
        const { name, email, picture } = Auths;
        dispatch(userSocialSignUp(name, email, navigate, alert, targetUrl));
    }

    return (
        <>
            {!loading ? 
                <>
                    <Background>
                        <AuthCard>
                            <TopHeading heading='Sign in' />
                                <form onSubmit={handleSubmit} >
                                    <div className="access_social ">
                                        <SignInWithGoogle
                                            getCredentials={handleGoogleCredentials}
                                        />
                                    </div>
                                    <div class="divider"><span>Or</span></div>
                                    <div className="grid grid-cols-1">
                                    <InputField
                                        variant="auth"
                                        extra="mb-3"
                                        label="Email Address*"
                                        placeholder="mail@example.com"
                                        required={true}
                                        id="email"
                                        type="email"
                                        value={credentials.email}
                                        onChange={onChange}
                                    />
                                    <InputField
                                        variant="auth"
                                        extra="mb-3"
                                        label="Password*"
                                        placeholder="Min. 8 characters"
                                        required={true}
                                        id="password"
                                        type="password"
                                        value={credentials.password}
                                        onChange={onChange}
                                    />
                                    <div className="clearfix add_bottom_30">
                                        <div className="float-end mt-1">
                                            <Link id="forgot" to={'/reset-password'} >
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <button
                                            type="submit"
                                            className="btn_1 rounded full-width">
                                            Sign In
                                        </button>
                                    </div>
                                    <GotoPage
                                        displayText="Don't Have an Account?"
                                        buttonHeading="Sign up"
                                        buttonLink="/register"
                                    />
                                </div>
                            </form>
                        </AuthCard>   
                    </Background>
                </>
            : (<Loader />)}
            
        </>   
    )
}