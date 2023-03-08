import React, {FC} from 'react';

interface forecastType{
    data:any,
    isDataReceived:boolean
}

const Forecast:FC <forecastType> = ({data, isDataReceived}) => {


    function convertTime (dt:any) {
        const time = new Date(Number(dt + "000"))
        return time.getFullYear()
    }

    return (
        <div className={"flex align-middle justify-center text-white"}>
            <div className={"text-5xl uppercase font-semibold"}>
                <span>{isDataReceived && data.name + ", " + data.country}</span>
            </div>
            <div>
                {/*<span>{convertTime(data.dt)}</span>*/}
            </div>

        </div>
    );
};

export default Forecast;