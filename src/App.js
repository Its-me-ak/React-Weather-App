import './App.css';
import { useEffect, useState } from 'react';
import Weather from './components/Weather';
import { GetFormetedWeatherData } from './WeatherService';



function App() {
  const [weather, setWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null)
  const [dailyWeather, setDailyWeather] = useState(null)
  const [city, setCity] = useState("Delhi")
  useEffect(() => {
    const FetchWeatherData = async () => {
      const data = await GetFormetedWeatherData(city);
      console.log(data);
      setWeather(data)
      const HourlyData = data.hourly
      setHourlyWeather(HourlyData)
      const DailyData = data.daily
      // console.log(DailyData);
      setDailyWeather(DailyData)
    }
    FetchWeatherData()
  }, [city])

  return (
    <div className="App">
      {weather && (
        <Weather weather={weather} hourlyWeather={hourlyWeather}  dailyWeather={dailyWeather} />
      )
      }
    </div>
  );
}

export default App;
