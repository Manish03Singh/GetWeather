import API_KEY from "../weatherAPIkey";

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err)
    }

}

async function fetchSearchWeatherInfo(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err)
    }
}

export { 
        fetchUserWeatherInfo,
        fetchSearchWeatherInfo
    }