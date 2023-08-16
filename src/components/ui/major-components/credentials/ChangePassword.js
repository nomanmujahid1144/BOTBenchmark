import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Background } from "./Background";
import { AuthCard } from "./Card";
import { BackBtn } from "./FixedBtnForBack";
import { TopHeading } from "./TopHeading";
import InputField from "../../minor-components/fields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, verifyJWTToken } from "../../../../redux/Actions/UserActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Loader } from "../../minor-components/loader/Loader";
import { GotoPage } from "./GotoPage";
export const ChangePassword = () => {


    let navigate = useNavigate();
    let dispatch = useDispatch();
    const params = useParams();
    const alert = useAlert();

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const [credentials, setcredentials] = useState({
        password: "",
        cpassword: ""
    });


    useEffect(() => {
        const token = params.token;
        dispatch(verifyJWTToken(token, navigate, alert))
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, cpassword } = credentials;
        if (password !== cpassword) {
            alert.show("Password does not Match")
        } else { 
            dispatch(updatePassword(password, global.userId, navigate, alert));
        }
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
                            <TopHeading />
                            <form onSubmit={handleSubmit} className="text-start">
                                <div className="grid grid-cols-1"> 
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
                                    <InputField
                                        variant="auth"
                                        extra="mb-3"
                                        label="Confirm Password*"
                                        placeholder="Min. 8 characters"
                                        required={true}
                                        id="cpassword"
                                        type="password"
                                        value={credentials.cpassword}
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