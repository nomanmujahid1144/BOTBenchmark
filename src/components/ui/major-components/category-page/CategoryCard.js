import { Link } from "react-router-dom"
import { toSnakeCase } from "../../../../constants/helperFunction"

export const CategoryCard = ({ CategoryName, CategoryImage, goTo, backgroundColor, SubCategories }) => {
    return (
        <div className="w-full">
            <Link to={goTo} className="group bg-white dark:bg-slate-900 block rounded-md overflow-hidden relative shadow dark:shadow-gray-800 m-2" >
                <span className={`px-2 py-4 block text-center`} style={{backgroundColor : `${backgroundColor}`}}>
                    <svg
                        className={` mx-auto h-14 w-14 mb-3 cursor-pointer `}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" // Replace with the appropriate viewBox for your SVG
                    >
                    <image
                        xlinkHref={CategoryImage}
                        height="100%"
                        width="100%"
                        preserveAspectRatio="xMidYMid slice"
                    />
                    </svg>
                    <span className="text-xl font-bold group-hover:text-indigo-600 transition-all duration-500 ease-in-out">
                        {CategoryName}
                    </span>
                </span>
                <ul class="py-6 list-none">
                    {SubCategories.map((subcategory, index) => (
                        <Link to={`${goTo}?subcategory=${toSnakeCase(subcategory)}`}>
                            <li key={index+subcategory} class="flex items-center me-4 text-lg text-slate-400 py-2 px-3 hover:text-indigo-600 border-y border-gray-100 dark:border-gray-800">
                                {subcategory}
                            </li>
                        </Link>
                    ))}
                </ul>
            </Link>
        </div>
    )
}