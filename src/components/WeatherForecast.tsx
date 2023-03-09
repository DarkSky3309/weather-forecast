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
    }, [city, units])

    return (
        <div className={`bg-cold max-w-5xl h-screen bg-deep-cold bg-cover bg-no-repeat bg-center mx-auto`}>
            <Navigation setCity={setCity} setUnits={setUnits}/>
            <div className={"mt-5"}>
                {isDataReceived ?
                    <Forecast city={city} data={data} units={units}/> :
                    <Loader/>
                }
            </div>

        </div>
    );
};

export default WeatherForecast;