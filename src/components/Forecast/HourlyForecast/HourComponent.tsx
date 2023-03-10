import React, {FC} from 'react';
import {DateTime} from "luxon";
import {iconUrlFromCode} from "../../../services/weatherService";
import {UNITS} from "../../../enum";

interface HourComponentProps {
    icon: string
    dt: number
    temp: number
    timezone: number
    units:UNITS
}

const HourComponent:FC<HourComponentProps> = ({icon, temp, dt, timezone, units}) => {
    const formatHours = (dt:number, timezone:number) => {
        return DateTime.fromSeconds(dt).setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).toFormat("hh:mm a")
    }
    return (
        <div className={"flex flex-col items-center w-24 min-w-max"}>
            <div>
                {formatHours(dt, timezone)}
            </div>
            <div>
                <img src={iconUrlFromCode(icon)} alt=""/>
            </div>
            <div>
                {(temp > 0 ? "+" + temp.toFixed() : temp.toFixed()) + (units === UNITS.metric ? " C°" : " F°")}
            </div>
        </div>
    );
};

export default HourComponent;