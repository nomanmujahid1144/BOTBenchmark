import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const BackBtn = () => {
    return (
        <div className="fixed bottom-3 end-3">
            <Link to='/' className="back-button h-9 w-9 inline-flex items-center justify-center tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-full">
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            </Link>
        </div>
    )
}