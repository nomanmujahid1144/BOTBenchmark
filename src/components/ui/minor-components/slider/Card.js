import { Link } from "react-router-dom"

export const SliderCard = ({ categoryName, categoryImage, goTo, totalSoftwares, key }) => {
    return (
        <Link to={goTo} className="group bg-white rounded dark:bg-slate-900 block p-6 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 border-4 border-white dark:border-slate-900 border-y-indigo-600  text-center transition duration-500 h-fit">
            <svg
                className={`h-16 w-16 mx-auto p-3 rounded-lg bg-gray-50 dark:bg-slate-800 shadow-md dark:shadow-gray-800`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" // Replace with the appropriate viewBox for your SVG
                >
                <image
                    xlinkHref={categoryImage}
                    height="100%"
                    width="100%"
                    preserveAspectRatio="xMidYMid slice"
                />
            </svg>
            <div className="content mt-3">
                <span className="text-lg font-semibold group-hover:text-indigo-600 transition duration-500 block">
                    {categoryName}
                </span>
                <span className="text-base text-slate-400 block">
                    <i className="uil uil-map-marker text-indigo-600 me-1" /> {totalSoftwares} Softwares
                </span>
            </div>
        </Link>

    )
}