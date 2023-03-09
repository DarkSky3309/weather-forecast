import React, {FC, useEffect, useState} from 'react';
import {DateTime} from "luxon";

interface currentForecastProps {
    timezone: number,
    name: string,
    country: string,
    details: string,
    icon: string,
    humidity: number,
    speed: number,
    feels_like: number,
    temp_max: number,
    temp_min: number,
    sunset: number,
    sunrise: number
    convertTime: (dt: number) => { day: number, hour: number, minutes: number, month: number, date: number, year: number, seconds: number }
}

const CurrentForecast: FC<currentForecastProps> = ({   timezone,
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
                                                       convertTime
                                                   }) => {
    const [dt, setDt] = useState(DateTime.now().setZone(`UTC${(timezone >= 0 ? "+"+ timezone / 3600 : timezone / 3600 )}`).toFormat("DDDD hh:mm:ss a"));

    const dataToLocalTime = (timezone:number) => {
        setDt(DateTime.now().setZone(`UTC${(timezone >= 0 ? "+"+ timezone / 3600 : timezone / 3600 )}`).toFormat("DDDD hh:mm:ss a"))
    }

    const refreshTime:Promise<number> = new Promise(() => {
        setTimeout(() => dataToLocalTime(timezone), 1000)
    }).then(() => refreshTime)


    useEffect(() => {dataToLocalTime(timezone)
    }, [name])
    return (
        <div className={"flex flex-col gap-3 items-center"}>
            <div className={"text-5xl uppercase font-semibold"}>{name + ", " + country}</div>
            {dt}
        </div>
    );
};

export default CurrentForecast;