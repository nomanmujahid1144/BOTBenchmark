import { slide as Menu } from 'react-burger-menu';
import './MobileNavbar.css';



const MenuItem = ({ href, label }) => {
  return (
    <li>
      <span>
        <a href={href}>{label}</a>
      </span>
    </li>
  );
};


const SubMenuItem = ({ label, subItems }) => {
    return (
      <li>
        <em className="mm-counter">{subItems.length}</em>
        <a className="mm-next mm-fullsubopen" href={`#${label}`} aria-owns={label} aria-haspopup="true">
          <span className="mm-sronly">Open submenu ({label})</span>
        </a>
        <span>
          <a href="#0">{label}</a>
        </span>
        <Menu id={label} className="mm-hidden">
          <ul className="mm-listview">
            {subItems.map((subItem, index) => (
              <MenuItem key={index} href={subItem.link} label={subItem.label} />
            ))}
          </ul>
        </Menu>
      </li>
    );
};
  

const CloseButton = ({ setIsMenuOpen }) => {
    const handleClose = () => {
      setIsMenuOpen(false);
    };
  
    return (
        <a href="#menu" className="btn_mobile close-button" onClick={handleClose}>
            <div className={`hamburger hamburger--spin ${setIsMenuOpen ? 'is-active' : ''}`} id="hamburger">
                <div className="hamburger-box">
                <div className="hamburger-inner" />
                </div>
            </div>
        </a>
    );
  };

export const MobileNavbar = ({ isOpen, setIsMenuOpen }) => {
  const currentYear = new Date().getFullYear();
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
    const handleStateChange = (state) => {
        setIsMenuOpen(state.isOpen);
      };

    return (
        <Menu  left pageWrapId={ "page-wrap" } customBurgerIcon={false} customCrossIcon={false} isOpen={isOpen} onStateChange={handleStateChange} id="mm-menu" className={`main-menu mm-menu mm-offcanvas mm-hasnavbar-bottom-1 mm-pagedim-black mm-theme-dark ${isOpen ? 'mm-opened' : 'mm-hidden'}`}>
            <div className="mm-panels" id="page-wrap">
                <div className="mm-panel mm-hasnavbar mm-opened" id="mm-1">
                    <div className="mm-navbar">
                            <a className="mm-title">MENU</a>
                            {isOpen && <CloseButton setIsMenuOpen={setIsMenuOpen} />}    
                    </div>
                    <ul className="mm-listview">
                        {menuItems.map((menuItem, index) =>
                            menuItem.subItems ? (
                            <SubMenuItem key={index} label={menuItem.label} subItems={menuItem.subItems} />
                            ) : (
                            <MenuItem isOpen={isOpen} onStateChange={(state) => setIsMenuOpen(state.isOpen)} key={index} href={menuItem.link} label={menuItem.label} />
                            )
                        )}
                    </ul>
                </div>
            </div>
            <div className="mm-navbars-bottom">
                <div className="mm-navbar mm-navbar-size-1">
                    <a href="#0">© {currentYear} BOT Benchmark</a>
                </div>
            </div>
      </Menu>
    )
}