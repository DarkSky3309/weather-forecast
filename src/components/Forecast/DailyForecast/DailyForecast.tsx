import React, {FC, useEffect, useRef, useState} from 'react';
import {getMonthForecast} from "../../../services/weatherService";
import {UNITS} from "../../../enum";
import DayItem from "./DayItem";
import {motion} from "framer-motion";
import {DateTime} from "luxon";

interface DailyForecastProps {
    timezone: number
    city: string
    units: UNITS,
    setSelectedDay: (day: string) => void,
    selectedDay: string
}

const DailyForecast: FC<DailyForecastProps> = ({city, units, setSelectedDay, timezone, selectedDay}) => {
    const [dataState, setDataState]: any = useState();
    const [isDataReceived, setIsDataReceived] = useState(false);
    const fetchDailyWeather = async () => {
        setIsDataReceived(false)
        let data: any
        try {
            data = await getMonthForecast({q: city, units: units, cnt: "14"});
        } catch (e) {
            console.error(e)
        } finally {
            setIsDataReceived(true)
        }
        setDataState(data)
    }

    useEffect(() => {
        fetchDailyWeather();
    }, [city, units])

    const renderDailyForecast = () => {
        if (isDataReceived) {
            return dataState.map((data: any, index: number) => {
                return <DayItem
                    active={selectedDay === DateTime.fromSeconds(data.dt).setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).weekdayLong && index < 5}
                    timezone={timezone} key={index} dt={data.dt} icon={data.weather[0].icon} clickable={index < 5}
                    temp={data.temp.day}
                    units={units} setSelectedDay={setSelectedDay}/>
            })
        }
    }

    const swiper = useRef() as React.MutableRefObject<HTMLDivElement>

    return (
        <motion.div className={"w-full mt-8 swiper overflow-hidden cursor-pointer mb-10 h-44"} ref={swiper}>
            {isDataReceived && (
                <motion.div drag={"x"} dragConstraints={{right: 0, left: -1400 + swiper.current.offsetWidth}}
                            className={"swiper-wrapper flex w-32"}>
                    {renderDailyForecast()}
                </motion.div>)}
        </motion.div>
    );
};

export default DailyForecast;