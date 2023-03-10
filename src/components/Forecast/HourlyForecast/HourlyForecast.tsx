import React, {FC, useEffect, useState} from 'react';
import getFormattedWeatherData, {getFormattedHourlyWeatherData} from "../../../services/weatherService";
import {DateTime, Info} from "luxon";
import HourComponent from "./HourComponent";
import {UNITS} from "../../../enum";
import weekdays = Info.weekdays;

interface HourlyForecastProps {
    timezone: number,
    city: string,
    units: UNITS,
    selectedDay: string,
}

const HourlyForecast: FC<HourlyForecastProps> = ({timezone, city, units, selectedDay}) => {
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
    const renderHourlyForecast = (selectedDay: string) => {
        if (isDataReceived){
            return data.list.map((data:any, index:number) => {
                let day = DateTime.fromSeconds(data.dt).setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).toLocaleString({weekday: "long"})
                console.log(day, selectedDay);
                if (day === selectedDay)
                    return <HourComponent key={index} icon={data.weather[0].icon} dt={data.dt} temp={data.main.temp} timezone={timezone}/>
                else return
            })
        }
    }

    return (
        <div className={"w-full overflow-scroll flex"}>
            {renderHourlyForecast(selectedDay)}
        </div>
    );
};

export default HourlyForecast;