import { useState } from "react";
export const DatesFilter = ({ handleFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const handleRadioChange = (event) => {
        const filterValue = event.target.value;
        setSelectedFilter(filterValue);
        handleFilterChange(filterValue);
    };
    return (
        <ul>
            <li>
                <label className="container_radio">
                All
                <input
                    type="radio"
                    value="all"
                    name="filters_listing"
                    checked={selectedFilter === 'all'}
                    onChange={handleRadioChange}
                    data-filter="*"
                    className="selected"
                />
                <span className="checkmark" />
                </label>
            </li>
            <li>
                <label className="container_radio">
                Latest
                <input
                    type="radio"
                    value="latest"
                    name="filters_listing"
                    checked={selectedFilter === 'latest'}
                    onChange={handleRadioChange}
                    data-filter=".latest"
                />
                <span className="checkmark" />
                </label>
            </li>
            <li>
                <label className="container_radio">
                Oldest
                <input
                    type="radio"
                    value="oldest"
                    name="filters_listing"
                    checked={selectedFilter === 'oldest'}
                    onChange={handleRadioChange}
                    data-filter=".oldest"
                />
                <span className="checkmark" />
                </label>
            </li>
        </ul>
    )
}