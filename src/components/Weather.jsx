import React, { useState } from 'react'
import Loader from './Loader';
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
    const [ loader, setLoader ] = useState(false)
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
                setLoader(true)
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
            setLoader(false)


            // Image Icon
            const { weather } = data;
            const icon = weather[0].icon
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
            const iconImg = document.getElementById('iconImg');
            iconImg.src = iconUrl


            //  Weather Description and Temperature
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
            const Sunrise = (getTime(data.sys.sunrise, data.timezone))
            const SunsetTime = document.getElementById('sunset');
            const Sunset = (getTime(data.sys.sunset, data.timezone))

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
            SunriseTime.innerHTML = Sunrise;
            SunsetTime.innerHTML = Sunset;

            // Hourly Forcast Time
            let timePhase1 = (getTime(oneData.hourly[2].dt, oneData.timezone_offset));
            let timePhase2 = (getTime(oneData.hourly[3].dt, oneData.timezone_offset));
            let timePhase3 = (getTime(oneData.hourly[4].dt, oneData.timezone_offset));
            let timePhase4 = (getTime(oneData.hourly[5].dt, oneData.timezone_offset));
            let timePhase5 = (getTime(oneData.hourly[6].dt, oneData.timezone_offset));

            const HourlyTime1 = document.getElementById('hourlyTimeOne');
            const HourlyTime2 = document.getElementById('hourlyTimeTwo');
            const HourlyTime3 = document.getElementById('hourlyTimeThree');
            const HourlyTime4 = document.getElementById('hourlyTimeFour');
            const HourlyTime5 = document.getElementById('hourlyTimeFive');

            HourlyTime1.innerHTML = timePhase1
            HourlyTime2.innerHTML = timePhase2
            HourlyTime3.innerHTML = timePhase3
            HourlyTime4.innerHTML = timePhase4
            HourlyTime5.innerHTML = timePhase5

            // Hourly Forcast Icon Image
            const HourlyIconOne = oneData.hourly[2].weather[0].icon;
            const HourlyIconUrlOne = `https://openweathermap.org/img/wn/${HourlyIconOne}@2x.png`
            const hourlyiconImg1 = document.getElementById('hourlyIconImg1');
            hourlyiconImg1.src = HourlyIconUrlOne

            const HourlyIconTwo = oneData.hourly[3].weather[0].icon;
            const HourlyIconUrlTwo = `https://openweathermap.org/img/wn/${HourlyIconTwo}@2x.png`
            const hourlyiconImg2 = document.getElementById('hourlyIconImg2');
            hourlyiconImg2.src = HourlyIconUrlTwo

            const HourlyIconThree = oneData.hourly[4].weather[0].icon;
            const HourlyIconUrlThree = `https://openweathermap.org/img/wn/${HourlyIconThree}@2x.png`
            const hourlyiconImg3 = document.getElementById('hourlyIconImg3');
            hourlyiconImg3.src = HourlyIconUrlThree

            const HourlyIconOFour = oneData.hourly[5].weather[0].icon;
            const HourlyIconUrlFour = `https://openweathermap.org/img/wn/${HourlyIconOFour}@2x.png`
            const hourlyiconImg4 = document.getElementById('hourlyIconImg4');
            hourlyiconImg4.src = HourlyIconUrlFour

            const HourlyIconOneFive = oneData.hourly[6].weather[0].icon;
            const HourlyIconUrlFive = `https://openweathermap.org/img/wn/${HourlyIconOneFive}@2x.png`
            const hourlyiconImg5 = document.getElementById('hourlyIconImg5');
            hourlyiconImg5.src = HourlyIconUrlFive

            // Hourly Temprature
            const HourlyTemp1 = document.getElementById('hourlyTempOne');
            const HourlyTemp2 = document.getElementById('hourlyTempTwo')
            const HourlyTemp3 = document.getElementById('hourlyTempThree')
            const HourlyTemp4 = document.getElementById('hourlyTempFour')
            const HourlyTemp5 = document.getElementById('hourlyTempFive')

            HourlyTemp1.innerHTML = `${Math.round(oneData.hourly[2].temp)}`
            HourlyTemp2.innerHTML = `${Math.round(oneData.hourly[3].temp)}`
            HourlyTemp3.innerHTML = `${Math.round(oneData.hourly[4].temp)}`
            HourlyTemp4.innerHTML = `${Math.round(oneData.hourly[5].temp)}`
            HourlyTemp5.innerHTML = `${Math.round(oneData.hourly[6].temp)}`

            // Weekly Weather
            // 1
            const weekDate1 = document.getElementById('weekDate1');
            const weekDateOne = (getDate(oneData.daily[1].dt, oneData.timezone_offset));
            weekDate1.innerHTML = weekDateOne

            const weekTempOne = document.getElementById('weekTemp1')
            weekTempOne.innerHTML = Math.round(oneData.daily[1].temp.min);

            const weekWindOne = document.getElementById('weekWind1');
            weekWindOne.innerHTML = `${oneData.daily[1].wind_speed} km/h`;

            const weekWeatherIconOne = oneData.daily[1].weather[0].icon;
            const weeklyIconUrlOne = `https://openweathermap.org/img/wn/${weekWeatherIconOne}@2x.png`
            const weeklyIconImgOne = document.getElementById('weekWeatherIcon1');
            weeklyIconImgOne.src = weeklyIconUrlOne

            const weekWeatherOne = document.getElementById('weekWeather1')
            weekWeatherOne.innerHTML = oneData.daily[1].weather[0].description

            const weekCloudOne = document.getElementById('weekCloud1')
            weekCloudOne.innerHTML = `${oneData.daily[1].clouds}%`

            const weekHumidityOne = document.getElementById('weekHumidity1')
            weekHumidityOne.innerHTML = `${oneData.daily[1].humidity}%`

            // 2
            const weekDate2 = document.getElementById('weekDate2');
            const weekDateTwo = (getDate(oneData.daily[2].dt, oneData.timezone_offset));
            weekDate2.innerHTML = weekDateTwo

            const weekTempTwo = document.getElementById('weekTemp2')
            weekTempTwo.innerHTML = Math.round(oneData.daily[2].temp.min);

            const weekWindTwo = document.getElementById('weekWind2');
            weekWindTwo.innerHTML = `${oneData.daily[2].wind_speed} km/h`;

            const weekWeatherIconTwo = oneData.daily[2].weather[0].icon;
            const weeklyIconUrlTwo = `https://openweathermap.org/img/wn/${weekWeatherIconTwo}@2x.png`
            const weeklyIconImgTwo = document.getElementById('weekWeatherIcon2');
            weeklyIconImgTwo.src = weeklyIconUrlTwo

            const weekWeatherTwo = document.getElementById('weekWeather2')
            weekWeatherTwo.innerHTML = oneData.daily[2].weather[0].description

            const weekCloudTwo = document.getElementById('weekCloud2')
            weekCloudTwo.innerHTML = `${oneData.daily[2].clouds}%`

            const weekHumidityTwo = document.getElementById('weekHumidity2')
            weekHumidityTwo.innerHTML = `${oneData.daily[2].humidity}%`

            // 3
            const weekDate3 = document.getElementById('weekDate3');
            const weekDateThree = (getDate(oneData.daily[3].dt, oneData.timezone_offset));
            weekDate3.innerHTML = weekDateThree

            const weekTempThree = document.getElementById('weekTemp3')
            weekTempThree.innerHTML = Math.round(oneData.daily[3].temp.min);

            const weekWindThree = document.getElementById('weekWind3');
            weekWindThree.innerHTML = `${oneData.daily[3].wind_speed} km/h`;

            const weekWeatherIconThree = oneData.daily[3].weather[0].icon;
            const weeklyIconUrlThree = `https://openweathermap.org/img/wn/${weekWeatherIconThree}@2x.png`
            const weeklyIconImgThree = document.getElementById('weekWeatherIcon3');
            weeklyIconImgThree.src = weeklyIconUrlThree

            const weekWeatherThree = document.getElementById('weekWeather3')
            weekWeatherThree.innerHTML = oneData.daily[3].weather[0].description

            const weekCloudThree = document.getElementById('weekCloud3')
            weekCloudThree.innerHTML = `${oneData.daily[3].clouds}%`

            const weekHumidityThree = document.getElementById('weekHumidity3')
            weekHumidityThree.innerHTML = `${oneData.daily[3].humidity}%`

            // 4
            const weekDate4 = document.getElementById('weekDate4');
            const weekDateFour = (getDate(oneData.daily[4].dt, oneData.timezone_offset));
            weekDate4.innerHTML = weekDateFour

            const weekTempFour = document.getElementById('weekTemp4')
            weekTempFour.innerHTML = Math.round(oneData.daily[4].temp.min);

            const weekWindFour = document.getElementById('weekWind4');
            weekWindFour.innerHTML = `${oneData.daily[4].wind_speed} km/h`;

            const weekWeatherIconFour = oneData.daily[4].weather[0].icon;
            const weeklyIconUrlFour = `https://openweathermap.org/img/wn/${weekWeatherIconFour}@2x.png`
            const weeklyIconImgFour = document.getElementById('weekWeatherIcon4');
            weeklyIconImgFour.src = weeklyIconUrlFour

            const weekWeatherFour = document.getElementById('weekWeather4')
            weekWeatherFour.innerHTML = oneData.daily[4].weather[0].description

            const weekCloudFour = document.getElementById('weekCloud4')
            weekCloudFour.innerHTML = `${oneData.daily[4].clouds}%`

            const weekHumidityFour = document.getElementById('weekHumidity4')
            weekHumidityFour.innerHTML = `${oneData.daily[4].humidity}%`

            // 5
            const weekDate5 = document.getElementById('weekDate5');
            const weekDateFIve = (getDate(oneData.daily[5].dt, oneData.timezone_offset));
            weekDate5.innerHTML = weekDateFIve

            const weekTempFive = document.getElementById('weekTemp5')
            weekTempFive.innerHTML = Math.round(oneData.daily[5].temp.min);

            const weekWindFive = document.getElementById('weekWind5');
            weekWindFive.innerHTML = `${oneData.daily[5].wind_speed} km/h`;

            const weekWeatherIconFive = oneData.daily[5].weather[0].icon;
            const weeklyIconUrlFive = `https://openweathermap.org/img/wn/${weekWeatherIconFive}@2x.png`
            const weeklyIconImgFive = document.getElementById('weekWeatherIcon5');
            weeklyIconImgFive.src = weeklyIconUrlFive

            const weekWeatherFive = document.getElementById('weekWeather5')
            weekWeatherFive.innerHTML = oneData.daily[5].weather[0].description

            const weekCloudFive = document.getElementById('weekCloud5')
            weekCloudFive.innerHTML = `${oneData.daily[5].clouds}%`

            const weekHumidityFive = document.getElementById('weekHumidity5')
            weekHumidityFive.innerHTML = `${oneData.daily[5].humidity}%`

            // 6
            const weekDate6 = document.getElementById('weekDate6');
            const weekDateSix = (getDate(oneData.daily[6].dt, oneData.timezone_offset));
            weekDate6.innerHTML = weekDateSix

            const weekTempSix = document.getElementById('weekTemp6')
            weekTempSix.innerHTML = Math.round(oneData.daily[6].temp.min);

            const weekWindSix = document.getElementById('weekWind6');
            weekWindSix.innerHTML = `${oneData.daily[6].wind_speed} km/h`;

            const weekWeatherIconSix = oneData.daily[6].weather[0].icon;
            const weeklyIconUrlSix = `https://openweathermap.org/img/wn/${weekWeatherIconSix}@2x.png`
            const weeklyIconImgSix = document.getElementById('weekWeatherIcon6');
            weeklyIconImgSix.src = weeklyIconUrlSix

            const weekWeatherSix = document.getElementById('weekWeather6')
            weekWeatherSix.innerHTML = oneData.daily[6].weather[0].description

            const weekCloudSix = document.getElementById('weekCloud6')
            weekCloudSix.innerHTML = `${oneData.daily[6].clouds}%`

            const weekHumiditySix = document.getElementById('weekHumidity6')
            weekHumiditySix.innerHTML = `${oneData.daily[6].humidity}%`
          
        } 
        catch (error) {
            console.log("city not found ");
            alert("city not Found")
        }
    }
    return (
        <>
            <div className="main-bg pt-5 pb-2">
                {loader ? <Loader /> :
                    <div className="container my-0 mx-auto">
                        <div>
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
                                        <div className="flex justify-between items-center px-6 py-3 bg-white/[0.3] rounded backdrop-blur-sm">
                                            <div className="location text-center">
                                                <h2 className='text-white uppercase text-[18px] font-bold'><span id='city'>berlin</span>, <span id='country'>De</span></h2>
                                                <h3 className='text-white/[0.8] text-[15px] font-[600]' id='date'>Sunday, 1 jan</h3>
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

                                        <div className="grid grid-cols-4 gap-5 px-0 py-3 bg-white/[0.3] rounded all columns-4 backdrop-blur-sm">
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
                                        <div className="flex gap-4 mt-3">
                                            <div className="box bg-white/[0.3] rounded-lg py-2 px-5 backdrop-blur-sm">
                                                <p className='text-white/[0.6] font-semibold' id='hourlyTimeOne'>01:00 AM</p>
                                                <img src="https://openweathermap.org/img/wn/02d@2x.png" id='hourlyIconImg1' alt="" />
                                                <h5 className='text-white font-bold text-lg'><span id='hourlyTempOne'>7</span>&deg;C</h5>
                                            </div>
                                            <div className="box bg-white/[0.3] rounded-lg py-2 px-5 backdrop-blur-sm">
                                                <p className='text-white/[0.6] font-semibold' id='hourlyTimeTwo'>02:00 AM</p>
                                                <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" id='hourlyIconImg2' />
                                                <h5 className='text-white font-bold text-lg'><span id='hourlyTempTwo'>7</span>&deg;C</h5>
                                            </div>
                                            <div className="box bg-white/[0.3] rounded-lg py-2 px-5 backdrop-blur-sm">
                                                <p className='text-white/[0.6] font-semibold' id='hourlyTimeThree'>03:00 AM</p>
                                                <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" id='hourlyIconImg3' />
                                                <h5 className='text-white font-bold text-lg'><span id='hourlyTempThree'>7</span>&deg;C</h5>
                                            </div>
                                            <div className="box bg-white/[0.3] backdrop-blur-sm rounded-lg py-2 px-5">
                                                <p className='text-white/[0.6] font-semibold' id='hourlyTimeFour'>04:00 AM</p>
                                                <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" id='hourlyIconImg4' />
                                                <h5 className='text-white font-bold text-lg'><span id='hourlyTempFour'>7</span>&deg;C</h5>
                                            </div>
                                            <div className="box bg-white/[0.3] backdrop-blur-sm rounded-lg py-2 px-5">
                                                <p className='text-white/[0.6] font-semibold' id='hourlyTimeFive'>05:00 AM</p>
                                                <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" id='hourlyIconImg5' />
                                                <h5 className='text-white font-bold text-lg'><span id='hourlyTempFive'>7</span>&deg;C</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="weekly-forcast">
                                    <h3 className='text-center text-white/[0.9] text-[22px] uppercase font-bold mb-1'>weekly forcast</h3>

                                    <div className="flex weekly gap-2 flex-col">
                                        <div className="box w-full bg-white/[0.3] backdrop-blur-sm rounded-md px-3 py-1">
                                            <div className="top flex justify-between">
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekDate1'>monday, 2 Jan</h4>
                                                <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> <span id='weekTemp1'>7</span>&deg;C</h4>
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekWind1'><span><FaWind /></span> 2.67 km/h</h4>
                                            </div>
                                            <div className="bottom flex justify-between mt-1 items-center">
                                                <h5 className='text-white/[0.8] font-semibold text-[15px]'> <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" id='weekWeatherIcon1' /> <span id='weekWeather1' className='capitalize'>Light Rain</span></h5>
                                                <h5 className='me-16 text-white font-semibold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> <span id='weekCloud1'>65%</span></h5>
                                                <h5 className='text-white font-semibold text-[16px] capitalize'><span className='text-[20px]'><WiHumidity /></span><span id='weekHumidity1'>82%</span></h5>
                                            </div>
                                        </div>
                                        <div className="box w-full bg-white/[0.3] backdrop-blur-sm rounded-md px-3 py-1">
                                            <div className="top flex justify-between">
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekDate2'>Tuesday, 3 Jan</h4>
                                                <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> <span id='weekTemp2'>7</span>&deg;C</h4>
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekWind2'><span><FaWind /></span> 2.67 km/h</h4>
                                            </div>
                                            <div className="bottom flex justify-between mt-1 items-center">
                                                <h5 className='text-white/[0.8] font-semibold text-[15px]'> <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" id='weekWeatherIcon2' /> <span id='weekWeather2' className='capitalize'>Light Rain</span></h5>
                                                <h5 className='me-16 text-white font-semibold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> <span id='weekCloud2'>65%</span></h5>
                                                <h5 className='text-white font-semibold text-[16px] capitalize' ><span className='text-[20px]'><WiHumidity /></span> <span id='weekHumidity2'>82%</span></h5>
                                            </div>
                                        </div>
                                        <div className="box w-full bg-white/[0.3] backdrop-blur-sm rounded-md px-3 py-1">
                                            <div className="top flex justify-between">
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekDate3'>Tuesday, 3 Jan</h4>
                                                <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> <span id='weekTemp3'>7</span>&deg;C</h4>
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekWind3'><span><FaWind /></span> 2.67 km/h</h4>
                                            </div>
                                            <div className="bottom flex justify-between mt-1 items-center">
                                                <h5 className='text-white/[0.8] font-semibold text-[15px]'> <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" id='weekWeatherIcon3' /> <span id='weekWeather3' className='capitalize'>Light Rain</span></h5>
                                                <h5 className='me-16 text-white font-semibold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> <span id='weekCloud3'>65%</span></h5>
                                                <h5 className='text-white font-semibold text-[16px] capitalize' ><span className='text-[20px]'><WiHumidity /></span> <span id='weekHumidity3'>82%</span></h5>
                                            </div>
                                        </div>
                                        <div className="box w-full bg-white/[0.3] backdrop-blur-sm rounded-md px-3 py-1">
                                            <div className="top flex justify-between">
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekDate4'>Tuesday, 3 Jan</h4>
                                                <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> <span id='weekTemp4'>7</span>&deg;C</h4>
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekWind4'><span><FaWind /></span> 2.67 km/h</h4>
                                            </div>
                                            <div className="bottom flex justify-between mt-1 items-center">
                                                <h5 className='text-white/[0.8] font-semibold text-[15px]'> <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" id='weekWeatherIcon4' /> <span id='weekWeather4' className='capitalize'>Light Rain</span></h5>
                                                <h5 className='me-16 text-white font-semibold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> <span id='weekCloud4'>65%</span></h5>
                                                <h5 className='text-white font-semibold text-[16px] capitalize' ><span className='text-[20px]'><WiHumidity /></span> <span id='weekHumidity4'>82%</span></h5>
                                            </div>
                                        </div>
                                        <div className="box w-full bg-white/[0.3] backdrop-blur-sm rounded-md px-3 py-1">
                                            <div className="top flex justify-between">
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekDate5'>Tuesday, 3 Jan</h4>
                                                <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> <span id='weekTemp5'>7</span>&deg;C</h4>
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekWind5'><span><FaWind /></span> 2.67 km/h</h4>
                                            </div>
                                            <div className="bottom flex justify-between mt-1 items-center">
                                                <h5 className='text-white/[0.8] font-semibold text-[15px]'> <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" id='weekWeatherIcon5' /> <span id='weekWeather5' className='capitalize'>Light Rain</span></h5>
                                                <h5 className='me-16 text-white font-semibold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> <span id='weekCloud5'>65%</span></h5>
                                                <h5 className='text-white font-semibold text-[16px] capitalize' ><span className='text-[20px]'><WiHumidity /></span> <span id='weekHumidity5'>82%</span></h5>
                                            </div>
                                        </div>
                                        <div className="box w-full bg-white/[0.3] backdrop-blur-sm rounded-md px-3 py-1">
                                            <div className="top flex justify-between">
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekDate6'>Tuesday, 3 Jan</h4>
                                                <h4 className='ms-6 text-white font-bold text-[16px] capitalize'><span><FaTemperatureHalf /></span> <span id='weekTemp6'>7</span>&deg;C</h4>
                                                <h4 className='text-white font-bold text-[16px] capitalize' id='weekWind6'><span><FaWind /></span> 2.67 km/h</h4>
                                            </div>
                                            <div className="bottom flex justify-between mt-1 items-center">
                                                <h5 className='text-white/[0.8] font-semibold text-[15px]'> <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" id='weekWeatherIcon6' /> <span id='weekWeather6' className='capitalize'>Light Rain</span></h5>
                                                <h5 className='me-16 text-white font-semibold text-[16px] capitalize'><span className='text-[20px]'><CiCloudOn /></span> <span id='weekCloud6'>65%</span></h5>
                                                <h5 className='text-white font-semibold text-[16px] capitalize' ><span className='text-[20px]'><WiHumidity /></span> <span id='weekHumidity6'>82%</span></h5>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Weather