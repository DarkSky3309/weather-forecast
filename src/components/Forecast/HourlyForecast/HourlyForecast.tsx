import React, {FC, useEffect, useState} from 'react';
import getFormattedWeatherData, {getFormattedHourlyWeatherData} from "../../../services/weatherService";
import {DateTime} from "luxon";
import HourComponent from "./HourComponent";
import {UNITS} from "../../../enum";

interface HourlyForecastProps {
    timezone: number,
    city: string,
    units: UNITS
}

const HourlyForecast: FC<HourlyForecastProps> = ({timezone, city, units}) => {
    const [data, setData]: any = useState();
    const [isDataReceived, setIsDataReceived] = useState(false);

    const fetchHourlyWeather = async () => {
        let data:any
        try {
            data = await getFormattedHourlyWeatherData( {q: city, units: units});
        } catch (e) {console.error(e)}
        finally {
            setIsDataReceived(true)
        }
        setData(data)
    }
    useEffect(() => {
        fetchHourlyWeather()
    }, [city])
    console.log(data)
    const renderHourlyForecast = () => {
        if (isDataReceived){
            return data.list.map((data:any, index:number) => {return <HourComponent key={index} icon={data.weather[0].icon} dt={data.dt} temp={data.main.temp} timezone={timezone}/>})
        }
    }

    return (
        <div className={"w-full overflow-scroll flex"}>
            {renderHourlyForecast()}
        </div>
    );
};

export default HourlyForecast;