import React, { useState } from 'react'
import search from '../assets/search.png'
import { fetchSearchWeatherInfo } from './WeatherAPI';
import WeatherCard from './WeatherCard';

const SearchWeather = () => {

    const [city, setCity] = useState('');
    const [loading,setLoading] = useState(true);
    const [cityName,setCityName] = useState('');
    const [countryIcon,setCountryIcon] = useState('');
    const [desc,setDesc] = useState('');
    const [weatherIcon,setWeatherIcon] = useState('');
    const [temp,setTemp] = useState('');
    const [windspeed,setWindSpeed] = useState('');
    const [humidity,setHumidity] = useState('');
    const [cloudiness,setCloudliness] = useState('');

    const cityNameHandler = event => {
        setCity(event.target.value)
    }

    const submitHandler = async(event) => {
        setLoading(true)
        event.preventDefault();
        const weatherInfo = await fetchSearchWeatherInfo(city)

        setCityName(weatherInfo?.name);
        setCountryIcon(`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`);
        setDesc(weatherInfo?.weather?.[0]?.description);
        setWeatherIcon(`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`);
        setTemp(`${weatherInfo?.main?.temp} °C`);
        setWindSpeed(`${weatherInfo?.wind?.speed} m/s`);
        setHumidity(`${weatherInfo?.main?.humidity}%`);
        setCloudliness(`${weatherInfo?.clouds?.all}%`);

        setLoading(false)
    }

    return (
        <div>
            <form className="form-container active">
                <input 
                    type='text'
                    placeholder="Search for City..." 
                    name="City"
                    value={city}
                    onChange={cityNameHandler}
                />
                <button className="btn" onClick={submitHandler}>
                    <img src={search}  width="20" height="20" loading="lazy" alt='' />
                </button>
            </form>

            {loading ?  (
                        <div></div>
                        ) 
                        : 
                        (<WeatherCard cityName={cityName} countryIcon={countryIcon} desc={desc} weatherIcon={weatherIcon}
                            temp={temp} windspeed={windspeed} humidity={humidity} cloudiness={cloudiness}
                        />)
            }
        </div>
        
    )
}

export default SearchWeather