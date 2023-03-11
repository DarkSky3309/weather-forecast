import React, {FC} from 'react';
import {iconUrlFromCode} from "../../../services/weatherService";
import {UNITS} from "../../../enum";
import {DateTime} from "luxon";

interface DayItemProps{
    dt: number,
    icon: string,
    clickable: boolean,
    temp: number,
    units: UNITS,
    setSelectedDay: (day:string) => void,
    timezone:number,
    active: boolean
}

const DayItem:FC<DayItemProps> = ({active,dt, clickable, temp, units, icon, setSelectedDay, timezone}) => {
    const formatTime = (dt: number, timezone: number, option:string) => {
        switch (option) {
            case "day":
                return  DateTime.fromSeconds(dt).setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).weekdayLong
            case "date":
                return DateTime.fromSeconds(dt).setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).toLocaleString({month: "numeric", day: "numeric"})
        }
        return ""
    }

    return (
        <div className={`flex flex-col items-center min-w-max swiper-slide ${active && "border-gray-200m border-2 rounded-3xl"}`} onClick={() => {clickable ? setSelectedDay(formatTime(dt, timezone, "day")): ""}}>
            <div className={"flex flex-col items-center"}>
                <div>
                    {formatTime(dt, timezone, "date")}

                </div>
                <div>
                    {formatTime(dt, timezone, "day")}
                </div>
            </div>
            <div>
                <img draggable={false} src={iconUrlFromCode(icon)} alt=""/>
            </div>
            <div>
                {(temp > 0 ? "+" + temp.toFixed() : temp.toFixed()) + (units === UNITS.metric ? " C°" : " F°")}
            </div>
        </div>
    );
};

export default DayItem;