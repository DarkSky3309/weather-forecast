import React, {useState} from 'react';
import Navigation from "./Navigation";
import {UNITS} from "../enum";
import getFormattedWeatherData from "../services/weatherSrvice";

interface W {

}

const WeatherForecast = () => {
    const [city, setCity] = useState('Kyiv');
    const [units, setUnits] = useState(UNITS.metric);
    const fetchWeather = async () => {
        const data = await getFormattedWeatherData( {q: city, units: units});
        return data
    }
    const data:any = fetchWeather();


    return (
        <div className={`bg-cold max-w-5xl h-screen bg-deep-cold bg-cover bg-no-repeat bg-center mx-auto`}>
            <Navigation/>
        </div>
    );
};

export default WeatherForecast;