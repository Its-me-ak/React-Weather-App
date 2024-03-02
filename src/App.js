import './App.css';
import { useEffect, useState } from 'react';
import Weather from './components/Weather';
import { GetFormetedWeatherData } from './WeatherService';
import Loader from './components/Loader';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



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
      if (!data) {
        setWeather(data)
        setLoader(false)
      }
      setWeather(data)
      const HourlyData = data?.hourly
      setHourlyWeather(HourlyData)
      const DailyData = data?.daily
      setDailyWeather(DailyData)
      setLoader(false)
    }
    FetchWeatherData()
  }, [city])



  return (
    <div className="App">
      {loader && <Loader />}
      {weather && (
        <Weather setCity={setCity} weather={weather} hourlyWeather={hourlyWeather} dailyWeather={dailyWeather} />
      )
      }
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
