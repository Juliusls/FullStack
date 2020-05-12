import React from 'react';

const TwoToNineCountries = ({searchResults, setSearchValue}) => {
    return (
        <ul className='noBullet'>
            {searchResults.map(country =>
                    <li className='noBullet' key={country.name}>
                        {country.name}
                        <button className={country.name} onClick={() => setSearchValue(country.name.toLowerCase())}>show</button>
                    </li>)}
        </ul>)
};

const OneCountry = ({searchResults, weatherInfo}) => {
    const country = searchResults[0];
    return (
        <div>
            <div>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>populations {country.population}</p>
                <h2>languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
                <br/>
                <img src={country.flag} alt="country flag" className='countryFlag'/>
            </div>
            <div>
                <h2>weather in {weatherInfo.cityName}</h2>
                <p><b>temperature:</b> {weatherInfo.temperature} Celcius </p>
                <img src={weatherInfo.weatherIcons} alt="weather icon"/>
                <p><b>wind:</b> {weatherInfo.windSpeed} mph direction {weatherInfo.windDirection} </p>
            </div>
        </div>
    )
};

const tooManyCountries = 'Too many countries to display';


const DisplayCountries = ({searchResults, setSearchValue, weatherInfo}) => {
    return (
        <div>
            <ul className='noBullet'>
                {searchResults.length > 10
                    ? tooManyCountries
                : (1 < searchResults.length && searchResults.length < 10)
                    ? <TwoToNineCountries searchResults={searchResults}
                                          setSearchValue={setSearchValue}/>
                : (searchResults.length === 1)
                    ? <OneCountry searchResults={searchResults}
                                  weatherInfo={weatherInfo}/>
                        : ' '}
            </ul>
        </div>
    );
};

export default DisplayCountries;
