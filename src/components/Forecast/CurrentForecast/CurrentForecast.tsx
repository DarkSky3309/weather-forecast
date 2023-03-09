import React, {FC, useEffect, useState} from 'react';
import {DateTime} from "luxon";
import LocationAndTime from "./LocationAndTime";
import CurrentWeather from "./CurrentWeather";

interface currentForecastProps {
    timezone: number,
    name: string,
    country: string,
    details: string,
    icon: string,
    humidity: number,
    speed: number,
    temp: number,
    feels_like: number,
    temp_max: number,
    temp_min: number,
    sunset: number,
    sunrise: number
    convertTime: (dt: number) => { day: number, hour: number, minutes: number, month: number, date: number, year: number, seconds: number }
}

const CurrentForecast: FC<currentForecastProps> = ({
                                                       timezone,
                                                       details,
                                                       feels_like,
                                                       icon,
                                                       sunset,
                                                       sunrise,
                                                       humidity,
                                                       speed,
                                                       temp_max,
                                                       temp_min,
                                                       name,
                                                       country,
                                                       convertTime,
                                                       temp
                                                   }) => {
    const [dt, setDt] = useState(DateTime.now().setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).toFormat("DDDD hh:mm:ss a"));

    const dataToLocalTime = (timezone: number) => {
        setDt(DateTime.now().setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).toFormat("DDDD hh:mm:ss a"))
    }

    const refreshTime: Promise<number> = new Promise(() => {
        setTimeout(() => dataToLocalTime(timezone), 1000)
    }).then(() => refreshTime)


    useEffect(() => {
        dataToLocalTime(timezone)
    }, [name])
    return (
        <div className={"flex flex-col gap-3 items-center w-full"}>
            <LocationAndTime dt={dt} name={name} country={country}/>
            <CurrentWeather details={details} icon={icon} temp={temp} sunset={sunset} sunrise={sunrise}
                            temp_max={temp_max} temp_min={temp_min} humidity={humidity} feels_like={feels_like}
                            speed={speed}/>
        </div>
    );
};

export default CurrentForecast;