import React from 'react';
import wind from '../assets/wind.png';
import humid from '../assets/humidity.png';
import cloud from '../assets/cloud.png';

const WeatherCard = ({cityName, countryIcon, desc, weatherIcon, temp, windspeed, humidity, cloudiness}) => {

    return (
            <div className="sub-container user-info-container">

                <div className="name">
                    <p>{cityName}</p>
                    <img src={countryIcon} alt='' />
                </div>

                <p>{desc}</p>
                <img src={weatherIcon} alt='' />
                <p>{temp}</p>

                <div className="parameter-container">
                    <div className="parameter">
                        <img src={wind} alt='' />
                        <p>windspeed</p>
                        <p>{windspeed}</p>
                    </div>
                    <div className="parameter">
                        <img src={humid} alt='' />
                        <p>humidity</p>
                        <p>{humidity}</p>
                    </div>
                    <div className="parameter">
                        <img src={cloud} alt='' />
                        <p>Clouds</p>
                        <p>{cloudiness}</p>
                    </div>
                </div>
            </div>
    )
}

export default WeatherCard