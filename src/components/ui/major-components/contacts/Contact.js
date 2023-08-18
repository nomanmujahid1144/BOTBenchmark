import TextAreaField from "../../minor-components/fields/TextField"
import InputField from "../../minor-components/fields/InputField"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getSingleUser, sendContactUsMessage } from "../../../../redux/Actions/UserActions"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert";
import { Loader } from "../../minor-components/loader/Loader"
export const Contacts = () => {

    const [credentials, setcredentials] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { user } = useSelector(
        (state) => state.usersReducer
    );

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    useEffect(() => {
        dispatch(getSingleUser(navigate, alert));
    }, [])


    useEffect(() => {
        if (user) {
            credentials.fullName = (user?.fullName !== '' && user?.fullName !== undefined ? user?.fullName : '');
            credentials.email = (user?.email !== '' && user?.email !== undefined ? user?.email : '');
            credentials.phoneNumber = (user?.phoneNumber !== '' && user?.phoneNumber !== undefined ? user?.phoneNumber : '');
            credentials.message= ''
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, phoneNumber, message } = credentials;
        setcredentials({
            fullName: (user?.fullName !== '' && user?.fullName !== undefined ? user?.fullName : ''),
            email: (user?.email !== '' && user?.email !== undefined ? user?.email : ''),
            phoneNumber: (user?.phoneNumber !== '' && user?.phoneNumber !== undefined ? user?.phoneNumber : ''),
            message: "",
        })
        dispatch(sendContactUsMessage(fullName, email, phoneNumber, message, navigate, alert));
    };

    
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    
    return (
        <>
            <section className="hero_single general">
                <div className="wrapper">
                    <div className="container">
                    <h1>Get in Touch with Bot Banchmark</h1>
                    {/* <p>Vanno helps grow your business using customer reviews</p> */}
                </div>
                </div>
            </section>
            {/* /hero_single */}
            <div className="bg_color_1">
                <div className="container margin_tabs">
                <div id="tabs" className="tabs">
                    {/* <nav>
                        <ul>
                            <li>
                                <a href="#section-1">
                                    <i className="pe-7s-help1" />
                                    Questions<em>Omnis justo gloriatur et sit</em>
                                </a>
                            </li>
                            <li>
                                <a href="#section-2">
                                    <i className="pe-7s-help2" />
                                    Support<em>Quo corrumpit euripidis</em>
                                </a>
                            </li>
                        </ul>
                    </nav> */}
                        <div className="content" style={{ marginTop: '76px' }}>
                            <section id="section-1" style={{ display: "block" }}>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div id="message-contact" />
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group required">
                                                        <InputField
                                                            extras="form-control"
                                                            type="text"
                                                            required={true}
                                                            id="fullName"
                                                            placeholder="Full Name"
                                                            disabled={user?.fullName !== '' && user?.fullName !== undefined ? true : false}
                                                            value={credentials?.fullName}
                                                            onChange={onChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group required">
                                                        <InputField
                                                            extras="form-control"
                                                            type="text"
                                                            id="phoneNumber"
                                                            placeholder="Phone Number"
                                                            value={credentials?.phoneNumber}
                                                            onChange={onChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                {/* /row */}
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group required">
                                                        <InputField
                                                            extras="form-control"
                                                            type="email"
                                                            required={true}
                                                            id="email"
                                                            disabled={user?.email !== '' && user?.email !== undefined ? true  : false}
                                                            placeholder="Email"
                                                            value={credentials?.email}
                                                            onChange={onChange}
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-6">
                                                    <div className="form-group required">
                                                        <InputField
                                                            extras="form-control"
                                                            type="text"
                                                            id="phone"
                                                            name="phone"
                                                            placeholder="Phone Number"
                                                        />
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="form-group required">
                                                <TextAreaField
                                                    extras="form-control"
                                                    id="message"
                                                    type="text"
                                                    required={true}
                                                    placeholder="Message"
                                                    value={credentials?.message}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className="form-group add_top_30 text-center">
                                                <div className="mb-4">
                                                    <button
                                                        type="submit"
                                                        className="btn_1 rounded full-width">
                                                        Send Message
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            {/* /row */}
                        </section>
                    </div>
                    {/* /content */}
                </div>
                {/* /tabs */}
                </div>
                {/* /container */}
            </div>
            {/* /bg_color */}
            {/* <div className="container margin_60_35">
                <div className="row">
                <div className="col-md-6">
                    <div className="box_faq">
                    <i className="icon_info_alt" />
                    <h4>Porro soleat pri ex, at has lorem accusamus?</h4>
                    <p>
                        Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem
                        mediocritatem. Mea in justo posidonium necessitatibus. Augue
                        honestatis vis no, ius quot mazim forensibus in, per sale virtute
                        legimus ne. Mea dicta facilisis eu.
                    </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box_faq">
                    <i className="icon_info_alt" />
                    <h4>Ut quo inani dolorem mediocritatem?</h4>
                    <p>
                        Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem
                        mediocritatem. Mea in justo posidonium necessitatibus. Augue
                        honestatis vis no, ius quot mazim forensibus in, per sale virtute
                        legimus ne. Mea dicta facilisis eu.
                    </p>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                    <div className="box_faq">
                    <i className="icon_info_alt" />
                    <h4>Per sale virtute legimus ne?</h4>
                    <p>
                        Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem
                        mediocritatem. Mea in justo posidonium necessitatibus. Augue
                        honestatis vis no, ius quot mazim forensibus in, per sale virtute
                        legimus ne. Mea dicta facilisis eu.
                    </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box_faq">
                    <i className="icon_info_alt" />
                    <h4>Mea in justo posidonium necessitatibus?</h4>
                    <p>
                        Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem
                        mediocritatem. Mea in justo posidonium necessitatibus. Augue
                        honestatis vis no, ius quot mazim forensibus in, per sale virtute
                        legimus ne. Mea dicta facilisis eu.
                    </p>
                    </div>
                </div>
                </div>
            </div> */}
        </>
    )
}