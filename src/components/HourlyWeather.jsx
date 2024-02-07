import React from 'react'

const HourlyWeather = ({ hourlyWeather, weather }) => {
        const Data = [
            {
                id: 2,
                time: weather.timePhase1,
                temprature: `${hourlyWeather[2].temp.toFixed()}°C`,
                icon: hourlyWeather[2].weather[0].icon
            },
            {
                id: 3,
                time: weather.timePhase2,
                temprature: `${hourlyWeather[3].temp.toFixed()}°C`,
                icon: hourlyWeather[3].weather[0].icon
            },
            {
                id: 4,
                time: weather.timePhase3,
                temprature: `${hourlyWeather[4].temp.toFixed()}°C`,
                icon: hourlyWeather[4].weather[0].icon
            },
            {
                id: 5,
                time: weather.timePhase4,
                temprature: `${hourlyWeather[5].temp.toFixed()}°C`,
                icon: hourlyWeather[5].weather[0].icon
            },
            {
                id: 6,
                time: weather.timePhase5,
                temprature: `${hourlyWeather[6].temp.toFixed()}°C`,
                icon: hourlyWeather[6].weather[0].icon
            },
        ]
        // console.log(Data);

    return (
        <>
            <div className="today-forcast text-center mt-6">
                <h3 className='text-center text-white/[0.9] text-[22px] uppercase font-bold'>hourly forcast</h3>
                <div className="grid sm:grid-cols-5 gap-4 mt-3">
                    {Data.map((item, id) => (
                        <div className="box bg-white/[0.3] rounded-lg py-2 px-5 backdrop-blur-sm flex flex-col items-center justify-center" key={id}>
                            <p className='text-white/[0.6] font-semibold'>{item.time}</p>
                            <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} id='hourlyIconImg1' alt="" />
                            <h5 className='text-white font-bold text-lg'>{item.temprature}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HourlyWeather
