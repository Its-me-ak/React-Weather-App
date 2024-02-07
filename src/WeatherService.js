
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
const MakeIconURL = (iconId) => `http://openweathermap.org/img/wn/${iconId}@2x.png`
const GetFormetedWeatherData = async (city, units = "metric") => {
    // const element = document.querySelector(".city-input");
    // if (element.value === "") {
    //     return 0;
    // }

    // const cityName = element?.value;
    const url = `https://openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units${units}`
    // First Method With Promise
    const data = await fetch(url)
        .then((res) => res.json())
        .then((data) => data)
    // console.log(data);
    const Sunrise = (getTime(data.sys.sunrise, data.timezone))
    const Sunset = (getTime(data.sys.sunset, data.timezone))

    // Second Method With Simple Async Await
    // const response = await fetch(url);
    // const data = await response.json()
    const citylon = data.coord.lon;
    const citylat = data.coord.lat;
    const oneUrl = `https://openweathermap.org/data/2.5/onecall?lat=${citylat}&lon=${citylon}&units=metric&appid=${apiKey}`;
    const oneData = await fetch(oneUrl)
        .then((oneRes) => oneRes.json())
        .then((oneData) => oneData)
    // console.log(oneData);
    const date = (getDate(oneData.current.dt, oneData.timezone_offset));
    const time = (getTime(oneData.current.dt, oneData.timezone_offset));

    const {
        weather,
        name,
        visibility,
        main: { temp, humidity, pressure, feels_like },
        wind: { speed },
        sys: { country },
        coord: { lon, lat }
    } = data
    const { description, icon } = weather[0]

    const {
        current: { clouds },
        hourly, daily
    } = oneData

    let timePhase1 = (getTime(oneData.hourly[2].dt, oneData.timezone_offset));
    let timePhase2 = (getTime(oneData.hourly[3].dt, oneData.timezone_offset));
    let timePhase3 = (getTime(oneData.hourly[4].dt, oneData.timezone_offset));
    let timePhase4 = (getTime(oneData.hourly[5].dt, oneData.timezone_offset));
    let timePhase5 = (getTime(oneData.hourly[6].dt, oneData.timezone_offset));

    const weekDateOne = (getDate(oneData.daily[1].dt, oneData.timezone_offset));
    const weekDateTwo = (getDate(oneData.daily[2].dt, oneData.timezone_offset));
    const weekDateThree = (getDate(oneData.daily[3].dt, oneData.timezone_offset));
    const weekDateFour = (getDate(oneData.daily[4].dt, oneData.timezone_offset));
    const weekDateFive = (getDate(oneData.daily[5].dt, oneData.timezone_offset));
    const weekDateSix = (getDate(oneData.daily[6].dt, oneData.timezone_offset));



    return {
        name, visibility, temp, humidity, pressure, feels_like, speed, country, Sunrise, Sunset, description, lon, lat,
        iconURL: MakeIconURL(icon),
        date, time, clouds, hourly, timePhase1, timePhase2, timePhase3, timePhase4, timePhase5,
        daily,  weekDateOne, weekDateTwo, weekDateThree, weekDateFour, weekDateFive, weekDateSix
    }

    //     //  Weather Description and Temperature
    //     const City = document.getElementById("city");
    //     const dateDay = document.getElementById('date')
    //     const dateTime = document.getElementById('time')
    //     const Country = document.getElementById('country');
    //     const Temprature = document.getElementById('temp');
    //     const Description = document.getElementById('description');
    //     const WeatherFeel = document.getElementById('weatherFeel');
    //     const Wind = document.getElementById('wind');
    //     const Cloud = document.getElementById('cloud');
    //     const HumidityValue = document.getElementById('humidity');
    //     const PressureValue = document.getElementById('pressure');
    //     const Visibility = document.querySelector('#visibility');
    //     const SunriseTime = document.getElementById('sunrise');
    //     const Sunrise = (getTime(data.sys.sunrise, data.timezone))
    //     const SunsetTime = document.getElementById('sunset');
    //     const Sunset = (getTime(data.sys.sunset, data.timezone))

    //     City.innerHTML = data?.name
    //     dateDay.innerHTML = date;
    //     dateTime.innerHTML = time
    //     Country.innerHTML = data.sys.country
    //     Temprature.innerHTML = Math.round(oneData.current.temp);
    //     Description.innerHTML = oneData.current.weather[0].description;
    //     WeatherFeel.innerHTML = Math.round(oneData.current.feels_like);
    //     Wind.innerHTML = oneData.current.wind_speed;
    //     Cloud.innerHTML = `${oneData.current.clouds}%`;
    //     HumidityValue.innerHTML = `${oneData.current.humidity}%`;
    //     PressureValue.innerHTML = `${oneData.current.pressure}hPa`;
    //     Visibility.innerHTML = `${(oneData.current.visibility) / 1000} KM`;
    //     SunriseTime.innerHTML = Sunrise;
    //     SunsetTime.innerHTML = Sunset;

    //     // Weekly Weather
    //     // 1
    //     const weekDate1 = document.getElementById('weekDate1');
    //     const weekDateOne = (getDate(oneData.daily[1].dt, oneData.timezone_offset));
    //     weekDate1.innerHTML = weekDateOne

    //     const weekTempOne = document.getElementById('weekTemp1')
    //     weekTempOne.innerHTML = Math.round(oneData.daily[1].temp.min);

    //     const weekWindOne = document.getElementById('weekWind1');
    //     weekWindOne.innerHTML = `${oneData.daily[1].wind_speed} km/h`;

    //     const weekWeatherIconOne = oneData.daily[1].weather[0].icon;
    //     const weeklyIconUrlOne = `https://openweathermap.org/img/wn/${weekWeatherIconOne}@2x.png`
    //     const weeklyIconImgOne = document.getElementById('weekWeatherIcon1');
    //     weeklyIconImgOne.src = weeklyIconUrlOne

    //     const weekWeatherOne = document.getElementById('weekWeather1')
    //     weekWeatherOne.innerHTML = oneData.daily[1].weather[0].description

    //     const weekCloudOne = document.getElementById('weekCloud1')
    //     weekCloudOne.innerHTML = `${oneData.daily[1].clouds}%`

    //     const weekHumidityOne = document.getElementById('weekHumidity1')
    //     weekHumidityOne.innerHTML = `${oneData.daily[1].humidity}%`

    //     // 2
    //     const weekDate2 = document.getElementById('weekDate2');
    //     const weekDateTwo = (getDate(oneData.daily[2].dt, oneData.timezone_offset));
    //     weekDate2.innerHTML = weekDateTwo

    //     const weekTempTwo = document.getElementById('weekTemp2')
    //     weekTempTwo.innerHTML = Math.round(oneData.daily[2].temp.min);

    //     const weekWindTwo = document.getElementById('weekWind2');
    //     weekWindTwo.innerHTML = `${oneData.daily[2].wind_speed} km/h`;

    //     const weekWeatherIconTwo = oneData.daily[2].weather[0].icon;
    //     const weeklyIconUrlTwo = `https://openweathermap.org/img/wn/${weekWeatherIconTwo}@2x.png`
    //     const weeklyIconImgTwo = document.getElementById('weekWeatherIcon2');
    //     weeklyIconImgTwo.src = weeklyIconUrlTwo

    //     const weekWeatherTwo = document.getElementById('weekWeather2')
    //     weekWeatherTwo.innerHTML = oneData.daily[2].weather[0].description

    //     const weekCloudTwo = document.getElementById('weekCloud2')
    //     weekCloudTwo.innerHTML = `${oneData.daily[2].clouds}%`

    //     const weekHumidityTwo = document.getElementById('weekHumidity2')
    //     weekHumidityTwo.innerHTML = `${oneData.daily[2].humidity}%`

    //     // 3
    //     const weekDate3 = document.getElementById('weekDate3');
    //     const weekDateThree = (getDate(oneData.daily[3].dt, oneData.timezone_offset));
    //     weekDate3.innerHTML = weekDateThree

    //     const weekTempThree = document.getElementById('weekTemp3')
    //     weekTempThree.innerHTML = Math.round(oneData.daily[3].temp.min);

    //     const weekWindThree = document.getElementById('weekWind3');
    //     weekWindThree.innerHTML = `${oneData.daily[3].wind_speed} km/h`;

    //     const weekWeatherIconThree = oneData.daily[3].weather[0].icon;
    //     const weeklyIconUrlThree = `https://openweathermap.org/img/wn/${weekWeatherIconThree}@2x.png`
    //     const weeklyIconImgThree = document.getElementById('weekWeatherIcon3');
    //     weeklyIconImgThree.src = weeklyIconUrlThree

    //     const weekWeatherThree = document.getElementById('weekWeather3')
    //     weekWeatherThree.innerHTML = oneData.daily[3].weather[0].description

    //     const weekCloudThree = document.getElementById('weekCloud3')
    //     weekCloudThree.innerHTML = `${oneData.daily[3].clouds}%`

    //     const weekHumidityThree = document.getElementById('weekHumidity3')
    //     weekHumidityThree.innerHTML = `${oneData.daily[3].humidity}%`

    //     // 4
    //     const weekDate4 = document.getElementById('weekDate4');
    //     const weekDateFour = (getDate(oneData.daily[4].dt, oneData.timezone_offset));
    //     weekDate4.innerHTML = weekDateFour

    //     const weekTempFour = document.getElementById('weekTemp4')
    //     weekTempFour.innerHTML = Math.round(oneData.daily[4].temp.min);

    //     const weekWindFour = document.getElementById('weekWind4');
    //     weekWindFour.innerHTML = `${oneData.daily[4].wind_speed} km/h`;

    //     const weekWeatherIconFour = oneData.daily[4].weather[0].icon;
    //     const weeklyIconUrlFour = `https://openweathermap.org/img/wn/${weekWeatherIconFour}@2x.png`
    //     const weeklyIconImgFour = document.getElementById('weekWeatherIcon4');
    //     weeklyIconImgFour.src = weeklyIconUrlFour

    //     const weekWeatherFour = document.getElementById('weekWeather4')
    //     weekWeatherFour.innerHTML = oneData.daily[4].weather[0].description

    //     const weekCloudFour = document.getElementById('weekCloud4')
    //     weekCloudFour.innerHTML = `${oneData.daily[4].clouds}%`

    //     const weekHumidityFour = document.getElementById('weekHumidity4')
    //     weekHumidityFour.innerHTML = `${oneData.daily[4].humidity}%`

    //     // 5
    //     const weekDate5 = document.getElementById('weekDate5');
    //     const weekDateFIve = (getDate(oneData.daily[5].dt, oneData.timezone_offset));
    //     weekDate5.innerHTML = weekDateFIve

    //     const weekTempFive = document.getElementById('weekTemp5')
    //     weekTempFive.innerHTML = Math.round(oneData.daily[5].temp.min);

    //     const weekWindFive = document.getElementById('weekWind5');
    //     weekWindFive.innerHTML = `${oneData.daily[5].wind_speed} km/h`;

    //     const weekWeatherIconFive = oneData.daily[5].weather[0].icon;
    //     const weeklyIconUrlFive = `https://openweathermap.org/img/wn/${weekWeatherIconFive}@2x.png`
    //     const weeklyIconImgFive = document.getElementById('weekWeatherIcon5');
    //     weeklyIconImgFive.src = weeklyIconUrlFive

    //     const weekWeatherFive = document.getElementById('weekWeather5')
    //     weekWeatherFive.innerHTML = oneData.daily[5].weather[0].description

    //     const weekCloudFive = document.getElementById('weekCloud5')
    //     weekCloudFive.innerHTML = `${oneData.daily[5].clouds}%`

    //     const weekHumidityFive = document.getElementById('weekHumidity5')
    //     weekHumidityFive.innerHTML = `${oneData.daily[5].humidity}%`

    //     // 6
    //     const weekDate6 = document.getElementById('weekDate6');
    //     const weekDateSix = (getDate(oneData.daily[6].dt, oneData.timezone_offset));
    //     weekDate6.innerHTML = weekDateSix

    //     const weekTempSix = document.getElementById('weekTemp6')
    //     weekTempSix.innerHTML = Math.round(oneData.daily[6].temp.min);

    //     const weekWindSix = document.getElementById('weekWind6');
    //     weekWindSix.innerHTML = `${oneData.daily[6].wind_speed} km/h`;

    //     const weekWeatherIconSix = oneData.daily[6].weather[0].icon;
    //     const weeklyIconUrlSix = `https://openweathermap.org/img/wn/${weekWeatherIconSix}@2x.png`
    //     const weeklyIconImgSix = document.getElementById('weekWeatherIcon6');
    //     weeklyIconImgSix.src = weeklyIconUrlSix

    //     const weekWeatherSix = document.getElementById('weekWeather6')
    //     weekWeatherSix.innerHTML = oneData.daily[6].weather[0].description

    //     const weekCloudSix = document.getElementById('weekCloud6')
    //     weekCloudSix.innerHTML = `${oneData.daily[6].clouds}%`

    //     const weekHumiditySix = document.getElementById('weekHumidity6')
    //     weekHumiditySix.innerHTML = `${oneData.daily[6].humidity}%`
}

export { GetFormetedWeatherData }