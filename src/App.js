import './App.css';
import { useEffect, useState } from 'react';
import Weather from './components/Weather';
import GetOpenWeatherData from './WeatherService';
import Loader from './components/Loader';


function App() {
  const  [loader, setLoader] = useState(false);
  useEffect(() => {
    const FetchWeatherData = async () => {
      setLoader(true)
      await GetOpenWeatherData();
      setLoader(false);
    }
    FetchWeatherData()
  }, [])
  return (
    <div className="App">
      {loader ? <Loader /> : <Weather />}
    </div>
  );
}

export default App;
