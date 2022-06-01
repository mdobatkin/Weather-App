import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {WeatherToday} from '../WeatherToday/weatherToday';
import {AuthContainer} from '../../Auth/AuthContainer';
import {SignUpContainer} from '../../Auth/signUpContainer';

export const Main = (): JSX.Element => {
    return (
        <Routes>
            <Route path='/' element={<WeatherToday />}></Route>
            <Route path='/auth/*' element={<AuthContainer />}></Route>
            <Route path='/signUp' element={<SignUpContainer />}></Route>
        </Routes>
    )
}
