import React, {FC} from 'react';
import {DateTime} from "luxon";

interface DayInfoProps{
    sunrise: number,
    sunset: number,
    tem_max: number,
    temp_min: number,
    timezone:number
}

const DayInfo:FC<DayInfoProps> = ({sunrise,sunset,tem_max,temp_min, timezone}) => {
    function formatToLocalTime (timezone:number, time:number) {
        return DateTime.fromSeconds(time).setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).toFormat("hh:mm:ss a")
    }
    return (
        <div className={"flex items-center lg:justify-between lg:w-1/2 md:w-2/3 w-64 justify-center sm:flex-nowrap flex-wrap gap-1 sm:w-4/5"}>
            <span className={"flex items-end"}><i className="ri-sun-line"></i> {formatToLocalTime(timezone, sunrise)}</span>
            <span>|</span>
            <span className={"flex items-end"}><i className="ri-haze-line"></i> {formatToLocalTime(timezone, sunset)}</span>
            <span className={"hidden sm:visible sm:inline-block"}>|</span>
            <span className={"flex items-end"}><i className="ri-arrow-up-line"></i> {"High: " + (tem_max > 0 ? "+" + tem_max.toFixed() : tem_max.toFixed())}</span>
            <span>|</span>
            <span className={"flex items-end"}><i className="ri-arrow-down-line"></i> {"Low: " + (temp_min > 0 ? "+" + temp_min.toFixed() : temp_min.toFixed())}</span>
        </div>
    );
};

export default DayInfo;