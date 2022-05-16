import axios, {AxiosResponse} from 'axios';
import {apiKEY} from '../apiKey.env';

export async function getWeatherByCoords(longitude: number, latitude: number) {
    try {
        const response: AxiosResponse<WeatherResponse> = await axios.get(`https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKEY}&lang=ru`)
        return responseHandler(response.data)
    }
    catch (err: unknown) {
        console.log(`Ошибка: ${JSON.stringify(err)}`)
    }
}

export async function getWeatherByCity(cityTitle: string) {
    try {
        const response:AxiosResponse<WeatherResponse> = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityTitle}&units=metric&appid=${apiKEY}&lang=ru`)
        return responseHandler(response.data)
    } catch (err) {
        console.log(`Ошикба: ${JSON.stringify(err)}`)
    }
}

interface WeatherResponse {
    sys: {
        sunrise: number;
        sunset: number;
    };
    name: string;
    main: {
        humidity: string;
        feels_like: number;
        temp: number;
        pressure: number;
    }
}

function responseHandler(response: WeatherResponse) {
    const sunrise: number = response.sys.sunrise
    const sunset: number = response.sys.sunset
    const cityTitle: string = response.name
    const humidity: string = response.main.humidity
    const feelsLike = Math.round(response.main.feels_like)
    const temperature = Math.round(response.main.temp)
    const pressure: number = response.main.pressure
    const timeSunrise = convertTimeSunrise(sunrise)
    const timeSunset = convertTimeSunset(sunset)
    return {cityTitle, humidity, feelsLike, temperature, pressure, timeSunset, timeSunrise}
}

function convertTimeSunrise(time: number) {
    const date = new Date(time * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return timeFormatter(hours, minutes, seconds)
}

function convertTimeSunset(time: number) {
    const date = new Date(time * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return timeFormatter(hours, minutes, seconds)
}

function timeFormatter(hours: number, minutes: number, seconds: number) {
    return `${hours}:${minutes}:${seconds}`
}