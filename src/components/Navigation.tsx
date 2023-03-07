import React from 'react';

const Navigation = () => {
    return (
        <header className={"w-11/12 mx-auto flex justify-between text-white py-6 text-2xl"}>
            <div className={"flex justify-between max-w-lg w-full"}>
                <span className={"cursor-pointer"}>Kyiv</span>
                <span className={"cursor-pointer"}>Kharkiv</span>
                <span className={"cursor-pointer"}>Odesa</span>
                <span className={"cursor-pointer"}>Lviv</span>
                <span className={"cursor-pointer"}>Dnepr</span>
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