import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {DateTime} from "luxon";
import LocationAndTime from "./LocationAndTime";
import CurrentWeather from "./CurrentWeather";
import {UNITS} from "../../../enum";
import DayInfo from "./DayInfo";

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
    units: UNITS,
}

const CurrentForecast: FC<currentForecastProps> = ({
                                                       units,
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
                                                       temp,
                                                   }) => {
    const [dt, setDt] = useState(DateTime.now().setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).toFormat("DDDD hh:mm:ss a"));
    const [intervalState, setIntervalState]: [undefined | number, Dispatch<SetStateAction<number>> | Dispatch<SetStateAction<undefined>>] = useState(undefined);
    const dataToLocalTime = (timezone: number) => {
        setDt(DateTime.now().setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).toFormat("DDDD hh:mm:ss a"))
    }

    function startInterval(timezone: number) {
        // @ts-ignore
        setIntervalState(setInterval(() => {
            dataToLocalTime(timezone);
        }, 1000));

    }


    function stopInterval() {
        clearInterval(intervalState)
    }

    useEffect(() => {
        stopInterval()
        startInterval(timezone)
    }, [timezone])

    useEffect(() => {
        dataToLocalTime(timezone)
    }, [name])
    return (
        <div className={"flex flex-col gap-2 sm:gap-3 items-center w-full h-mobile-current-weather md:h-current-weather"}>
            <LocationAndTime dt={dt} name={name} country={country}/>
            <CurrentWeather units={units} details={details} icon={icon} temp={temp}
                            humidity={humidity} feels_like={feels_like}
                            speed={speed}/>
            <DayInfo timezone={timezone} sunrise={sunrise} sunset={sunset} tem_max={temp_max} temp_min={temp_min}/>
        </div>
    );
};

export default CurrentForecast;