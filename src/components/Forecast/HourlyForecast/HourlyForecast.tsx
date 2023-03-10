import React, {FC, useEffect, useRef, useState} from 'react';
import {getFormattedHourlyWeatherData} from "../../../services/weatherService";
import {DateTime} from "luxon";
import HourComponent from "./HourComponent";
import {UNITS} from "../../../enum";
import {motion} from "framer-motion";


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
    let amount = 0
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
            amount = filterData.length
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

    return (
        <motion.div className={"w-full mt-8 swiper overflow-hidden cursor-pointer"} ref={swiper}>
            {isDataReceived && (
                <motion.div drag={"x"} dragConstraints={{right: 0, left: -calcWidth()}}
                            className={"swiper-wrapper flex w-32"}
                            ref={inner}>
                    {renderHourlyForecast(selectedDay)}
                </motion.div>)}
        </motion.div>
    );
};

export default HourlyForecast;