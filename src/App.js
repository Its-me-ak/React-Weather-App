import './App.css';
import { useEffect, useState, useRef } from 'react';
import Weather from './components/Weather';
import { GetFormetedWeatherData } from './WeatherService';
import Loader from './components/Loader';



function App() {
  const [weather, setWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null)
  const [dailyWeather, setDailyWeather] = useState(null)
  const [city, setCity] = useState("London")
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    const FetchWeatherData = async () => {
      setLoader(true)
      const data = await GetFormetedWeatherData(city);
      console.log(data);
      setWeather(data)
      const HourlyData = data.hourly
      setHourlyWeather(HourlyData)
      const DailyData = data.daily
      // console.log(DailyData);
      setDailyWeather(DailyData)
      setLoader(false)
    }
    FetchWeatherData()
  }, [city])



  return (
    <div className="App">
      {loader && <Loader/> }
      {weather && (
        <Weather setCity={setCity} weather={weather} hourlyWeather={hourlyWeather} dailyWeather={dailyWeather} />
      )
      }
    </div>
  );
}

export default App;
