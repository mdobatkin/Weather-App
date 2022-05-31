import React, {useEffect, useState} from 'react';
import {WeatherCard} from './components/WeatherCard/WeatherCard';
import {SearchBar} from './components/searchBar/searchBar';
import {PreloaderComponent} from '../../Component/preloader/preloader';
import {getWeatherByCity} from '../../api/weatherAPI';
import {getWeatherByCoords} from '../../api/weatherAPI';
import {NavigateComponent} from '../../Component/navigate/navigateComponent';

interface WeatherStateInterface {
    cityTitle: string,
    humidity: string,
    feelsLike: number,
    temperature: number,
    pressure: number,
    timeSunrise: string,
    timeSunset: string,
}

export const WeatherToday = (): JSX.Element => {
    const [cityFilter, setCityFilter] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [weather, setWeather] = useState<WeatherStateInterface | undefined>()
    let filterTimeout: NodeJS.Timeout | undefined;

    useEffect(() => {
        locatePosition()
    }, [])

    const filterCity = (filterCity: string) => {
        clearTimeout(filterTimeout)

        if (!filterCity) {
            setCityFilter('')
        }

        filterTimeout = setTimeout( () => {
            void getWeatherByCity(filterCity).then(data => {
                setWeather(data)
                setCityFilter('')
            })
        }, 1500)
    }

    function locatePosition() {
        const geolocation: Geolocation = navigator.geolocation
        geolocation.getCurrentPosition(positionHandler as (position: GeolocationPosition) => void,null,{
            enableHighAccuracy: true
        })
        setCityFilter('')
    }

    async function positionHandler(position: GeolocationPosition) {
        const {latitude, longitude}: GeolocationCoordinates = position.coords
        const response = await getWeatherByCoords(longitude, latitude)
        setWeather(response)
    }

    if (isLoading) {
        return <PreloaderComponent />
    }

    return (
        <div>
            <SearchBar filterCity={filterCity} />
            {!!weather && <WeatherCard weather={weather} />}
        </div>
    )
}
