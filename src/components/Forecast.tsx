import React, {FC, useEffect, useState} from 'react';
import {DAY} from "../enum";


interface forecastType{
    data:any,
    isDataReceived:boolean
}



const Forecast:FC <forecastType> = ({data, isDataReceived}) => {
    let {month ,day, hour, minute} = convertTime(data.dt)
    let currentDate = new Date(Date.now())

    //create function for iterate time

    function convertTime (dt:any) {
        const time = new Date(Number(dt + "000"))
        return {day: time.getDay(), hour: time.getHours(), minute: time.getMinutes(), month: time.getMonth()}
    }
    return (
        <div className={"flex align-middle justify-center text-white"}>
            <div className={"text-5xl uppercase font-semibold"}>
                <span>{data.name + ", " + data.country}</span>
            </div>
            <div>
                <span>{}</span>
            </div>

        </div>
    );
};

export default Forecast;