import React, {FC} from 'react';

interface localAndTimeProps{
    name: string,
    country:string,
    dt: string
}

const LocationAndTime:FC<localAndTimeProps> = ({name, country, dt}) => {
    return (
        <div className={"flex flex-col gap-3 items-center mb-5"}>
            <div className={"text-5xl uppercase font-semibold"}>{name + ", " + country}</div>
            <div className={"text-2xl"}>{dt}</div>
        </div>
    );
};

export default LocationAndTime;