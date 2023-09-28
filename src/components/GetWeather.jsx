import React, { useEffect, useState } from 'react'
import location from '../assets/location.png';
import {fetchUserWeatherInfo} from './WeatherAPI';
import '../App.css';
import WeatherCard from './WeatherCard';
import loader from '../assets/loading.gif';

const GetWeather = () => {

    const [loacAccess, setloacAccess] = useState(false);
    const [loading,setLoading] = useState(false);
    const [cityName,setCityName] = useState('');
    const [countryIcon,setCountryIcon] = useState('');
    const [desc,setDesc] = useState('');
    const [weatherIcon,setWeatherIcon] = useState('');
    const [temp,setTemp] = useState('');
    const [windspeed,setWindSpeed] = useState('');
    const [humidity,setHumidity] = useState('');
    const [cloudiness,setCloudliness] = useState('');

    function getLocationHandler(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            alert(`No geolocation support available. Find in Search Weather tab`)
        }
    }

    function setAllData(weatherInfo){
        console.log(weatherInfo)
        setCityName(weatherInfo?.name);
        setCountryIcon(`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`);
        setDesc(weatherInfo?.weather?.[0]?.description);
        setWeatherIcon(`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`);
        setTemp(`${weatherInfo?.main?.temp} °C`);
        setWindSpeed(`${weatherInfo?.wind?.speed} m/s`);
        setHumidity(`${weatherInfo?.main?.humidity}%`);
        setCloudliness(`${weatherInfo?.clouds?.all}%`);
        
    }

    async function showPosition(position) {
        const userCoordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        }
        sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
        const weatherInfo = await fetchUserWeatherInfo(userCoordinates);
        setloacAccess(true);
        setLoading(true);
        setAllData(weatherInfo);
        setLoading(false);
    }

    async function getfromSessionStorage() {
        //console.log(sessionStorage)
        const localCoordinates = sessionStorage.getItem("user-coordinates");
        if(!localCoordinates) {
            setloacAccess(false);
        }
        else {
            const userCoordinates = JSON.parse(localCoordinates);
            const weatherInfo = await fetchUserWeatherInfo(userCoordinates);
            setloacAccess(true);
            setAllData(weatherInfo);
        }
    }

    useEffect(() => {
        getfromSessionStorage();
    }, [])

    return (
        
            loacAccess ? ( 
                            loading ?   (<div className="sub-container loading-container">
                                            <img src={loader} width="150" height="150" alt='' />
                                            <p>Loading</p>
                                        </div>) 
                                        :
                                        (<WeatherCard cityName={cityName} countryIcon={countryIcon} desc={desc} weatherIcon={weatherIcon}
                                            temp={temp} windspeed={windspeed} humidity={humidity} cloudiness={cloudiness}
                                        />)
                        )
                        : 
                        (
                            <div className="sub-container grant-location-container"> 
                                <img src={location} width="80" height="80" loading="lazy" alt=''/>
                                <p>Grant Location Access</p>
                                <p>Allow Access to get weather Information</p>
                                <button className='btn' onClick={() => getLocationHandler()}>Grant Access</button>
                            </div>
                        )
        
        
    )
}

export default GetWeather