import React, { useState } from 'react'
import Cloud from '../assets/cloud.png'
import Rain from '../assets/rain.png'
import { FaTemperatureHalf } from "react-icons/fa6";
import { BiTachometer } from "react-icons/bi";
import { FaWind } from "react-icons/fa";
import { CiCloudOn } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { FiSunrise, FiSunset } from "react-icons/fi";
import SearchIcon from '../assets/search.png'
import { DateTime } from 'luxon';

const Weather = () => {
    const weekDayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
    // // time and date
    const getDate = function (dateUnix, timezone) {
        const date = new Date((dateUnix + timezone) * 1000);
        const weekDayName = weekDayNames[date.getUTCDay()];
        const monthName = monthNames[date.getUTCMonth()];
        return `${weekDayName} , ${date.getUTCDate()} ${monthName}`;
    }

    const getTime = function (timeUnix, timezone) {
        const date = new Date((timeUnix + timezone) * 1000);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const period = hours >= 12 ? "PM" : "AM";
        const hour = hours % 12 || 12;
        if (hour < 10) {
            let hr = '0' + hour;
            if (minutes < 10) {
                let min = '0' + minutes;
                return `${hr}:${min} ${period}`;
            }
            return `${hr}:${minutes} ${period}`;
        }
        if (minutes < 10) {
            let min = '0' + minutes;
            return `${hour}:${min} ${period}`;
        }
        return `${hour}:${minutes} ${period}`;
    }

    const apiKey = "439d4b804bc8187953eb36d2a8c26a02"
    const Search = async () => {
        const element = document.querySelector(".city-input");
        if (element.value === "") {
            return 0;
        }
        // if ((event?.key === "Enter" || event === "searchButton") && searchQuery?.length > 0) {
        //     navigate(`/searchResult/${searchQuery}`)
        // }

        // const FormatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy ' | Local time: hh:mm a'") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
        // console.log(FormatToLocalTime);


        try {
            const cityName = element?.value;
            const url = `https://openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
            const response = await fetch(url);
            const data = await response.json()
            // console.log(data);
            const citylon = data.coord.lon;
            const citylat = data.coord.lat;
            const oneUrl = `https://openweathermap.org/data/2.5/onecall?lat=${citylat}&lon=${citylon}&units=metric&appid=${apiKey}`;
            let oneResponse = await fetch(oneUrl);
            let oneData = await oneResponse.json()
            console.log(oneData);
            const date = (getDate(oneData.current.dt, oneData.timezone_offset));
            const time = (getTime(oneData.current.dt, oneData.timezone_offset));


            // Image Icon
            const { weather } = data;
            const icon = weather[0].icon
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
            const iconImg = document.getElementById('iconImg');
            iconImg.src = iconUrl


            const City = document.getElementById("city");
            const dateDay = document.getElementById('date')
            const dateTime = document.getElementById('time')
            const Country = document.getElementById('country');
            const Temprature = document.getElementById('temp');
            const Description = document.getElementById('description');
            const WeatherFeel = document.getElementById('weatherFeel');
            const Wind = document.getElementById('wind');
            const Cloud = document.getElementById('cloud');
            const HumidityValue = document.getElementById('humidity');
            const PressureValue = document.getElementById('pressure');
            const Visibility = document.querySelector('#visibility');
            const SunriseTime = document.getElementById('sunrise');
            const SunsetTime = document.getElementById('sunset');

            City.innerHTML = data?.name
            dateDay.innerHTML = date;
            dateTime.innerHTML = time 
            Country.innerHTML = data.sys.country
            Temprature.innerHTML = Math.round(oneData.current.temp);
            Description.innerHTML = oneData.current.weather[0].description;
            WeatherFeel.innerHTML = Math.round(oneData.current.feels_like);
            Wind.innerHTML = oneData.current.wind_speed;
            Cloud.innerHTML = `${oneData.current.clouds}%`;
            HumidityValue.innerHTML = `${oneData.current.humidity}%`;
            PressureValue.innerHTML = `${oneData.current.pressure}hPa`;
            Visibility.innerHTML = `${(oneData.current.visibility) / 1000} KM`;
            SunriseTime.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();

        } catch (error) {
            console.log("city not found ");
            alert("city not Found")
        }
    }
    return (
        <>
            <div className="main-bg pt-5 pb-2">
                <div className="container my-0 mx-auto">
                    <div className="input w-full flex items-center bg-white">
                        <input type="text" className='w-full bg-white p-[10px] outline-none border-none rounded text-[#777] city-input' placeholder='Berlin, DE' />
                        <div className="search-icon pe-4 cursor-pointer" onClick={Search} >
                            <img src={SearchIcon} alt="" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10 mt-5">
                        <div className="weather">
                            <div className="current-weather">
                                <h3 className='text-center text-white/[0.9] text-[22px] uppercase font-bold mb-1'>current weather</h3>
                                <div className="flex justify-between items-center px-6 py-3 bg-white/[0.2] rounded">
                                    <div className="location text-center">
                                        <h2 className='text-white uppercase text-[18px] font-bold'><span id='city'>berlin</span>, <span id='country'>De</span></h2>
                                        <h3 className='text-white/[0.8] text-[15px] font-[600]' id='date'>Monday, 1 jan</h3>
                                        <h4 className='text-white/[0.8] text-[15px] font-[600]' id='time'>12:00:00 AM</h4>
                                    </div>
                                    <div className="temprature text-center">
                                        <h3 className='text-white font-bold text-2xl'> <span id='temp'>7</span>°C</h3>
                                        <p className='font-[600] text-white/[0.8] text-[15px] capitalize' id='description'>few clouds</p>
                                    </div>
                                    <div className="image">
                                        <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" id='iconImg' />
                                    </div>
                                </div>
                            </div>
                            <div className="weather-details mt-6">
                                <h3 className='text-center text-white/[0.9] text-[22px] uppercase font-bold mb-1'>weather details</h3>
                                <div className="grid grid-cols-4 gap-5 px-6 py-3 bg-white/[0.2] rounded all columns-4">
                                    <div className="real-feel text-center">
                                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><FaTemperatureHalf /></span>Real Feel</p>
                                        <h5 className='text-white font-bold text-[18px]'><span id='weatherFeel'>5</span> &deg;C</h5>
                                    </div>
                                    <div className="wind">
                                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><FaWind /></span>Wind</p>
                                        <h5 className='text-white font-bold text-[18px]'><span id='wind'>3.09</span> KM/H</h5>
                                    </div>
                                    <div className="cloud">
                                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><CiCloudOn /></span>Clouds</p>
                                        <h5 className='text-white font-bold text-[18px]' id='cloud'>75%</h5>
                                    </div>
                                    <div className="humidity">
                                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><WiHumidity /></span>Humidity</p>
                                        <h5 className='text-white font-bold text-[18px]' id='humidity'>90%</h5>
                                    </div>
                                    <div className="rain">
                                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><BiTachometer /></span>Pressure</p>
                                        <h5 className='text-white font-bold text-[18px]' id='pressure'>1035hPa</h5>
                                    </div>
                                    <div className="visibility">
                                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><MdVisibility /></span>Visibility</p>
                                        <h5 className='text-white font-bold text-[18px]' id='visibility'>10 KM</h5>
                                    </div>
                                    <div className="sunrise">
                                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><FiSunrise /></span>Sunrise</p>
                                        <h5 className='text-white font-bold text-[18px]' id='sunrise'>6:40 AM</h5>
                                    </div>
                                    <div className="sunset">
                                        <p className='font-semibold text-[16px] text-white/[0.6]'><span className='pe-1 text-[20px]'><FiSunset /></span>Sunset</p>
                                        <h5 className='text-white font-bold text-[18px]' id='sunset'>7:20 PM</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="today-forcast text-center mt-6">
                                <h3 className='text-center text-white/[0.9] text-[22px] uppercase font-bold'>hourly forcast</h3>
                                <p className='font-semibold text-[16px] text-white/[0.6]'>6 Available Forcast</p>
                                <div className="flex gap-3 mt-3">
                                    <div className="box bg-white/[0.2] rounded-lg py-2 px-6">
                                        <p className='text-white/[0.6] font-semibold'>06:00</p>
                                        <img src={Cloud} alt="" />
                                        <h5 className='text-white font-bold text-lg'>7 C</h5>
                                    </div>
                                    <div className="box bg-white/[0.2] rounded-lg py-2 px-6">
                                        <p className='text-white/[0.6] font-semibold'>06:00</p>
                                        <img src={Cloud} alt="" />
                                        <h5 className='text-white font-bold text-lg'>7 C</h5>
                                    </div>
                                    <div className="box bg-white/[0.2] rounded-lg py-2 px-6">
                                        <p className='text-white/[0.6] font-semibold'>06:00</p>
                                        <img src={Cloud} alt="" />
                                        <h5 className='text-white font-bold text-lg'>7 C</h5>
                                    </div>
                                    <div className="box bg-white/[0.2] rounded-lg py-2 px-6">
                                        <p className='text-white/[0.6] font-semibold'>06:00</p>
                                        <img src={Cloud} alt="" />
                                        <h5 className='text-white font-bold text-lg'>7 C</h5>
                                    </div>
                                    <div className="box bg-white/[0.2] rounded-lg py-2 px-6">
                                        <p className='text-white/[0.6] font-semibold'>06:00</p>
                                        <img src={Cloud} alt="" />
                                        <h5 className='text-white font-bold text-lg'>7 C</h5>
                                    </div>
                                    <div className="box bg-white/[0.2] rounded-lg py-2 px-6">
                                        <p className='text-white/[0.6] font-semibold'>06:00</p>
                                        <img src={Cloud} alt="" />
                                        <h5 className='text-white font-bold text-lg'>7 C</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="weekly-forcast">
                            <h3 className='text-center text-white/[0.9] text-[22px] uppercase font-bold mb-1'>weekly forcast</h3>

                            <div className="flex weekly gap-2 flex-col">
                                <div className="box w-full bg-white/[0.2] rounded-md px-3 py-1">
                                    <div className="top flex justify-between">
                                        <h4 className='text-white font-bold text-[16px] capitalize'>monday</h4>
                                        <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> 7 C</h4>
                                        <h4 className='text-white font-bold text-[16px] capitalize'><span><FaWind /></span> 2.67 km/h</h4>
                                    </div>
                                    <div className="bottom flex justify-between mt-1 items-center">
                                        <h5 className='text-white/[0.8] font-bold text-[16px] capitalize'><img src={Rain} alt="" /> Light Rain</h5>
                                        <h5 className='me-16 text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> 65%</h5>
                                        <h5 className='text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><WiHumidity /></span> 82%</h5>
                                    </div>
                                </div>
                                <div className="box w-full bg-white/[0.2] rounded-md px-3 py-1">
                                    <div className="top flex justify-between">
                                        <h4 className='text-white font-bold text-[16px] capitalize'>tuesday</h4>
                                        <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> 7 C</h4>
                                        <h4 className='text-white font-bold text-[16px] capitalize'><span><FaWind /></span> 2.67 km/h</h4>
                                    </div>
                                    <div className="bottom flex justify-between mt-1 items-center">
                                        <h5 className='text-white/[0.8] font-bold text-[16px] capitalize'><img src={Rain} alt="" /> Light Rain</h5>
                                        <h5 className='me-16 text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> 65%</h5>
                                        <h5 className='text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><WiHumidity /></span> 82%</h5>
                                    </div>
                                </div>
                                <div className="box w-full bg-white/[0.2] rounded-md px-3 py-1">
                                    <div className="top flex justify-between">
                                        <h4 className='text-white font-bold text-[16px] capitalize'>wednesday</h4>
                                        <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> 7 C</h4>
                                        <h4 className='text-white font-bold text-[16px] capitalize'><span><FaWind /></span> 2.67 km/h</h4>
                                    </div>
                                    <div className="bottom flex justify-between mt-1 items-center">
                                        <h5 className='text-white/[0.8] font-bold text-[16px] capitalize'><img src={Rain} alt="" /> Light Rain</h5>
                                        <h5 className='me-16 text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> 65%</h5>
                                        <h5 className='text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><WiHumidity /></span> 82%</h5>
                                    </div>
                                </div>
                                <div className="box w-full bg-white/[0.2] rounded-md px-3 py-1">
                                    <div className="top flex justify-between">
                                        <h4 className='text-white font-bold text-[16px] capitalize'>thursday</h4>
                                        <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> 7 C</h4>
                                        <h4 className='text-white font-bold text-[16px] capitalize'><span><FaWind /></span> 2.67 km/h</h4>
                                    </div>
                                    <div className="bottom flex justify-between mt-1 items-center">
                                        <h5 className='text-white/[0.8] font-bold text-[16px] capitalize'><img src={Rain} alt="" /> Light Rain</h5>
                                        <h5 className='me-16 text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> 65%</h5>
                                        <h5 className='text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><WiHumidity /></span> 82%</h5>
                                    </div>
                                </div>
                                <div className="box w-full bg-white/[0.2] rounded-md px-3 py-1">
                                    <div className="top flex justify-between">
                                        <h4 className='text-white font-bold text-[16px] capitalize'>friday</h4>
                                        <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> 7 C</h4>
                                        <h4 className='text-white font-bold text-[16px] capitalize'><span><FaWind /></span> 2.67 km/h</h4>
                                    </div>
                                    <div className="bottom flex justify-between mt-1 items-center">
                                        <h5 className='text-white/[0.8] font-bold text-[16px] capitalize'><img src={Rain} alt="" /> Light Rain</h5>
                                        <h5 className='me-16 text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> 65%</h5>
                                        <h5 className='text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><WiHumidity /></span> 82%</h5>
                                    </div>
                                </div>
                                <div className="box w-full bg-white/[0.2] rounded-md px-3 py-1">
                                    <div className="top flex justify-between">
                                        <h4 className='text-white font-bold text-[16px] capitalize'>saturday</h4>
                                        <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> 7 C</h4>
                                        <h4 className='text-white font-bold text-[16px] capitalize'><span><FaWind /></span> 2.67 km/h</h4>
                                    </div>
                                    <div className="bottom flex justify-between mt-1 items-center">
                                        <h5 className='text-white/[0.8] font-bold text-[16px] capitalize'><img src={Rain} alt="" /> Light Rain</h5>
                                        <h5 className='me-16 text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> 65%</h5>
                                        <h5 className='text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><WiHumidity /></span> 82%</h5>
                                    </div>
                                </div>
                                <div className="box w-full bg-white/[0.2] rounded-md px-3 py-1">
                                    <div className="top flex justify-between">
                                        <h4 className='text-white font-bold text-[16px] capitalize'>sunday</h4>
                                        <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> 7 C</h4>
                                        <h4 className='text-white font-bold text-[16px] capitalize'><span><FaWind /></span> 2.67 km/h</h4>
                                    </div>
                                    <div className="bottom flex justify-between mt-1 items-center">
                                        <h5 className='text-white/[0.8] font-bold text-[16px] capitalize'><img src={Rain} alt="" /> Light Rain</h5>
                                        <h5 className='me-16 text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> 65%</h5>
                                        <h5 className='text-white font-bold text-[16px] capitalize'><span className='text-[20px]'><WiHumidity /></span> 82%</h5>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather