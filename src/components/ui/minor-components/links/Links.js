import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const SocialLinks = ({size, softwareLink, softwarePhone, softwareEmail}) => {
    return (
        <>
            {softwareLink ? 
                <a href={softwareLink.includes("://") ? softwareLink : `http://${softwareLink}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-indigo-600/5 hover:text-indigo-600 ${size} font-bold rounded`}>
                    <FontAwesomeIcon icon="fa-solid fa-globe" />
                </a>
                : null}
            {softwareEmail ? 
                <a href={`mailto:${softwareEmail}`} className={`bg-indigo-600/5 hover:text-indigo-600 ${size} font-bold rounded`}>
                    <FontAwesomeIcon icon="fa-solid fa-envelope" />
                </a>
                : null}
            {softwarePhone ? 
                <a href={`tel:${softwarePhone}`} className={`bg-indigo-600/5 hover:text-indigo-600 ${size} font-bold rounded`}>
                    <FontAwesomeIcon icon="fa-solid fa-phone" />
                </a>
            : null}
        </>
    )
}