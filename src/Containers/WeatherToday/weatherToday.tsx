import React, {useEffect, useState} from "react";
import {WeatherCard} from "./components/WeatherCard/WeatherCard";
import {SearchBar} from "./components/searchBar/searchBar";
import {PreloaderComponent} from "../../Component/preloader/preloader";
import {getWeatherToday} from "../../api/weatherAPI";
import {autoLocationWeatherDisplay} from "../../api/weatherAPI";

interface weatherStateInterface {
    cityTitle: string,
    humidity: string,
    feelsLike: number,
    temperature: number,
    pressure: number,
    timeSunrise: string,
    timeSunset: string,
}

export const WeatherToday = (): JSX.Element => {
    const [cityTitleValue, setCityTitleValue] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [weather, setWeather] = useState<weatherStateInterface | undefined>()
    let filterTimeout: NodeJS.Timeout | undefined;

    useEffect(() => {
        locatePosition()
    }, [])

    const CityFilter = (filterCity: string) => {
        clearTimeout(filterTimeout)

        if (!filterCity) {
            setCityTitleValue("")
        }

        filterTimeout = setTimeout( () => {
            void getWeatherToday(filterCity).then(data => {
                setWeather(data)
                setCityTitleValue("")
            })
        }, 1500)
    }

    function locatePosition() {
        const geolocation: Geolocation = navigator.geolocation
        geolocation.getCurrentPosition(positionHandler,null,{
            enableHighAccuracy: true
        })
        setCityTitleValue("")
    }

    async function positionHandler(position: GeolocationPosition) {
        const {latitude, longitude}: GeolocationCoordinates = position.coords
        const response = await autoLocationWeatherDisplay(longitude, latitude)
        setWeather(response)
        console.log(response);
    }

    return (
        <>
            {(isLoading ? <PreloaderComponent/> :
                 <div>
                     <SearchBar
                         cityFilter={CityFilter}
                     />
                     {weather ?
                         <WeatherCard
                         weather={weather}
                     />
                     : <div></div>}
                 </div>
                )}
        </>
    )
}
