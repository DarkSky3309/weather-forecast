import './App.css'
import getFormattedWeatherData from "./services/weatherSrvice";

function App() {
    const fetchWeather = async () => {
        const data = await getFormattedWeatherData( {q: "Kyiv"});
        console.log(data);
    }
    fetchWeather();
  return (
    <div className="App">

    </div>
  )
}

export default App
