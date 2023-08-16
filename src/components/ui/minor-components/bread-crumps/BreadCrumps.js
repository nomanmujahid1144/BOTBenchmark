import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const BreadCrumps = () => {
    return (
        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
            <ul className="tracking-[0.5px] mb-0 inline-block">
                <li className="inline uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
                    <Link to="/" >Bot Banchers</Link>
                    <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                </li>
                <li className="inline text-base text-white/50 mx-0.5">
                    <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                </li>
                <li className="inline uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
                    <a href="">Company</a>
                </li>
                <li className="inline text-base text-white/50 mx-0.5">
                    <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                </li>
                <li className="inline uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">
                    Services
                </li>
            </ul>
        </div>
    )
}