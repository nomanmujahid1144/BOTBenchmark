import { useState } from 'react';
import Image from '../../../../assets/images/bg3.png';
import { axiosInstance } from '../../../../constants/axiosInstance';
import StarRating from '../../minor-components/ratings/StarRating';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HeroSection = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleClickOptions = () => {
        setIsOpen(!isOpen);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search');
        setSearchResults([
            { id: 1, name: 'Software A' },
            { id: 2, name: 'Software B' },
            { id: 3, name: 'Software C' },
            // Add more search results here
          ]);
    }

    const handleSearch = async (query) => {
        try {
            if (query.length > 0) {
                const response = await axiosInstance.get(`/api/v1/software/getsearchsoftwares?query=${query}`);
                setSearchResults(response?.data?.data);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };


    const handleChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
        handleSearch(value);
      };

    return (
        <section className="hero_single version_3">
            <div className="wrapper">
                <div className="container" style={{textAlign : 'center'}}>
                    <h1>Explore and review the best AI tools</h1>
                    {/* <p>Check Ratings of Businesses, Read Reviews &amp; Buy</p> */}
                    <div className="row justify-content-center mt-3">
                        <div className="col-lg-9">
                            <form onSubmit={handleSubmit}>
                                <div className="row w-100 w-md-75 g-0 custom-search-input-2">
                                    <div className="col-lg-9">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Search for a Software..."
                                                value={searchQuery}
                                                onChange={handleChange}
                                            />
                                            <i className="icon_search" />
                                            {searchResults.length > 0 && (
                                                <div className="rounded mt-1 bg-light text-dark p-2">
                                                    <div class="row justify-content-center">
                                                        <div className="col-lg-12">
                                                            <div className="all_categories clearfix add_bottom_30">
                                                                <ul>
                                                                    {searchResults.length > 0 ? 
                                                                        <>
                                                                            {searchResults.map((software) => (
                                                                                <li key={software.id} className='text-center'>
                                                                                    <Link to={`/review/${software.id}/${software.name}`} >
                                                                                        <strong>
                                                                                            <FontAwesomeIcon icon="fa-solid fa-star" />
                                                                                            <span style={{marginLeft : '4px'}}>{software?.rating}</span>
                                                                                        </strong>
                                                                                        {software.name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </>
                                                                    :(
                                                                        <p>No Software Found</p> 
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* /row */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
   ) 
}