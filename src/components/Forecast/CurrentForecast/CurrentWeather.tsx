import React, {FC} from 'react';
import {iconUrlFromCode} from "./../../../services/weatherService"
import {UNITS} from "../../../enum";

interface currentWeatherProps {
    details: string,
    icon: string,
    temp: number,
    humidity: number,
    feels_like: number,
    speed: number,
    units: string,
}

const CurrentWeather: FC<currentWeatherProps> = ({
                                                     units,
                                                     details,
                                                     feels_like,
                                                     icon,
                                                     humidity,
                                                     temp,
                                                     speed
                                                 }) => {
    return (

        <div className={"w-full text-center text-2xl"}>
            <div className="">{details}</div>
            <div className={"flex justify-around flex-row w-full items-center"}>
                <img className={"w-1/5 text-right"} src={iconUrlFromCode(icon)} alt=""/>
                <p className={"font-semibold text-4xl"}>{temp.toFixed() + (units === UNITS.metric? " C" : " F") + "°"}</p>
                <div className={"text-left flex flex-col gap-2"}>
                    <p className={"items-center flex gap-1"}><i className="ri-temp-hot-line"></i> Real
                        Feel: {feels_like.toFixed()} {units === UNITS.metric? "C" : "F"}°</p>
                    <p className={"items-center flex gap-1"}><i
                        className="ri-windy-line"></i>Wind: {speed.toFixed()} {units === UNITS.metric ? "km/h" : "ml/h"} </p>
                    <p className={"items-center flex gap-1"}><i
                        className="ri-contrast-drop-2-fill"></i> Humidity: {humidity}%</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;