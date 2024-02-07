import React from 'react'
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { CiCloudOn } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";

const WeeklyWeather = ({ dailyWeather, weather }) => {
    const DailyData = [
        {
            id: 1,
            day: weather.weekDateOne,
            temperature: `${dailyWeather[1].temp.min.toFixed()}°C`,
            wind: `${dailyWeather[1].wind_speed} KM/H`,
            icon: dailyWeather[1].weather[0].icon,
            description: dailyWeather[1].weather[0].description,
            clouds: `${dailyWeather[1].clouds.toFixed()}%`,
            humidity: `${dailyWeather[1].humidity}%`

        },
        {
            id: 2,
            day: weather.weekDateTwo,
            temperature: `${dailyWeather[2].temp.min.toFixed()}°C`,
            wind: `${dailyWeather[2].wind_speed} KM/H`,
            icon: dailyWeather[2].weather[0].icon,
            description: dailyWeather[2].weather[0].description,
            clouds: `${dailyWeather[2].clouds.toFixed()}%`,
            humidity: `${dailyWeather[2].humidity}%`

        },
        {
            id: 3,
            day: weather.weekDateThree,
            temperature: `${dailyWeather[3].temp.min.toFixed()}°C`,
            wind: `${dailyWeather[3].wind_speed} KM/H`,
            icon: dailyWeather[3].weather[0].icon,
            description: dailyWeather[3].weather[0].description,
            clouds: `${dailyWeather[3].clouds.toFixed()}%`,
            humidity: `${dailyWeather[3].humidity}%`

        },
        {
            id: 4,
            day: weather.weekDateFour,
            temperature: `${dailyWeather[4].temp.min.toFixed()}°C`,
            wind: `${dailyWeather[4].wind_speed} KM/H`,
            icon: dailyWeather[4].weather[0].icon,
            description: dailyWeather[4].weather[0].description,
            clouds: `${dailyWeather[4].clouds.toFixed()}%`,
            humidity: `${dailyWeather[4].humidity}%`

        },
        {
            id: 5,
            day: weather.weekDateFive,
            temperature: `${dailyWeather[5].temp.min.toFixed()}°C`,
            wind: `${dailyWeather[5].wind_speed} KM/H`,
            icon: dailyWeather[5].weather[0].icon,
            description: dailyWeather[5].weather[0].description,
            clouds: `${dailyWeather[5].clouds.toFixed()}%`,
            humidity: `${dailyWeather[5].humidity}%`

        },
        {
            id: 6,
            day: weather.weekDateSix,
            temperature: `${dailyWeather[6].temp.min.toFixed()}°C`,
            wind: `${dailyWeather[6].wind_speed} KM/H`,
            icon: dailyWeather[6].weather[0].icon,
            description: dailyWeather[6].weather[0].description,
            clouds: `${dailyWeather[6].clouds.toFixed()}%`,
            humidity: `${dailyWeather[6].humidity}%`
        },
    ]

    console.log(DailyData);
    return (
        <>
            <div className="weekly-forcast">
                <h3 className='text-center text-white/[0.9] text-[22px] uppercase font-bold mb-1'>weekly forcast</h3>

                <div className="flex weekly gap-2 flex-col">
                    {DailyData.map((data, id) => (
                        <div className="box w-full bg-white/[0.3] backdrop-blur-sm rounded-md px-3 py-1" key={id}>
                            <div className="top flex justify-between">
                                <h4 className='text-white font-bold text-[16px] capitalize'>{data.day}</h4>
                                <h4 className='text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> {data.temperature}</h4>
                                <h4 className='text-white font-bold text-[16px] capitalize'><span><FaWind /></span> {data.wind}</h4>
                            </div>
                            <div className="bottom flex justify-between mt-1 items-center">
                                <div className='text-white/[0.8] font-semibold text-[15px]'>
                                    <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="" /><span className='capitalize'>{data.description}</span>
                                </div>
                                <h5 className=' text-white font-semibold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> {data.clouds}</h5>
                                <h5 className='text-white font-semibold text-[16px] capitalize'><span className='text-[20px]'><WiHumidity /></span>{data.humidity}</h5>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default WeeklyWeather
