
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
const GetFormetedWeatherData = async (city) => {
    try {
        const url = `https://openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        // First Method With Promise
        const data = await fetch(url)
            .then((res) => res.json())
            .then((data) => data)
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
        console.log(oneData);
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

        let timePhase1 = (getTime(oneData?.hourly[2]?.dt, oneData?.timezone_offset));
        let timePhase2 = (getTime(oneData?.hourly[3]?.dt, oneData?.timezone_offset));
        let timePhase3 = (getTime(oneData?.hourly[4]?.dt, oneData?.timezone_offset));
        let timePhase4 = (getTime(oneData?.hourly[5]?.dt, oneData?.timezone_offset));
        let timePhase5 = (getTime(oneData?.hourly[6]?.dt, oneData?.timezone_offset));

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
            daily, weekDateOne, weekDateTwo, weekDateThree, weekDateFour, weekDateFive, weekDateSix
        }
    } catch (error) {
        alert('Wrong City, Please enter a valid city');
    }
}

export { GetFormetedWeatherData }