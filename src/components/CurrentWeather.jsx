import React from 'react'
import { FaTemperatureHalf } from "react-icons/fa6";
import { BiTachometer } from "react-icons/bi";
import { FaWind } from "react-icons/fa";
import { CiCloudOn } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { FiSunrise, FiSunset } from "react-icons/fi";

const CurrentWeather = ({ weather }) => {
    return (
        <>
            <div className="current-weather">
                <h1 className='text-center text-white/[0.9] text-[22px] uppercase font-bold mb-1'>current weather</h1>
                <div className="flex justify-between items-center px-2 sm:px-3 py-3 bg-white/[0.3] rounded backdrop-blur-sm">
                    <div className="location text-center">
                        <h2 className='text-white uppercase text-[18px] font-bold'>{weather.name}, {weather.country}</h2>
                        <h3 className='text-white/[0.8] text-[15px] font-[600]' >{weather.date}</h3>
                        <h4 className='text-white/[0.8] text-[15px] font-[600]' id='time'>{weather.time}</h4>
                    </div>
                    <div className="temprature text-center">
                        <h1 className='text-white font-bold text-2xl'> {`${weather.temp.toFixed()}°C`}</h1>
                        <p className='font-[600] text-white/[0.8] text-[15px] capitalize'>{weather.description}</p>
                    </div>
                    <div className="image">
                        <img src={weather.iconURL} alt="" />
                    </div>
                </div>
            </div>

            <div className="weather-details mt-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-5 px-2 sm:px-0 py-3 bg-white/[0.3] rounded all columns-4 backdrop-blur-sm">
                    <div className="real-feel text-center">
                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><FaTemperatureHalf /></span>Real Feel</p>
                        <h5 className='text-white font-bold text-[18px]'>{`${weather.feels_like.toFixed()}°C`}</h5>
                    </div>
                    <div className="wind">
                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><FaWind /></span>Wind</p>
                        <h5 className='text-white font-bold text-[18px]'>{`${weather.speed} KM/H`}</h5>
                    </div>
                    <div className="cloud">
                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><CiCloudOn /></span>Clouds</p>
                        <h5 className='text-white font-bold text-[18px]' id='cloud'>{`${weather.clouds}%`}</h5>
                    </div>
                    <div className="humidity">
                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><WiHumidity /></span>Humidity</p>
                        <h5 className='text-white font-bold text-[18px]'>{`${weather.humidity}%`}</h5>
                    </div>
                    <div className="rain">
                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><BiTachometer /></span>Pressure</p>
                        <h5 className='text-white font-bold text-[18px]'>{`${weather.pressure}hPa`}</h5>
                    </div>
                    <div className="visibility">
                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><MdVisibility /></span>Visibility</p>
                        <h5 className='text-white font-bold text-[18px]'>{`${weather.visibility / 1000} KM`}</h5>
                    </div>
                    <div className="sunrise">
                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><FiSunrise /></span>Sunrise</p>
                        <h5 className='text-white font-bold text-[18px]'>{weather.Sunrise}</h5>
                    </div>
                    <div className="sunset">
                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><FiSunset /></span>Sunset</p>
                        <h5 className='text-white font-bold text-[18px]'>{weather.Sunset}</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrentWeather
