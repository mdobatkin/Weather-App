import React, {useEffect, useState} from "react";
import axios from "axios";
import {WeatherCard} from "./components/WeatherCard/WeatherCard";
import {SearchBar} from "./components/searchBar/searchBar";
import {PreloaderComponent} from "../../Component/preloader/preloader";

export const WeatherToday = (): JSX.Element => {
    const [cityTitleValue, setCityTitleValue] = useState<string>('')
    const [cityTitle, setCityTitle] = useState<string>('')
    const [sunrise, setSunrise] = useState<string>('')
    const [sunset, setSunset] = useState<string>('')
    const [weatherState, setWeatherState] = useState<object>({
        cityTitle: '',
        humidity: '',
        feelsLike: 0,
        temperature: 0,
        pressure: 0,
})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const apiKEY = '362efd6a69303a0f5662a19ce25e5e89'
    let filterTimeout: NodeJS.Timeout;

    useEffect(() => {
        setIsLoading(true)
        getCurrentPosition()
    }, [])

    const doCityFilter = (query: string) => {
        clearTimeout(filterTimeout)
        if (!query) return setCityTitleValue('')

        filterTimeout = setTimeout(() => {
            console.log('====>', query)
            return getWeatherToday(query).then((data: any): any => setCityTitleValue(data))
        }, 1500)
    }

    function getCurrentPosition(): void {
        const geolocation: Geolocation = navigator.geolocation
        geolocation.getCurrentPosition(positionHandler, errorPositionHandler, {
            enableHighAccuracy: true
        })
    }

    function positionHandler(position: GeolocationPosition): void {
        const {latitude, longitude}: GeolocationCoordinates = position.coords
        autoLocationWeatherDisplay(longitude, latitude)
    }

    function errorPositionHandler(err: GeolocationPositionError) {
        return err
    }

    function convertTimeSunrise(time: number) {
        const date = new Date(time * 1000)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        let convertTime: string = `${hours}:${minutes}:${seconds}`
        return setSunrise(convertTime)
    }

    function convertTimeSunset(time: number) {
        const date = new Date(time * 1000)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        let convertTime: string = `${hours}:${minutes}:${seconds}`
        return setSunset(convertTime)
    }

    async function getWeatherToday(cityTitleValue: string): Promise<void> {
           try {
               const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityTitleValue}&units=metric&appid=${apiKEY}&lang=ru`)
               const sunrise = response.data.sys.sunrise
               const sunset = response.data.sys.sunset
               const cityTitle = response.data.name
               const humidity = response.data.main.humidity
               const feelsLike = Math.round(response.data.main.feels_like)
               const temperature = Math.round(response.data.main.temp)
               const pressure = response.data.main.pressure
               convertTimeSunrise(sunrise)
               setCityTitle(cityTitle)
               convertTimeSunset(sunset)
               setWeatherState({cityTitle, humidity, feelsLike, temperature, pressure})
               setIsLoading(false)
               console.log(response)
           }
           catch (err) {
            console.log(`Ошикба:${err}`)
           }
        }

    async function autoLocationWeatherDisplay(longitude: number, latitude: number): Promise<void> {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKEY}&lang=ru`)
            const sunrise = response.data.sys.sunrise
            const sunset = response.data.sys.sunset
            const cityTitle = response.data.name
            const humidity = response.data.main.humidity
            const feelsLike = Math.round(response.data.main.feels_like)
            const temperature = Math.round(response.data.main.temp)
            const pressure = response.data.main.pressure
            convertTimeSunrise(sunrise)
            setCityTitle(cityTitle)
            convertTimeSunset(sunset)
            setWeatherState({cityTitle, humidity, feelsLike, temperature, pressure})
            setIsLoading(false)
            console.log(response)
        }
        catch (err) {
            console.log(`Ошибка:${err}`)
        }
    }

    return (
        <>
            {(isLoading ? <PreloaderComponent/> :
                 <div>
                     <SearchBar
                         doCityFilter={doCityFilter}
                     />
                     <WeatherCard
                         weatherState={weatherState}
                         sunrise={sunrise}
                         sunset={sunset}
                     />
                 </div>
                )}
        </>
    )
}
