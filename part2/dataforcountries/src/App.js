import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import DisplayCountries from "./components/DisplayCountries";
import FilterCountries from "./components/FilterCountries";

//TODO
// check if the structure of the project is good

const App = () => {
    const [ countries, setCountries ] = useState([]);
    const [ searchValue, setSearchValue ] = useState('');
    const [ searchResults, setSearchResults] = useState([]);
    const [ weatherInfo, setWeatherInfo ] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;

    const handleSearchValue = (e) => {
      setSearchValue(e.target.value);
    };

    useEffect(() => {
      axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
              setCountries(response.data)
          }).catch(error => {
          console.log('Error in fetching countries data', error)
      })
        }, []);

    useEffect(() => {
      const result = countries.filter(country =>
          country.name.toLowerCase().includes(searchValue)
      );
      setSearchResults(result);
    }, [countries, searchValue]);


    useEffect(() => {
        if (searchResults.length === 1) {
            const weatherURL =`http://api.weatherstack.com/current?access_key=${apiKey}&query=${searchResults[0].capital.toLowerCase()}`;
            axios
                .get(weatherURL)
                .then(response => {
                    const responseData = {
                        cityName: response.data.location.name,
                        temperature: response.data.current.temperature,
                        weatherIcons: response.data.current.weather_icons,
                        windSpeed: response.data.current.wind_speed,
                        windDirection: response.data.current.wind_dir
                    };
                    setWeatherInfo(responseData);
                }).catch(error => {
                console.log('Error in fetching weather data', error)
            })
        }
    }, [searchResults, apiKey]);

    return (
      <div>
          <FilterCountries searchValue={searchValue} handleSearchValue={handleSearchValue}/>
          <DisplayCountries searchResults={searchResults}
                            setSearchValue={setSearchValue}
                            weatherInfo={weatherInfo}/>
      </div>
    );
};

export default App;
