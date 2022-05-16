import axios, {AxiosResponse} from "axios";
import {apiKEY} from "../apiKey.env";

export async function autoLocationWeatherDisplay(longitude: number, latitude: number) {
    try {
        console.log(longitude, latitude)
        const response: AxiosResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKEY}&lang=ru`)
        return responseHandler(response)
    }
    catch (err) {
        console.log(`Ошибка:${err}`)
    }
}

export async function getWeatherToday(cityTitleValue: string) {
    try {
        const response:AxiosResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityTitleValue}&units=metric&appid=${apiKEY}&lang=ru`)
            return responseHandler(response)
    } catch (err) {
        console.log(`Ошикба:${err}`)
    }
}

function responseHandler(response?: AxiosResponse | undefined) {
    const sunrise: number = response?.data.sys.sunrise
    const sunset: number = response?.data.sys.sunset
    const cityTitle: string = response?.data.name
    const humidity: string = response?.data.main.humidity
    const feelsLike = Math.round(response?.data.main.feels_like)
    const temperature = Math.round(response?.data.main.temp)
    const pressure: number = response?.data.main.pressure
    const weatherState = {cityTitle, humidity, feelsLike, temperature, pressure}
    const timeSunrise = convertTimeSunrise(sunrise)
    const timeSunset = convertTimeSunset(sunset)
    return {...weatherState, timeSunset, timeSunrise}
}

function convertTimeSunrise(time: number) {
    const date = new Date(time * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return convertTimeHandler(hours, minutes, seconds)
}

function convertTimeSunset(time: number) {
    const date = new Date(time * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return convertTimeHandler(hours, minutes, seconds)
}

function convertTimeHandler(hours: number, minutes: number, seconds: number) {
    return `${hours}:${minutes}:${seconds}`
}