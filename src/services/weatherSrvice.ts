const API_KEY = "eb86123da413b4ed9415b668c127ca1b";
const BASE_URL = "https://pro.openweathermap.org/data/2.5";

const getWeatherData = (infoType:string, searchParams: object) => {
    const url = new URL(BASE_URL + "/" + infoType);
    // @ts-ignore
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})
    return fetch(url).then((res) => res.json())
};

const formatCurrentWeather = (data:any) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main: details, icon} = weather[0]

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed}
}

const getFormattedWeatherData = async (searchParams: object) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather)

    return formattedCurrentWeather
}

export default getFormattedWeatherData;

