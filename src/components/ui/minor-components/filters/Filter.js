import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toTitleCase } from '../../../../constants/helperFunction';
import { getFilteredSoftwares, updateFilteredSoftwares } from '../../../../redux/Actions/SoftwareAction';
import { SoftwareCard } from '../software/SoftwareCard';
import { getSubCategories } from '../../../../redux/Actions/SubCategoryAction';
import { baseURL } from '../../../../constants/baseURL';
import topArrow from '../../../../assets/top-arrow.svg';
import bottomArrow from '../../../../assets/bottom-arrow.svg';
import ReactPaginate from 'react-paginate';
import InputField from '../fields/InputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatesFilter } from './DatesFilter';
import { RatingFilter } from './RatingFilter';
import { Loader } from '../loader/Loader';



export const Filters = () => {

    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { filteredsoftwares } = useSelector(
        (state) => state.softwareReducer
    );

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(filteredsoftwares?.length / itemsPerPage);
    const [categoryName, setCategoryName] = useState('');
    const [searchText, setSearchText] = useState("");
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [myFilteredData, setMyFilteredData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedRating, setSelectedRating] = useState('any');
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState([{
        id: '',
        name: '',
        options: [{
            value: '',
            label: '',
            checked: false
        }]
    }])
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const { SubCategories } = useSelector(
        (state) => state.subCategoryReducer
    );

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    useEffect(() => {
        // Dispatch the action to fetch SubCategories
        const category = toTitleCase(params?.category);
        setCategoryName(category);
        dispatch(getSubCategories());
        
      }, [filteredsoftwares]);
    
      useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.getAll('subcategory')) {
            const selectedSubsFromQuery = queryParams.getAll('subcategory');
          setSelectedSubcategories(selectedSubsFromQuery);
        }
      }, [dispatch]);
      
    
    
      // Update URL with selected subcategories
      useEffect(() => {
        const params = new URLSearchParams(location.search);
        params.delete('subcategory');
        selectedSubcategories.forEach((sub) => params.append('subcategory', sub));
        navigate(`?${params.toString()}`, { replace: true });

        // Fetch filtered data using selectedSubcategories as needed
        // Dispatch action to fetch filtered data based on selectedSubcategories
        // dispatch(getFilteredSoftwares(category, selectedSubcategories));
    }, [selectedSubcategories]);
    
    
      useEffect(() => {
        // This useEffect runs whenever SubCategories array changes
        // Make sure it has data before using it
          
        // Check if SubCategories array is not empty before using it
          
          if (SubCategories.length > 0) {
            const matchingSubCategory = SubCategories.find(
                (subcategory) =>
                  subcategory.categoryId.categoryName.toLowerCase() === categoryName.toLowerCase()
            );
            const filterOptions = matchingSubCategory
                ? matchingSubCategory.subcategory.map((sub) => ({
                    value: sub, // Convert to kebab-case
                    label: sub
                        .split(' ')
                        .map((word) => word)
                        .join(' '),
                    checked: false,
                    }))
            : [];
            setFilters([{
                id: 'subcategory',
                name: 'Related Subcategories',
                options: filterOptions
            }])

        }
      }, [categoryName, SubCategories,dispatch, location.search]);


    // Function to handle checkbox click
    const handleCheckboxClick = (e) => {
        // Toggle the selected subcategory
        const value = e.target.value;
        setSelectedSubcategories((prevSelected) => {
          if (prevSelected.includes(value)) {
            // If the subcategory is already selected, remove it
            return prevSelected.filter((sub) => sub !== value);
          } else {
            // If the subcategory is not selected, add it
            return [...prevSelected, value];
          }
        });
      };

    // Dispatch the API call with selected filters
    const callApiWithSelectedFilters = () => {
        if (categoryName) {
            dispatch(getFilteredSoftwares(categoryName, selectedSubcategories, selectedFilter, selectedRating));
        }
    };
    
    useEffect(() => {
        // Update the local state 'softwares' whenever 'filteredsoftwares' changes
        setData(filteredsoftwares);
      }, [filteredsoftwares]);

    // Call the function whenever the selectedSubcategories or categoryName changes
    useEffect(() => {
        callApiWithSelectedFilters();
    }, [selectedSubcategories]);
    

    const handleChange = value => {
        setSearchText(value);
        filterData(value);
    };
    
    // filter records by search text
    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") setData(filteredsoftwares)  ;
        else {
            const filteredData = filteredsoftwares.slice(pagesVisited, pagesVisited + itemsPerPage).filter(item => {
                return Object.keys(item).some(key =>
                    item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });
            setData(filteredData);
            setMyFilteredData(filteredData);
        }
    }

    const handleFilterChange = (filterValue) => {
        setSelectedFilter(filterValue)
    };

    useEffect(() => {
        if (selectedFilter !== '') {
            if (selectedFilter === 'latest') {
                callApiWithSelectedFilters();
              } else if (selectedFilter === 'oldest') {
                callApiWithSelectedFilters();
              } else {
                // If the filter type is 'all', reset the filtered software to the original state
                callApiWithSelectedFilters();
              }
        }
    }, [selectedFilter])

    const handleRatingChange = (filterValue) => {
        setSelectedRating(filterValue)
    };
    
    useEffect(() => {
        if (selectedRating !== '') {
            if (selectedRating === '4.5') {
                callApiWithSelectedFilters();
              } else if (selectedRating === '4') {
                callApiWithSelectedFilters();
              } else if (selectedRating === '3') {
                callApiWithSelectedFilters();
              } else {
                // If the filter type is 'all', reset the filtered software to the original state
                callApiWithSelectedFilters();
              }
        }
    }, [selectedRating])




    return (
        <>
            
            {/* /results */}
            <div className="container margin_60_35 mt-25" style={{marginTop : '100px'}}>
                <div className="row">
                    <aside className="col-lg-3" id="sidebar" style={{marginBottom : "100px"}}>
                        <div id="filters_col">
                        <a
                            data-bs-toggle="collapse"
                            href="#collapseFilters"
                            aria-expanded="false"
                            aria-controls="collapseFilters"
                            id="filters_col_bt"
                        >
                            Filters{" "}
                        </a>
                        <div className="collapse show" id="collapseFilters">
                                <div className="filter_type date_filter">
                                    <h6>Date</h6>
                                    <DatesFilter
                                        handleFilterChange={handleFilterChange}
                                    />
                                </div>
                                <div className="filter_type">
                                    <h6>Rating</h6>
                                    <RatingFilter
                                        handleRatingChange={handleRatingChange}
                                    />
                                </div>
                                <div className="filter_type">
                                    {filters.map((section) => (
                                        <>
                                            <h6>{section.name}</h6>
                                            <ul>
                                                {section.options.map((option, optionIdx) => (
                                                    <li key={option.value}>
                                                        <label className="container_check">
                                                            {option.label}
                                                            {/* <small>43</small> */}
                                                            <input type="checkbox"
                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                onClick={handleCheckboxClick}
                                                                defaultValue={option.value}
                                                                defaultChecked={option.checked}
                                                            />
                                                            <span className="checkmark" />
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/*/filters col*/}
                    </aside>
                    <div className="col-lg-9">
                        <div className="isotope-wrapper">
                            <div className='d-flex justify-content-between mb-3' style={{marginTop : '-83px'}}>
                                <div className="d-flex align-items-end gap-2 h-12">
                                    <h6 className="text-xs">Show</h6>
                                    <div className="d-flex flex-grow-1">
                                        <InputField
                                            type="text"
                                            value={itemsPerPage}
                                            disabled={true}
                                            extra={'d-flex align-items-center'}
                                            style={{ maxWidth: "80px" }}
                                        />
                                        <div style={{marginLeft: '5px'}} className="d-flex flex-column align-items-center gap-2 justify-content-center">
                                            <img
                                                onClick={(e) =>
                                                setItemsPerPage(itemsPerPage < filteredsoftwares.length ? itemsPerPage + 1 : itemsPerPage)
                                                }
                                                className="w-2 cursor-pointer"
                                                src={topArrow}
                                                alt="top-arrow"
                                            />
                                            <img
                                                onClick={(e) => setItemsPerPage(itemsPerPage > 5 ? itemsPerPage - 1 : itemsPerPage)}
                                                className="w-2 cursor-pointer"
                                                src={bottomArrow}
                                                alt="bottom-arrow"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column justify-content-between gap-2">
                                    <InputField
                                        placeholder="Type to search..."
                                        value={searchText}
                                        onChange={(e) => handleChange(e.target.value)}
                                        type="text"
                                    />
                                </div>
                            </div>
                            {!loading ? 
                                <>
                                    <div className="row">
                                        {!searchText ? <>
                                            {filteredsoftwares.slice(pagesVisited, pagesVisited + itemsPerPage).map((software) => (
                                                <>
                                                    <SoftwareCard
                                                        softwareId={software._id}
                                                        softwareName={software?.softwareName}
                                                        softwareLogo={baseURL + software.softwareLogo}
                                                        softwaredescription={software.description}
                                                        rating={software?.averageRating}
                                                        totalRatings={software?.feedbacks?.length}
                                                    />
                                                </>
                                            ))}
                                        </> : <>
                                            {myFilteredData.map((software) => (
                                                <>
                                                    <SoftwareCard
                                                        softwareId={software._id}
                                                        softwareName={software.softwareName}
                                                        softwareLogo={baseURL + software.softwareLogo}
                                                        softwaredescription={software.description}
                                                        rating={software?.averageRating}
                                                        totalRatings={software?.feedbacks?.length}
                                                    />
                                                </>
                                            ))}  
                                        </>}
                                        {data.length === 0 && (
                                            <p className="py-4 px-2 font-weight-bold text-center text-danger">
                                                No Records Found By This Keyword
                                            </p>
                                        )}

                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="text-xs text-left">
                                            Showing {filteredsoftwares.slice(pagesVisited, pagesVisited + itemsPerPage).length} results of {filteredsoftwares.length}
                                        </p>
                                        <div className="d-flex justify-center">
                                        <div className="pagination__wrapper add_bottom_15">
                                                <ReactPaginate
                                                    previousLabel={<FontAwesomeIcon icon="fa-solid fa-chevron-left" />}
                                                    nextLabel={<FontAwesomeIcon icon="fa-solid fa-chevron-right" />}
                                                    pageCount={pageCount}
                                                    onPageChange={changePage}
                                                    containerClassName={"pagination"}
                                                    previousLinkClassName={"prev"}
                                                    nextLinkClassName={"next"}
                                                    disabledClassName={"disabled"}
                                                    activeClassName={"active"}
                                                />
                                        </div>
                                            
                                        </div>
                                    </div>
                                </>
                            : (<Loader />)}
                        </div>
                    </div>
                </div>
            </div>
                    
        </>  
  )
}
