import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {CITY, UNITS} from "../enum";
import {getCity} from "../services/weatherService";

interface navigationType {
    setCity: (elem: string) => void
    setUnits: Dispatch<SetStateAction<UNITS>>
}

const Navigation: FC<navigationType> = ({setCity, setUnits}) => {
        const [searchCity, setSearchCity] = useState('');
        const [currentLocation, setCurrentLocation]: [{ latitude: number, longitude: number } | undefined, Dispatch<SetStateAction<{ latitude: number, longitude: number } | undefined>>] = useState();

        const lookForCity = () => {
            setCity(searchCity);
            setSearchCity("")
        }

        function showError() {
            alert("Please give permission to your geolocation")
        }


        const fetchCity = async () => {
            let data: any
            if (currentLocation) {
                try {
                    data = await getCity({lat: currentLocation.latitude, lon: currentLocation.longitude})
                    setCity(data[0].name)
                } catch (e) {
                    console.error(e)
                }
            }
        }
        useEffect(() => {
            fetchCity()
        }, [currentLocation])


        const getLocation = async () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords;
                setCurrentLocation({latitude, longitude})
            })
            navigator.permissions.query({name: "geolocation"}).then((result) => {
                if (result.state === "denied") {
                    showError();
                }
            })
        }

        return (
            <header className={"w-11/12 mx-auto lg:flex justify-between text-white py-6 text-2xl"}>
                <div className={"lg:justify-between max-w-lg w-full lg:visible lg:flex hidden "}>
                    <span onClick={() => setCity(CITY.kyiv)}
                          className={"cursor-pointer hover:scale-125 duration-200"}>Kyiv</span>
                    <span onClick={() => setCity(CITY.kharkiv)}
                          className={"cursor-pointer hover:scale-125 duration-200"}>Kharkiv</span>
                    <span onClick={() => setCity(CITY.odesa)}
                          className={"cursor-pointer hover:scale-125 duration-200"}>Odesa</span>
                    <span onClick={() => setCity(CITY.lviv)}
                          className={"cursor-pointer hover:scale-125 duration-200"}>Lviv</span>
                    <span onClick={() => setCity(CITY.dnepro)}
                          className={"cursor-pointer hover:scale-125 duration-200  "}>Dnepr</span>
                </div>
                <div className={"flex lg:gap-5 justify-center gap-1"}>
                    <div className={"relative"}>
                        <input value={searchCity} onKeyDown={(event) => {
                            event.key === "Enter" ? lookForCity() : ""
                        }} onChange={(e) => setSearchCity(e.target.value.toString())} type="text" placeholder={"Search..."}
                               className={"text-xl text-black py-1 px-2 rounded-3xl"}/>
                        <button type={"submit"} onClick={() => lookForCity()}
                                className={"text-black bg-transparent border-none cursor-pointer inline-block absolute top-0 right-0 pr-2 hover:text-deep-cold duration-200"}>
                            <i className="ri-search-line"></i></button>
                    </div>
                    <span className={"cursor-pointer hover:scale-125 duration-200"} onClick={() => {
                        getLocation()
                    }}><i className="ri-map-pin-line"></i></span>
                    <div className={"relative"}>
                        <span className={"cursor-pointer hover:scale-125 duration-200"}
                              onClick={() => setUnits(UNITS.metric)}>°C</span>
                        <span> | </span>
                        <span className={"cursor-pointer hover:scale-125 duration-200"}
                              onClick={() => setUnits(UNITS.imperial)}>°F</span>
                    </div>
                </div>
            </header>
        );
    }
;

export default Navigation;