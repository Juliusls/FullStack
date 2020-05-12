import React from 'react';

const FilterCountries = ({searchValue, handleSearchValue}) => {
    return (
        <div className='searchField'>
            Find countries: <input value={searchValue}
                                   onChange={handleSearchValue}/>
        </div>
    );
};


export default FilterCountries;
