import { LatestReviews } from "../minor-components/ratings/LatestReviews";
import { Category } from "./category-section/Category";
import { HeroSection } from "./hero-section/HeroSection";

export const Index = () => {
    return (
        <>
            <HeroSection />
            <Category />
            <LatestReviews />            
        </>
    )
}