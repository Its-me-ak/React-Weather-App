import React from 'react'
import SearchIcon from '../assets/search.png'
import CurrentWeather from './CurrentWeather';
import HourlyWeather from './HourlyWeather';
import WeeklyWeather from './WeeklyWeather';

const Weather = ({ weather, hourlyWeather, dailyWeather, setCity }) => {
    const handleChange = () => {
        const input = document.querySelector(".city-input");
        const cityName = input.value;
        setCity(cityName)
    }
    return (
        <>
            <div className="main-bg pt-5 pb-2">
                <div className="container my-0 mx-auto">
                    <div className="input w-full flex items-center bg-white">
                        <input type="text" className='w-full bg-white p-[10px] outline-none border-none rounded text-[#777] city-input' placeholder='Berlin, DE' />
                        <div className="search-icon pe-4 cursor-pointer">
                            <img src={SearchIcon} alt="" onClick={handleChange} />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-5">
                        <div className="weather">
                            <CurrentWeather weather={weather} />
                            <HourlyWeather hourlyWeather={hourlyWeather} weather={weather}/>
                        </div>
                        <WeeklyWeather  dailyWeather={dailyWeather} weather={weather} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather