import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react'
import logo from '../../../../assets/logo/logo.png';
import { slide as Menu } from 'react-burger-menu';
import { MobileNavbar } from './MobileNavbar';
import { Link, useNavigate } from 'react-router-dom';


const MenuItem = ({ label, link, subItems }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(prevState => !prevState);
  };

  return (
    <li>
      <span>
        <a href={link}>{label}</a>
      </span>
      {subItems && (
        <ul className={`sub-menu ${isSubmenuOpen ? 'show' : ''}`}>
          {subItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                <span>
                  <a href="#0" onClick={toggleSubmenu}>
                    {item.label}
                  </a>
                </span>
              ) : (
                <a href={item.link}>{item.label}</a>
              )}
              {item.subItems && (
                <MenuItem label={item.label} link={item.link} subItems={item.subItems} />
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};


const renderSubMenu = (subMenuItems) => {
  return (
    <ul className="sub-menu">
      {subMenuItems.map((item) => (
        <li key={item.id}>
          <a href={item.link}>{item.title}</a>
          {item.subMenu && renderSubMenu(item.subMenu)}
        </li>
      ))}
    </ul>
  );
};

export const Navbar = () => {

  const navigate = useNavigate();

  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const menuItems = [
    {
      label: 'Contacts',
      link: '/contact-us',
    },
    {
      label: 'About',
      link: '/about-us',
    },
    {
      label: 'FAQ',
      link: '/faqs',
    },
    localStorage.getItem('token')
    ? {} // Don't show "Login" menu item if token exists
    : {
        label: 'Login',
        link: '/login',
    },
    // {
    //   label: 'Reviews',
    //   link: '#0',
    //   subItems: [
    //     {
    //       label: 'Layouts',
    //       subItems: [
    //         { label: 'Grid listings 1', link: 'grid-listings-filterstop.html' },
    //         { label: 'Grid listings 2', link: 'grid-listings-filterscol.html' },
    //         { label: 'Row listings', link: 'row-listings-filterscol.html' },
    //       ],
    //     },
    //     { label: 'Reviews page', link: 'reviews-page.html' },
    //     { label: 'Write a review', link: 'write-review.html' },
    //     { label: 'Confirm page', link: 'confirm.html' },
    //     { label: 'User Dashboard', link: 'user-dashboard.html' },
    //     { label: 'User Settings', link: 'user-settings.html' },
    //   ],
    // },
    // {
    //   label: 'Pricing',
    //   link: 'pricing.html',
    // },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  }




  return (
      <header className={`header ${isSticky ? 'sticky' : 'menu_fixed'}`}>
        
        <div id="logo">
          <Link to="/" >
            <img
              src="/img/logo.png"
              height={50}
              alt=""
              className="logo_normal p-0"
              // style={{ display: 'unset' }}
            />
            <img src="/img/logo.png" height={50} alt="" className="logo_sticky" />
          </Link>
        </div>
        {/* <ul id="top_menu">
          <li>
            <a href="write-review.html" className="btn_top">
              Write a Review
            </a>
          </li>
          <li>
            <a href="companies-landing.html" className="btn_top company">
              For Companies
            </a>
          </li>
          <li>
            <a href="#sign-in-dialog" id="sign-in" className="login" title="Sign In">
              Login
            </a>
          </li>
        </ul> */}
      {localStorage.getItem('token') ? 
        <ul id="top_menu">
          <li>
            <div className="dropdown dropdown-user">
              <a href="#0" className="logged" data-bs-toggle="dropdown">
                <img src="img/avatar4.jpg" alt="" />
              </a>
              <div className="dropdown-menu">
                <ul>
                  {/* <li>
                    <a href="user-dashboard.html">My Reviews</a>
                  </li>
                  <li>
                    <a href="user-settings.html">My Settings</a>
                  </li> */}
                  <li>
                    <a style={{ cursor: 'pointer' }}
                      onClick={() => {
                                localStorage.removeItem('token')
                                navigate('/login')
                      }}>Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      :null}
        {/* /top_menu */}
        <a href="#menu" className="btn_mobile" onClick={toggleMenu}>
            <div className={`hamburger hamburger--spin ${isMenuOpen ? 'is-active' : '' }`} id="hamburger">
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div>
          </div>
      </a>
      
      <MobileNavbar isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <nav id="menu" className={`main-menu ${isMenuOpen ? 'show' : ''}`}>
        <ul>
          {menuItems.map((item, index) => (
            <>
              <MenuItem key={index} label={item.label} link={item.link} subItems={item.subItems} />
            </>
          ))}
        </ul>
      </nav>
    </header>
    )
}