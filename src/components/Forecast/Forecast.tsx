import React, {FC} from 'react';
import CurrentForecast from "./CurrentForecast/CurrentForecast";
import {UNITS} from "../../enum";


interface forecastType {
    data: any,
    units:UNITS
}


const Forecast: FC<forecastType> = ({data, units}) => {

    //create function for refresh time


    function convertTime(dt: number) {
        const time = new Date(Number(dt))
        return {
            day: time.getDay() - 1,
            hour: time.getHours(),
            minutes: time.getMinutes(),
            month: time.getMonth(),
            date: time.getDate(),
            year: time.getFullYear(),
            seconds: time.getSeconds()
        }
    }

    return (
        <div className={"flex items-center justify-center text-white colum flex-col w-10/12 mx-auto"}>
            <CurrentForecast units={units} temp={data.temp} timezone={data.timezone} icon={data.icon} country={data.country} name={data.name}
                             details={data.details} feels_like={data.feels_like} humidity={data.humidity}
                             speed={data.speed} sunrise={data.sunrise} sunset={data.sunset} temp_max={data.temp_max}
                             temp_min={data.temp_min} />

        </div>
    );
};

export default Forecast;