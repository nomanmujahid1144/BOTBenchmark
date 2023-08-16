import { Link } from 'react-router-dom'
import logo from '../../../../assets/images/logo.png'

export const TopHeading = (props) => {
    return (
        <figure>
            <Link to="/">
                    <img src={logo} alt="no image" className="logo_sticky h-25 w-25"/>
            </Link>
        </figure>
    )
}