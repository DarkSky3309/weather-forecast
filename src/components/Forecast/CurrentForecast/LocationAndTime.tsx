import React, {FC} from 'react';

interface localAndTimeProps{
    name: string,
    country:string,
    dt: string
}

const LocationAndTime:FC<localAndTimeProps> = ({name, country, dt}) => {
    return (
        <div className={"flex flex-col gap-3 items-center mb-2 sm:mb-5"}>
            <div className={"sm:text-5xl text-3xl uppercase font-semibold"}>{name + ", " + country}</div>
            <div className={"sm:text-2xl text-xl text-center"}>{dt}</div>
        </div>
    );
};

export default LocationAndTime;