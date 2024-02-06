import './App.css';
import { useEffect, useState } from 'react';
import Weather from './components/Weather';
import { GetFormetedWeatherData } from './WeatherService';



function App() {
  const [weather, setWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null)
  const [city, setCity] = useState("london")
  useEffect(() => {
    const FetchWeatherData = async () => {
      const data = await GetFormetedWeatherData(city);
      console.log(data);
      setWeather(data)
      const HourlyData = data.hourly
      // console.log(HourlyData);
      setHourlyWeather(HourlyData)
    }
    FetchWeatherData()
  }, [])

  return (
    <div className="App">
      {weather && (
        <Weather weather={weather}  hourlyWeather={hourlyWeather} />
      )
      }
    </div>
  );
}

export default App;
