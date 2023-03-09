import React, {FC} from 'react';
import CurrentForecast from "./CurrentForecast/CurrentForecast";
import {UNITS} from "../../enum";
import HourlyForecast from "./HourlyForecast/HourlyForecast";


interface forecastType {
    data: any,
    units:UNITS,
    city: string;
}


const Forecast: FC<forecastType> = ({data, units, city}) => {

    return (
        <div className={"flex items-center justify-center text-white colum flex-col w-10/12 mx-auto"}>
            <CurrentForecast units={units} temp={data.temp} timezone={data.timezone} icon={data.icon} country={data.country} name={data.name}
                             details={data.details} feels_like={data.feels_like} humidity={data.humidity}
                             speed={data.speed} sunrise={data.sunrise} sunset={data.sunset} temp_max={data.temp_max}
                             temp_min={data.temp_min} />
            <HourlyForecast timezone={data.timezone} city={city} units={units}/>
        </div>
    );
};

export default Forecast;