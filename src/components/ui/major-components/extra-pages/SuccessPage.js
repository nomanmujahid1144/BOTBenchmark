import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { addClaimedSoftwares } from "../../../../redux/Actions/UserActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

export const SuccessPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const softwareId = localStorage.getItem('softwareId');

    useEffect(() => {
        console.log("SuccessPage useEffect - softwareId:", softwareId);
        if (softwareId) {
            localStorage.removeItem('softwareId');
            dispatch(addClaimedSoftwares(softwareId, navigate, alert))
        } else {
            navigate('/not-found')
        }

    }, [])

    return (
        <main className="margin_main_container">
            <div className="container margin_60">
                <div className="row justify-content-center">
                <div className="col-md-5">
                    <div id="confirm">
                    <div className="icon icon--order-success svg add_bottom_15">
                        <svg xmlns="http://www.w3.org/2000/svg" width={72} height={72}>
                        <g fill="none" stroke="#8EC343" strokeWidth={2}>
                            <circle
                            cx={36}
                            cy={36}
                            r={35}
                            style={{
                                strokeDasharray: "240px, 240px",
                                strokeDashoffset: 480
                            }}
                            />
                            <path
                            d="M17.417,37.778l9.93,9.909l25.444-25.393"
                            style={{ strokeDasharray: "50px, 50px", strokeDashoffset: 0 }}
                            />
                        </g>
                        </svg>
                    </div>
                    <h2>Congratulations! Your transaction was successful.</h2>
                    <p>The page is automatically refresh after 3 seconds.</p>
                    </div>
                </div>
                </div>
                {/* /row */}
            </div>
            {/* /container */}
            <div className="bg_color_1">
                <div className="container margin_60_35">
                <div className="row">
                    <div className="col-lg-4">
                    <a href="#0" className="boxed_list">
                        <i className="pe-7s-help2" />
                        <h4>Need Help?</h4>
                        <p>
                        Cum appareat maiestatis interpretaris et, et sit epicurei
                        tractatos constituam ad mel.
                        </p>
                    </a>
                    </div>
                    <div className="col-lg-4">
                    <a href="#0" className="boxed_list">
                        <i className="pe-7s-flag" />
                        <h4>Report Abuse</h4>
                        <p>
                        Cum appareat maiestatis interpretaris et, et sit epicurei
                        tractatos constituam ad mel.
                        </p>
                    </a>
                    </div>
                    <div className="col-lg-4">
                    <a href="#0" className="boxed_list">
                        <i className="pe-7s-note2" />
                        <h4>Cancel Policy</h4>
                        <p>
                        Cum appareat maiestatis interpretaris et, et sit epicurei
                        tractatos constituam ad mel.
                        </p>
                    </a>
                    </div>
                </div>
                {/* /row */}
                </div>
                {/* /container */}
            </div>
            {/* /bg_color_1 */}
        </main>
    )
}