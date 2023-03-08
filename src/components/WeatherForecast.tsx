import React, {useEffect, useState} from 'react';
import Navigation from "./Navigation";
import {UNITS} from "../enum";
import getFormattedWeatherData from "../services/weatherService";
import Forecast from "./Forecast/Forecast";
import Loader from "./Loader";



const WeatherForecast = () => {
    const [city, setCity] = useState('Dnepr');
    const [units, setUnits] = useState(UNITS.metric);
    const [data, setData]:any = useState();
    const [isDataReceived, setIsDataReceived] = useState(false);
    const fetchWeather = async () => {
        let data:any
        try {
            data = await getFormattedWeatherData( {q: city, units: units});
        } catch (e) {console.error(e)}
            finally {
            setIsDataReceived(true)
        }
        console.log(data)
        setData(data)
    }

    useEffect(() => {
        fetchWeather()
    }, [city])

    return (
        <div className={`bg-cold max-w-5xl h-screen bg-deep-cold bg-cover bg-no-repeat bg-center mx-auto`}>
            <Navigation setCity={setCity}/>
            {isDataReceived ?
                <Forecast data={data} isDataReceived={isDataReceived}/> :
                <Loader/>
            }
        </div>
    );
};

export default WeatherForecast;