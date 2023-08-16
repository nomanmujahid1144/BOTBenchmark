import { useEffect } from "react";
import { getSubCategories } from "../../../../redux/Actions/SubCategoryAction";
import { CategoryCard } from "./CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../../../constants/baseURL";
import { HeroCategory } from "./CatrgoryHero";
import { Headings } from "../../minor-components/main-heading/Heading";
import { generateLightColor, toSnakeCase } from "../../../../constants/helperFunction";

export const AllCategories = () => {

    const dispatch = useDispatch();

    const { SubCategories } = useSelector(
        (state) => state.subCategoryReducer
    )

    useEffect(() => {
        dispatch(getSubCategories());
    }, [])

    
    return (
        <>
            <HeroCategory />
            <Headings
                extras='md:px-32 px-10'
                Heading="Categories We Have"
                isSubHeading={false}                    
            />
            <div class="grid gap-4 mt-10 md:px-32 px-10 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                {SubCategories.map((subcategory, index) => (
                    <CategoryCard
                        CategoryName={subcategory.categoryId.categoryName}
                        CategoryImage={baseURL + subcategory.categoryId.categoryImage}
                        backgroundColor={generateLightColor(subcategory.categoryId.categoryName)}
                        goTo={`/categories/${toSnakeCase(subcategory.categoryId.categoryName)}`}    
                        SubCategories={subcategory.subcategory}
                    />
                ))}
            </div>
        </>
    )
}