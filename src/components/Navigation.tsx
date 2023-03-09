import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import Geocode from "react-geocode";
import {CITY, UNITS} from "../enum";

interface navigationType {
    setCity: (elem: string) => void
    setUnits: Dispatch<SetStateAction<UNITS>>
}

const Navigation: FC<navigationType> = ({setCity, setUnits}) => {
    const [searchCity, setSearchCity] = useState('');
    const [currentLocation, setCurrentLocation]:[{latitude: number, longitude: number} | undefined, Dispatch<SetStateAction<{latitude: number, longitude: number}| undefined>> ] = useState();

    const lookForCity = () => {
        setCity(searchCity);
        setSearchCity("")
    }

    const getLocation = async () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            setCurrentLocation({latitude, longitude})
        })
    }

    return (
        <header className={"w-11/12 mx-auto flex justify-between text-white py-6 text-2xl"}>
            <div className={"flex justify-between max-w-lg w-full"}>
                <span onClick={() => setCity(CITY.kyiv)} className={"cursor-pointer"}>Kyiv</span>
                <span onClick={() => setCity(CITY.kharkiv)} className={"cursor-pointer"}>Kharkiv</span>
                <span onClick={() => setCity(CITY.odesa)} className={"cursor-pointer"}>Odesa</span>
                <span onClick={() => setCity(CITY.lviv)} className={"cursor-pointer"}>Lviv</span>
                <span onClick={() => setCity(CITY.dnepro)} className={"cursor-pointer"}>Dnepr</span>
            </div>
            <div className={"flex gap-5"}>
                <div className={"relative"}>
                    <input value={searchCity} onKeyPress={(event) => {
                        event.key === "Enter" ? lookForCity() : ""
                    }} onChange={(e) => setSearchCity(e.target.value.toString())} type="text" placeholder={"Search..."}
                           className={"text-xl text-black py-1 px-2 rounded-3xl"}/>
                    <button type={"submit"} onClick={() => lookForCity()}
                            className={"text-black bg-transparent border-none cursor-pointer inline-block absolute top-0 right-0 pr-2 hover:text-deep-cold duration-200"}>
                        <i className="ri-search-line"></i></button>
                </div>
                <span><i className="ri-map-pin-line"></i></span>
                <div>
                    <span className={"cursor-pointer"} onClick={() => setUnits(UNITS.metric)}>°C</span>
                    <span> | </span>
                    <span className={"cursor-pointer"} onClick={() => setUnits(UNITS.imperial)}>°F</span>
                </div>
            </div>
        </header>
    );
};

export default Navigation;