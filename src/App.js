import './App.css';
import React, { useState } from 'react'
import GetWeather from './components/GetWeather';
import SearchWeather from './components/SearchWeather';

const App = () => {
    
    const [tab,setTab] = useState(true);
    const [get,setGet] = useState("tab current-tab");
    const [search,setSearch] = useState("tab")

    function tabHandler(flag){
        if(flag){
            setTab(true);
            setGet("tab current-tab");
            setSearch("tab");

        } else{
            setTab(false);
            setGet("tab");
            setSearch("tab current-tab");
        }
    }

    return (
        <div className="wrapper">
            <h1>Weather Today</h1>

            <div className="tab-container">
                <p className={get} onClick={() => tabHandler(true)}>Your Weather</p>
                <p className={search} onClick={() => tabHandler(false)}>Search Weather</p>
            </div>

            <div className="weather-container">
                {
                    tab ? (<GetWeather />) 
                        : (<SearchWeather />)

                }
            </div>
        </div>
  );
}

export default App;
