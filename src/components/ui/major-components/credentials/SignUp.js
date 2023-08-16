import { useState } from "react";
import { TopHeading } from "./TopHeading";
import { BackBtn } from "./FixedBtnForBack";
import { Background } from "./Background";
import { AuthCard } from "./Card";
import InputField from "../../minor-components/fields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp, userSocialSignUp } from "../../../../redux/Actions/UserActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { GotoPage } from "./GotoPage";
import { SignInWithGoogle } from "./SignInWithGoogle";
import { Loader } from "../../minor-components/loader/Loader";


export const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        dispatch(userSignUp(name, email, password, navigate, alert));
    };

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    const handleGoogleCredentials = async (Auths) => {
        const { name, email, picture } = Auths;
        dispatch(userSocialSignUp(name, email, navigate, alert));
    }

    return (
        <>
            {!loading ? 
                <>
                    <Background>
                        <AuthCard>
                            <TopHeading heading='Sign up'/>
                            <form onSubmit={handleSubmit} className="text-start">
                                    <div className="access_social" >
                                        <SignInWithGoogle
                                            getCredentials={handleGoogleCredentials}
                                        />
                                    </div>
                                    <div class="divider"><span>Or</span></div>
                                    <div className="grid grid-cols-1">
                                        <InputField
                                            variant="auth"
                                            extra="mb-4"
                                            label="Full Name*"
                                            placeholder="Syed Asif"
                                            required={true}
                                            id="name"
                                            type="text"
                                            value={credentials.name}
                                            onChange={onChange}
                                        />
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
                                    <div className="mb-4">
                                        <button
                                            type="submit"
                                            className="btn_1 rounded full-width">
                                            Register
                                        </button>
                                        </div>
                                        <GotoPage
                                            displayText="Already have an account ?"
                                            buttonHeading="Sign in"
                                            buttonLink="/login"
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