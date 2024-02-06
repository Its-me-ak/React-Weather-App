import React from 'react'
import SearchIcon from '../assets/search.png'
import CurrentWeather from './CurrentWeather';
import HourlyWeather from './HourlyWeather';
import WeeklyWeather from './WeeklyWeather';
import { GetFormetedWeatherData } from '../WeatherService';

const Weather = ({weather}) => {
    return (
        <>
            <div className="main-bg pt-5 pb-2">
                <div className="container my-0 mx-auto">
                    <div className="input w-full flex items-center bg-white">
                        <input type="text" className='w-full bg-white p-[10px] outline-none border-none rounded text-[#777] city-input' placeholder='Berlin, DE' />
                        <div className="search-icon pe-4 cursor-pointer">
                            <img src={SearchIcon} alt="" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10 mt-5">
                        <div className="weather">
                            <CurrentWeather weather={weather} />
                            <HourlyWeather />
                        </div>
                        <WeeklyWeather />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather