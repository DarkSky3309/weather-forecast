import {PARAMS} from "../enum";

const API_KEY = "eb86123da413b4ed9415b668c127ca1b";
const BASE_URL = "https://pro.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/reverse?"

interface searchParam {
    q?: string,
    units?: string,
    mode?: string,
    cnt?: string,
    lang?: string,
}
const getCity = (searchParams: object) => {
    const url = new URL(GEO_URL)
    // @ts-ignore
    url.search = new URLSearchParams({...searchParams, appid: API_KEY})
    return fetch(url).then((res) => res.json())
}

const getWeatherData = (infoType: string, searchParams: object) => {
    const url = new URL(BASE_URL + "/" + infoType);
    // @ts-ignore
    url.search = new URLSearchParams({...searchParams, appid: API_KEY})
    return fetch(url).then((res) => res.json())
};

const formatCurrentWeather = (data: any) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed},
        timezone
    } = data

    const {main: details, icon} = weather[0]

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
        timezone
    }
}

const getMonthForecast = async (searchParams: searchParam) => {
    const MonthForecast = await getWeatherData(PARAMS.monthForecast, searchParams)
    let {list} = MonthForecast
    return list
}

const formatForecastWeather = (data: any) => {
    let {city, list} = data;
    let {timezone} = city;
    list = list.slice(1, 8).map((d: any) => {
        return {
            title: new Date(Number(d.dt + "000")),
            temp: d.temp.day,
            icon: d.weather[0].icon,
            time: d.dt,
            timezone: timezone
        }
    })
    return list
}

const getFormattedHourlyWeatherData = async (searchParams: searchParam) => {
    const formattedHourlyData = await getWeatherData(PARAMS.hourlyForecast, searchParams)
    const {list} = formattedHourlyData
    return {list}
}

const getFormattedWeatherData = async (searchParams: searchParam) => {
    const formattedCurrentWeather = await getWeatherData(PARAMS.weather, searchParams).then(formatCurrentWeather)
    const {lat, lon} = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData(PARAMS.monthForecast, {
        lat,
        lon,
        exclude: "current,alerts",
        cnt: "14",
        units: searchParams.units
    }).then(formatForecastWeather)
    return {...formattedCurrentWeather, formattedForecastWeather}
}

const iconUrlFromCode = (code:string) => `http://openweathermap.org/img/wn/${code}@2x.png`



export default getFormattedWeatherData;

export {iconUrlFromCode, getCity, getFormattedHourlyWeatherData, getMonthForecast}

