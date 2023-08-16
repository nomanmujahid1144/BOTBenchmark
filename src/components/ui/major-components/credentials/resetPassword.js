import { useState } from "react";
import { Background } from "./Background";
import { AuthCard } from "./Card";
import { BackBtn } from "./FixedBtnForBack";
import { TopHeading } from "./TopHeading";
import InputField from "../../minor-components/fields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../../redux/Actions/UserActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Loader } from "../../minor-components/loader/Loader";
import { GotoPage } from "./GotoPage";
export const ResetPassword = () => {


    let navigate = useNavigate();
    let dispatch = useDispatch();
    const alert = useAlert();

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const [credentials, setcredentials] = useState({
        email: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = credentials;
        dispatch(resetPassword(email, navigate, alert));
    };

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            {!loading ? 
                <>
                    <Background>
                        <AuthCard>
                            <TopHeading heading='Reset Password' displayMessage='Please enter your email address. You will receive a link to create a new password via email.'/>
                                <form onSubmit={handleSubmit} className="text-start">
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
                                    <div className="mb-4">
                                        <button
                                            type="submit"
                                            className="btn_1 rounded full-width">
                                            Reset
                                        </button>
                                    </div>
                                    <GotoPage
                                        displayText="Remember your password ? "
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