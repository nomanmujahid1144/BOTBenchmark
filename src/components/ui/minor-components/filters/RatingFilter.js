import { useState } from "react";

export const RatingFilter = ({handleRatingChange}) => {

    const [selectedRating, setSelectedRating] = useState('any');


    const ratingOptions = [
        { label: 'Any', value: 'any' },
        { label: 'Superb', value: 4.5 },
        { label: 'Good', value: 4.0 },
        { label: 'Average', value: 3.0 },
    ];

    const handleRatingClick = (value) => {
        setSelectedRating(value);
        handleRatingChange(value)
    };
    
    return (
        <ul>
            {ratingOptions.map((option) => (
                <li key={option.value}>
                    <label className="container_radio">
                    {option.label} {option.label === 'Any' ? "" :  option.value + "+"} 
                    <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === option.value}
                        onChange={() => handleRatingClick(option.value)}
                    />
                    <span className="checkmark" />
                    </label>
                </li>
            ))}
        </ul>
    )
}