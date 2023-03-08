import React, {FC, useEffect, useState} from 'react';
import {INFO} from "../../enum";
import CurrentForecast from "./CurrentForecast";
import {iconUrlFromCode} from "../../services/weatherService";


interface forecastType {
    data: any,
    isDataReceived: boolean
}


const Forecast: FC<forecastType> = ({data, isDataReceived}) => {
    let {month, day, hour, minutes, date, year} = convertTime(data.dt)
    let currentDate = new Date(Date.now())

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
        <div className={"flex items-center justify-center text-white colum flex-col"}>
            <CurrentForecast icon={data.icon} country={data.country} name={data.name}
                             details={data.details} feels_like={data.feels_like} humidity={data.humidity}
                             speed={data.speed} sunrise={data.sunrise} sunset={data.sunset} temp_max={data.temp_max}
                             temp_min={data.temp_min} convertTime={convertTime}/>

        </div>
    );
};

export default Forecast;