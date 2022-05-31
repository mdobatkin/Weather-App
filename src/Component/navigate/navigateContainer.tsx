import React from 'react';
import {Icon, Navbar} from 'react-materialize';
import {NavLink} from 'react-router-dom';

export const NavigateComponent = (): JSX.Element => {

    return (
        <Navbar
            alignLinks="right"
            brand={<a className="brand-logo" href="#">WeatherApp</a>}
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                outDuration: 200,
                preventScrolling: true
            }}
        >
         <NavLink to={'auth'}>Sign out</NavLink>
        </Navbar>
    )
}