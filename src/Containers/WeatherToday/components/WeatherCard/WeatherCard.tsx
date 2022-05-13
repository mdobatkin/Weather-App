import React from "react";
import {Card, Col, Icon, Row} from "react-materialize";
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize';
import './css/style.css';

type WeatherCardType = {
    sunrise: string,
    sunset: string,
    weatherState: object
}

export const WeatherCard = ({sunset, sunrise, weatherState}: WeatherCardType): JSX.Element => {
    const {humidity, feelsLike, cityTitle, temperature, pressure}: any = weatherState
    return (
        <div className='card-container'>
            <div className='accordion'>
                <Row>
                    <Col
                        m={12}
                        s={12}
                    >
                        <Card
                            className="blue-grey darken-1"
                            closeIcon={<Icon>close</Icon>}
                            revealIcon={<Icon>more_vert</Icon>}
                            textClassName="white-text"
                            title={cityTitle}
                        >
                            <div className='card-temperature'>
                                <span>Влажность: {humidity}%</span>
                                <span>Температура: {temperature}°C</span>
                                <span>Ощущается как: {feelsLike}°C</span>
                                <span>Давление: {pressure} мм рт ст</span>
                            </div>
                            <div className='card-sun-state'>
                                <span>Восход солнца: {sunrise}</span>
                                <span>Закат: {sunset}</span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}