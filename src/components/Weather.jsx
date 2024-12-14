import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import snow from '../assets/snow.png'
import rain from '../assets/rain.png'


const Weather = () => {
    // Set initial dummy data
    const [Wdata, setWdata] = useState({
        humidity: 70, // Example humidity
        wind: 15,     // Example wind speed in km/h
        temp: 25,     // Example temperature in Celsius
        location: "Dummy City", // Example city name
        icon: clear   // Example weather icon
    });
    const [city, setCity] = useState("delhi");

    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    }
    

    const search = async (city) => {
        try {
            
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clear ;
           
            setWdata({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                weather: data.weather[0].main
            });
            setCity('');
        } catch (error) {
            alert("Error fetching weather data");
        }
    }

    useEffect(() => {
        search("delhi");
    }, [])

    return (
        <div className="weather">
            <div className="search-bar">
                <input
                    value={city}
                    type="text"
                    placeholder='Search'
                    onChange={(e) => setCity(e.target.value)}
                />
                <img
                    src={search_icon}
                    alt="search icon"
                    onClick={() => search(city)}
                />
            </div>
            <div className="main">
            <img src={Wdata.icon} alt="" className='weather-icon' />
            </div>
            <div className="w">{Wdata.weather}</div>
            <p className="temp"> {Wdata.temp}°C </p>
            <p className="location">{Wdata.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity} alt="" />
                    <div>                        
                        <p>{Wdata.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind} alt="" />
                    <div>
                        <p>{Wdata.wind} km/h</p>
                        <span>Wind speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
