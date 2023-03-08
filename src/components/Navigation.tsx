import React, {FC} from 'react';
import {CITY} from "../enum";

interface navigationType{
    setCity: (elem:string) => void
}

const Navigation:FC<navigationType> = ({setCity}) => {
    return (
        <header className={"w-11/12 mx-auto flex justify-between text-white py-6 text-2xl"}>
            <div className={"flex justify-between max-w-lg w-full"}>
                <span onClick={()=> setCity(CITY.kyiv)} className={"cursor-pointer"}>Kyiv</span>
                <span onClick={()=> setCity(CITY.kharkiv)} className={"cursor-pointer"}>Kharkiv</span>
                <span onClick={()=> setCity(CITY.odesa)} className={"cursor-pointer"}>Odesa</span>
                <span onClick={()=> setCity(CITY.lviv)} className={"cursor-pointer"}>Lviv</span>
                <span onClick={()=> setCity(CITY.dnepro)} className={"cursor-pointer"}>Dnepr</span>
            </div>
            <div className={"flex gap-5"}>
                <div className={"relative"}>
                    <input type="text" placeholder={"Search..."} className={"text-xl text-black py-1 px-2 rounded-3xl"}/>
                    <button type={"submit"} className={"text-black bg-transparent border-none cursor-pointer inline-block absolute top-0 right-0 pr-2 hover:text-deep-cold duration-200"}><i className="ri-search-line"></i></button>
                </div>
                <span><i className="ri-map-pin-line"></i></span>
                <div>
                    <span>°C</span>
                    <span> | </span>
                    <span>°F</span>
                </div>
            </div>
        </header>
    );
};

export default Navigation;