import { TopHeader } from "../../minor-components/top-heading-for-contact-pricing-etc/TopHeader"
import Pricify from '@chargebee/atomicpricing';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../minor-components/fields/InputField";
import TextAreaField from "../../minor-components/fields/TextField"
import { Headings } from "../../minor-components/main-heading/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSoftwares } from "../../../../redux/Actions/SoftwareAction";
import { baseURL } from "../../../../constants/baseURL";
import { isValidFileType, toSnakeCase } from "../../../../constants/helperFunction";
import StarRating from "../../minor-components/ratings/StarRating";
import { getSingleUser } from "../../../../redux/Actions/UserActions";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useAlert } from "react-alert";
import { addClaimedSoftwares } from "../../../../redux/Actions/ClaimedSoftwares";
import SelectionField from "../../minor-components/fields/SelectField";

export const Pricing = () => {

    const params = useParams();
    const alert = useAlert();
    const softwareId = params.softwareId;
    localStorage.setItem('softwareId', softwareId)
    useEffect(() => {
        Pricify.init();
    }, []);

    const [credentials, setcredentials] = useState({
        fullName: "",
        email: "",
        timeperiod: "",
    });
    const [value, setValue] = useState();
    const [documentFile, setDocumentValue] = useState(null);
    const [image, setImageValue] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { software } = useSelector(
        (state) => state.softwareReducer
    )

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const { user } = useSelector(
        (state) => state.usersReducer
    );

    useEffect(() => {
        if (user) {
            credentials.fullName = (user?.fullName !== '' && user?.fullName !== undefined ? user?.fullName : '');
            credentials.email = (user?.email !== '' && user?.email !== undefined ? user?.email : '');
            credentials.timeperiod = (user?.timeperiod !== '' && user?.timeperiod !== undefined ? user?.timeperiod : '');
        }
    }, [user])

    useEffect(() => {
        if (softwareId) {
            dispatch(getSingleSoftwares(softwareId));
        };
        dispatch(getSingleUser(navigate, alert));
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, timeperiod } = credentials;

        console.log(documentFile)
        console.log(image)

        var formData = new FormData();
        if (documentFile) {
            formData.append("document", documentFile);
        } else if (image) {
            formData.append("image", image);
        }

        if (!value) {
            alert.show('Please Enter your Phone Number')
        } else {
            dispatch(addClaimedSoftwares(softwareId, value, timeperiod, formData, toSnakeCase(software?.softwareName), navigate, alert));
            setcredentials({
                fullName: (user?.fullName !== '' && user?.fullName !== undefined ? user?.fullName : ''),
                email: (user?.email !== '' && user?.email !== undefined ? user?.email : ''),
                timeperiod: (user?.timeperiod !== '' && user?.timeperiod !== undefined ? user?.timeperiod : ''),
            });
    
            setDocumentValue(null);
            setImageValue(null);
        }        
    };

    
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    
    return (
        <main className="bg_color_1">
            <section className="hero_single general">
                <TopHeader
                    headding="Pricing"
                />
            </section>
            <div className="call_section_3">
                <div className="wrapper " style={{background: 'white'}}>
                    <div className="container clearfix d-flex justify-content-center">
                        <div className="col-lg-8 col-sm-10">
                            <div className="box_pricing">
                                <div className="main_title_3 text-start">
                                    <h2 className="mb-2">Clain this Software</h2>
                                    <p style={{color: '#222'}}>Start collaborating reviews today</p>
                                </div>
                                <hr />
                                <div className="row">        
                                    <div className="d-flex gap-3 border rounded p-3">
                                        <img style={{width: '100px'}} className="rounded" src={baseURL + software?.softwareLogo} alt="" />
                                        <span className="rating">
                                        <h1 style={{ alignSelf: 'center' }}>{software?.softwareName}</h1>
                                            <StarRating
                                                rating={software?.averageRating}
                                            />
                                            <em>{software?.averageRating}/5.00 - based on {software?.feedbacks?.length} reviews</em>
                                        </span>
                                    </div>
                                </div>
                                <hr />
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
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
                                        <div className="col-md-6 col-sm-12">
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
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <PhoneInput
                                                    isValidPhoneNumber={true}
                                                    limitMaxLength={true}
                                                    className="form-control border border-gray-300 text-sm"
                                                    international
                                                    initialValueFormat="international"
                                                    countryCallingCodeEditable={false} 
                                                    defaultCountry="IN"
                                                    name="phoneNumber"
                                                    placeholder="Enter phone number"
                                                    value={value}
                                                    onChange={setValue}
                                                    displayInitialValueAsLocalNumber
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <SelectionField
                                                    placeholder="Select Subscription Period"
                                                    id="timeperiod"
                                                    type="text"
                                                    options={[
                                                        {
                                                            label: 'Monthly Subscription',
                                                            value: '9.99'
                                                        },
                                                        {
                                                            label: 'Yearly Subscription',
                                                            value: '99.99'
                                                        }
                                                    ]}
                                                    value={credentials?.timeperiod}
                                                    onChange={onChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <PhoneInput
                                                    isValidPhoneNumber={true}
                                                    limitMaxLength={true}
                                                    className="form-control border border-gray-300 text-sm"
                                                    international 
                                                    initialValueFormat="international"
                                                    countryCallingCodeEditable={false} 
                                                    defaultCountry="IN"
                                                    name="phoneNumber"
                                                    placeholder="Enter phone number"
                                                    value={value}
                                                    onChange={setValue}
                                                    displayInitialValueAsLocalNumber
                                                />
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Upload Related Document (Image / Pdf)</label>
                                                <div className="fileupload w-100">
                                                    <input className="w-100" required type="file" name="document" accept=".pdf, image/*"
                                                        onChange={(event) => {
                                                            const selectedFile = event.target.files[0];

                                                            if (!isValidFileType(selectedFile)) {
                                                                console.log('Invalid')
                                                                alert.show("Invalid file type. Please select an Image or Pdf.");
                                                                return;
                                                            }
                                                            console.log('valid')
                                                            if (selectedFile.type.includes('pdf')) {
                                                                setDocumentValue(event.currentTarget.files[0]);
                                                            } else if (selectedFile.type.includes('image')) {
                                                                setImageValue(event.currentTarget.files[0]);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
                                {/* <div className="price" >
                                    <sup>$</sup>9.99<em>/mo</em>
                                </div>
                                <a className="btn cursor-pointer" >Create Account</a> */}
                            </div>
                        </div>
                    </div>
                    {/* /container */}
                </div>
            </div>
            <div className="container margin_tabs mt-5">
                <div id="tabs" className="tabs">
                    {/* <nav>
                        <ul>
                        <li>
                            <a href="#section-1">
                            <i className="pe-7s-paper-plane" />
                            Standard<em>Omnis justo gloriatur et sit</em>
                            </a>
                        </li>
                        <li>
                            <a href="#section-2">
                            <i className="pe-7s-plane" />
                            Extended<em>Quo corrumpit euripidis</em>
                            </a>
                        </li>
                        <li>
                            <a href="#section-3">
                            <i className="pe-7s-rocket" />
                            Premium<em>Constituto deterruisset</em>
                            </a>
                        </li>
                        </ul>
                    </nav> */}


                    <div className="content">
                        <section id="section-1" style={{display: 'block'}}>
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-8">
                                    <div className="box_pricing">
                                        <h4>1 Month</h4>
                                            <p>
                                            Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod
                                            scaevola sea. Et nec tantas accusamus salutatus, sit commodo
                                            veritus te, erat legere fabulas has ut.
                                            </p>
                                        <ul>
                                            <li>
                                                <strong>Lorem</strong> consulatu qui ne
                                            </li>
                                            <li>
                                                <strong>Erat legere</strong> fabulas has ut
                                            </li>
                                            <li>
                                                <strong>Constituto</strong> deterruisset
                                            </li>
                                            <li>
                                                <strong>Omnis</strong> justo gloriatur
                                            </li>
                                        </ul>
                                        <hr />
                                        <div className="price" >
                                            <sup>$</sup>9.99<em>/mo</em>
                                        </div>
                                        <a className="btn cursor-pointer" >Create Account</a>
                                    </div>
                                </div>
                                {/* <div className="col-lg-4">
                                    <div className="box_pricing">
                                        <h4>12 Months</h4>
                                        <p>
                                        Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod
                                        scaevola sea. Et nec tantas accusamus salutatus, sit commodo
                                        veritus te, erat legere fabulas has ut.
                                        </p>
                                        <ul>
                                        <li>
                                            <strong>Lorem</strong> consulatu qui ne
                                        </li>
                                        <li>
                                            <strong>Erat legere</strong> fabulas has ut
                                        </li>
                                        <li>
                                            <strong>Constituto</strong> deterruisset
                                        </li>
                                        <li>
                                            <strong>Omnis</strong> justo gloriatur
                                        </li>
                                        </ul>
                                        <hr />
                                        <div className="price">
                                        <sup>$</sup>99.99<em>/year</em>
                                        </div>
                                        <a href="register.html">Create Account</a>
                                    </div>
                                </div> */}
                            </div>
                        </section>
                        {/* <section id="section-2">
                        <div className="row">
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <h4>1 Month</h4>
                                <p>
                                Diam timeam iracundia eu per, vide error id nec, est veniam
                                equidem nonumes in. Has offendit oportere ea. Errem denique
                                corpora ut vis, veniam fierent recteque vim no, in oblique
                                forensibus accommodare cum.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>45<em>/mo</em>
                                </div>
                                <a href="register.html">Create Account</a>
                            </div>
                            </div>
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <h4>6 Months</h4>
                                <p>
                                Diam timeam iracundia eu per, vide error id nec, est veniam
                                equidem nonumes in. Has offendit oportere ea. Errem denique
                                corpora ut vis, veniam fierent recteque vim no, in oblique
                                forensibus accommodare cum.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>125<em>/6 months</em>
                                </div>
                                <a href="#">Create Account</a>
                            </div>
                            </div>
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <div className="ribbon">
                                <span className="top_selling">Top selling</span>
                                </div>
                                <h4>12 Months</h4>
                                <p>
                                Diam timeam iracundia eu per, vide error id nec, est veniam
                                equidem nonumes in. Has offendit oportere ea. Errem denique
                                corpora ut vis, veniam fierent recteque vim no, in oblique
                                forensibus accommodare cum.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>140<em>/year</em>
                                </div>
                                <a href="register.html">Create Account</a>
                            </div>
                            </div>
                        </div>
                        </section>
                        <section id="section-3">
                        <div className="row">
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <div className="ribbon">
                                <span className="top_selling">Top selling</span>
                                </div>
                                <h4>1 Month</h4>
                                <p>
                                Iriure nostrud dignissim id vix, et velit soluta mei. Velit
                                labore intellegat ad mel, ullum nobis quo in, rebum nihil
                                malorum vix ex.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>45<em>/mo</em>
                                </div>
                                <a href="register.html">Create Account</a>
                            </div>
                            </div>
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <h4>6 Months</h4>
                                <p>
                                Iriure nostrud dignissim id vix, et velit soluta mei. Velit
                                labore intellegat ad mel, ullum nobis quo in, rebum nihil
                                malorum vix ex.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>140<em>/6 months</em>
                                </div>
                                <a href="register.html">Create Account</a>
                            </div>
                            </div>
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <h4>12 Months</h4>
                                <p>
                                Iriure nostrud dignissim id vix, et velit soluta mei. Velit
                                labore intellegat ad mel, ullum nobis quo in, rebum nihil
                                malorum vix ex.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>210<em>/year</em>
                                </div>
                                <a href="register.html">Create Account</a>
                            </div>
                            </div>
                        </div>
                        </section> */}
                    </div>
                    

                </div>
            </div>

            {/* Live Coding */}
            {/* <div id="pricify-hosted-pricing-page"
                data-pricify-site="01H854RDJ9A82QNFE0X1HQ65AT"
                data-pricify-pricingpage="01H854RE2KDSH637DX1T63DD4D"
                data-pricify-viewport-defaultheight="795.1875px">    
            </div> */}
            {/* Test Coding */}
            <div
                id="pricify-hosted-pricing-page"
                data-pricify-site="01H86GPHRFVP32Z1G8RGTG3HF5"
                data-pricify-pricingpage="01H86GPJDYNPX7ARQYGSMTJMW6"
                data-pricify-viewport-defaultheight="795.390625px">
            </div>
        </main>
    )
}