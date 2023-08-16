import { useState } from "react";
import { Link } from "react-router-dom"

export const CategoryCard = ({ categoryName, categoryImage, goTo, totalSoftwares, key }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
        <div className="col-lg-3 col-6">
            <Link to={goTo} className={`box_cat_home`} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
                <img src={categoryImage} width={65} height={65} alt="" className={`${isHovered ? 'rotate-x' : ''}`} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}/>
                <h3>{categoryName}</h3>
                <ul className="clearfix">
                    <li>
                        <strong>{totalSoftwares}</strong> Softwares
                    </li>
                    {/* <li>
                    <strong>2,435</strong>
                        <i className="icon-comment" />
                    </li> */}
                </ul>
            </Link>
        </div>
    )
} 