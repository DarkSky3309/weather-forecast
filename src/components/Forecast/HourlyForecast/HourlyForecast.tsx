import React, {FC, useEffect, useRef, useState} from 'react';
import {getFormattedHourlyWeatherData} from "../../../services/weatherService";
import {DateTime} from "luxon";
import HourComponent from "./HourComponent";
import {UNITS} from "../../../enum";
import {motion, useMotionValue} from "framer-motion";
import PropTypes from "prop-types";


interface HourlyForecastProps {
    time_now: number,
    timezone: number,
    city: string,
    units: UNITS,
    selectedDay: string,
}

const HourlyForecast: FC<HourlyForecastProps> = ({time_now, timezone, city, units, selectedDay}) => {
    const [data, setData]: any = useState();
    const [isDataReceived, setIsDataReceived] = useState(false);
    const fetchHourlyWeather = async () => {
        setIsDataReceived(false)
        let data: any
        try {
            data = await getFormattedHourlyWeatherData({q: city, units: units});
        } catch (e) {
            console.error(e)
        } finally {
            setIsDataReceived(true)
        }
        setData(data)
    }
    useEffect(() => {
        fetchHourlyWeather()
    }, [city, units])

    const renderHourlyForecast = (selectedDay: string) => {
        if (isDataReceived) {
            let filterData = data.list.map((data: any, index: number) => {
                let day = DateTime.fromSeconds(data.dt).setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).toLocaleString({weekday: "long"})
                if (day === selectedDay)
                    return <HourComponent units={units} key={index} icon={data.weather[0].icon} dt={data.dt}
                                          temp={data.main.temp} timezone={timezone}/>
                else return
            }).filter((item: [] | undefined) => item !== undefined)
            return filterData
        }
    }
    const swiper = useRef() as React.MutableRefObject<HTMLDivElement>
    const inner = useRef() as React.MutableRefObject<HTMLDivElement>
    const calcWidth = () => {
        let time = DateTime.now().setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).hour;
        if (selectedDay === DateTime.now().setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).weekdayLong) {
            if (Number(24 - time) > Math.floor(swiper.current.offsetWidth / 100)) {
                return (24 - Number(time + 1)) * 100 - swiper.current.offsetWidth
            } else return 0
        }
        if (selectedDay === DateTime.fromSeconds(time_now + 86400000 * 3).setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).weekdayLong)
            return Number(time + 1) * 100 - swiper.current.offsetWidth
        return 2400 - swiper.current.offsetWidth
    }
    const [key, setKey] = useState(1);
    useEffect(() => {if (selectedDay === DateTime.now().setZone(`UTC${(timezone >= 0 ? "+" + timezone / 3600 : timezone / 3600)}`).weekdayLong) setKey(Math.random)}, [selectedDay])

    return (
        <motion.div key={key} className={"w-full mt-8 swiper overflow-hidden cursor-pointer h-36"} ref={swiper}>
            {isDataReceived && (
                <motion.div drag={'x'} onDragEnd={(event, info) => {
                    console.log(info);}} dragConstraints={{right: 0, left: -calcWidth()}}
                            className={"swiper-wrapper flex w-32"}
                            ref={inner}>
                    {renderHourlyForecast(selectedDay)}
                </motion.div>)}
        </motion.div>
    );
};

export default HourlyForecast;