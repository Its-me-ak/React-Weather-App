import React from 'react'

const HourlyWeather = ({ hourlyWeather }) => {
        const Data = [
            {
                id: 2,
                time: hourlyWeather[2].dt,
                temprature: `${hourlyWeather[2].temp.toFixed()}°C`,
                icon: hourlyWeather[2].weather[0].icon
            },
            {
                id: 3,
                time: hourlyWeather[3].dt,
                temprature: `${hourlyWeather[3].temp.toFixed()}°C`,
                icon: hourlyWeather[3].weather[0].icon
            },
            {
                id: 4,
                time: hourlyWeather[4].dt,
                temprature: `${hourlyWeather[4].temp.toFixed()}°C`,
                icon: hourlyWeather[4].weather[0].icon
            },
            {
                id: 5,
                time: hourlyWeather[5].dt,
                temprature: `${hourlyWeather[5].temp.toFixed()}°C`,
                icon: hourlyWeather[5].weather[0].icon
            },
            {
                id: 6,
                time: hourlyWeather[6].dt,
                temprature: `${hourlyWeather[6].temp.toFixed()}°C`,
                icon: hourlyWeather[6].weather[0].icon
            },
        ]
        console.log(Data);

    return (
        <>
            <div className="today-forcast text-center mt-6">
                <h3 className='text-center text-white/[0.9] text-[22px] uppercase font-bold'>hourly forcast</h3>
                <div className="flex gap-4 mt-3">
                    {Data.map((item, id) => (
                        <div className="box bg-white/[0.3] rounded-lg py-2 px-5 backdrop-blur-sm" key={id}>
                            <p className='text-white/[0.6] font-semibold'>{item.time}</p>
                            <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} id='hourlyIconImg1' alt="" />
                            <h5 className='text-white font-bold text-lg'>{item.temprature}</h5>
                        </div>
                    ))}
                    {/* <div className="box bg-white/[0.3] rounded-lg py-2 px-5 backdrop-blur-sm">
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
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default HourlyWeather
