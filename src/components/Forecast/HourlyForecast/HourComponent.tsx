import React, {FC} from 'react';
import {DateTime} from "luxon";
import {iconUrlFromCode} from "../../../services/weatherService";

interface HourComponentProps {
    icon: string
    dt: number
    temp: number
    timezone: number
}

const HourComponent:FC<HourComponentProps> = ({icon, temp, dt, timezone}) => {
    const formatHours = (dt:number, timezone:number) => {
        return DateTime.fromSeconds(dt).setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).toFormat("hh:mm:ss a")
    }
    return (
        <div>
            <div>
                {formatHours(dt, timezone)}
            </div>
            <div>
                <img src={iconUrlFromCode(icon)} alt=""/>
            </div>
            <div>
                {temp > 0 ? "+" + temp.toFixed() : temp.toFixed()}
            </div>
        </div>
    );
};

export default HourComponent;