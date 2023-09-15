import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../redux/Actions/CategoryActions";
import { baseURL } from "../../../../constants/baseURL";
import { toSnakeCase, toTitleCase } from "../../../../constants/helperFunction";
import { Headings } from "../../minor-components/main-heading/Heading";
import { CategoryCard } from "./CategoryCard";

export const Category = () => {

    const dispatch = useDispatch();

    const { categories } = useSelector(
        (state) => state.categoryReducer
    )

    useEffect(() => {
        dispatch(getCategories());
    },[])

    return (
        <>
            {categories?.length > 0 ? 
                <div className="container margin_60_35">
                    <Headings
                        Heading={"Top Categories"}
                        isSubHeading={false}
                        subHeading="Cum doctus civibus efficiantur in imperdiet deterruisset."
                        goto={"/categories"}
                    />
                    <div className="row justify-content-center">
                        {categories.map(category => (
                            <CategoryCard
                                key={category._id}
                                goTo={`/categories/${toSnakeCase(category.categoryName)}`}
                                categoryName={toTitleCase(category.categoryName)}
                                categoryImage={baseURL + category.categoryImage}
                                totalSoftwares={category.totalSoftwares}
                            />
                        ))}
                    </div>
                </div>
            : null }
        </>
    )
}