import React, {FC, useEffect, useState} from 'react';
import {INFO} from "../../enum";

interface currentForecastProps{
    name: string,
    country: string,
    details: string,
    icon:string,
    humidity: number,
    speed: number,
    feels_like: number,
    temp_max:number,
    temp_min: number,
    sunset: number,
    sunrise: number
    convertTime: (dt:number) => {day:number, hour:number, minutes:number, month:number, date: number, year:number, seconds: number}
}

const CurrentForecast:FC<currentForecastProps> = ({ details, feels_like, icon, sunset, sunrise, humidity, speed, temp_max, temp_min, name, country, convertTime}) => {
    const [dt, setDt] = useState(Date.now);
    let {year, month, date, day, hour, minutes, seconds} = convertTime(dt);

    const refreshTime = async () => {
        setTimeout(() => {refreshTime()}, 1000)
        formatDate()
        setDt(Date.now)
    }

    const formatDate = () =>{
        if (hour.toString().length === 1)
            hour = "0" + hour
    }


    useEffect(() => {refreshTime()},[])
    return (
        <div className={"flex flex-col gap-3 items-center"}>
            <div className={"text-5xl uppercase font-semibold"}>{name + ", " + country}</div>
            <div>{`${INFO.day[day]}, ${date} ${INFO.month[month]} ${year} | Local time: ${hour}:${minutes}:${seconds}`}</div>

        </div>
    );
};

export default CurrentForecast;