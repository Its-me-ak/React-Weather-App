import React from 'react'
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { CiCloudOn } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";

const WeeklyWeather = () => {
  return (
    <>
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
    </>
  )
}

export default WeeklyWeather
