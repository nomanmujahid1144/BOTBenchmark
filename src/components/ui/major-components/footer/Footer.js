import { useState, useEffect } from 'react';
import logo from '../../../../assets/logo/logo.png'
import { SocialIcons } from './SocialMediaIcons'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../redux/Actions/CategoryActions';
import { toSnakeCase, toTitleCase } from '../../../../constants/helperFunction';

export const Footer = () => {

    const [showButton, setShowButton] = useState(false);
    const dispatch = useDispatch();
    const currentYear = new Date().getFullYear();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  
    const scrollToTop = () => {
        console.log('asd')
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const { categories } = useSelector(
        (state) => state.categoryReducer
    );

    useEffect(() => {
        dispatch(getCategories());
    },[])
    
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <a
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse_ft_1"
                        aria-expanded="false"
                        aria-controls="collapse_ft_1"
                        className="collapse_bt_mobile"
                        >
                        <h3>Quick Links</h3>
                        <div className="circle-plus closed">
                            <div className="horizontal" />
                            <div className="vertical" />
                        </div>
                        </a>
                        <div className="collapse show" id="collapse_ft_1">
                        <ul className="links">
                            <li>
                                <a href="/about-us">About us</a>
                            </li>
                            <li>
                                <a href="/faqs">Faq</a>
                            </li>
                            <li>
                                <a href="/contact-us">Contacts</a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <a data-bs-toggle="collapse" data-bs-target="#collapse_ft_2" aria-expanded="false" aria-controls="collapse_ft_2" className="collapse_bt_mobile" >
                                <h3>Categories</h3>
                                <div className="circle-plus closed">
                                    <div className="horizontal" />
                                    <div className="vertical" />
                                </div>
                            </a>
                            <div className="collapse show" id="collapse_ft_2">
                                <ul className="links">
                                    {categories?.slice(0, 5)?.map((category) => (
                                        <li>
                                            <a href={`/categories/${toSnakeCase(category.categoryName)}`}>{toTitleCase(category.categoryName)}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <a data-bs-toggle="collapse" data-bs-target="#collapse_ft_3" aria-expanded="false" aria-controls="collapse_ft_3" className="collapse_bt_mobile">
                                <h3>Contacts</h3>
                                <div className="circle-plus closed">
                                    <div className="horizontal" />
                                    <div className="vertical" />
                                </div>
                            </a>
                            <div className="collapse show" id="collapse_ft_3">
                                <ul className="contacts">
                                    {/* <li>
                                        <i className="ti-home" />
                                        97845 Baker st. 567
                                    <br />
                                        Los Angeles - US
                                    </li>
                                    <li>
                                        <i className="ti-headphone-alt" />
                                        +61 23 8093 3400
                                    </li> */}
                                    <li>
                                        <i className="ti-email" />
                                        <a href={`mailto:hello@botbenchmark.com`}>hello@botbenchmark.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <a data-bs-toggle="collapse" data-bs-target="#collapse_ft_4" aria-expanded="false" aria-controls="collapse_ft_4" className="collapse_bt_mobile">
                                <div className="circle-plus closed">
                                    <div className="horizontal" />
                                    <div className="vertical" />
                                </div>
                                <h3>Newsletter Sign up</h3>
                            </a>
                            <div className="collapse show" id="collapse_ft_4">
                                <div id="newsletter">
                                    <div id="message-newsletter" />
                                    <form method="post" action="assets/newsletter.php" name="newsletter_form" id="newsletter_form" >
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email_newsletter"
                                                id="email_newsletter"
                                                className="form-control"
                                                placeholder="Your email"
                                            />
                                            <input
                                                type="submit"
                                                defaultValue="Submit"
                                                id="submit-newsletter"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="follow_us">
                                    <h5>Follow Us</h5>
                                    <SocialIcons />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /row*/}
                    <hr />
                    <div className="row">
                        <div className="col-lg-6">
                            {/* <ul id="footer-selector">
                                <li>
                                    <div className="styled-select" id="lang-selector">
                                        <select>
                                            <option value="English" selected="">
                                            English
                                            </option>
                                            <option value="French">French</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="Russian">Russian</option>
                                        </select>
                                    </div>
                                </li>
                            </ul> */}
                        </div>
                        <div className="col-lg-6">
                            <ul id="additional_links">
                                <li>
                                    <span>© {currentYear} BOT Benchmark</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <div id="toTop" className={`${showButton ? '' : 'd-none'}`} onClick={scrollToTop}></div>
        </>
    )
}