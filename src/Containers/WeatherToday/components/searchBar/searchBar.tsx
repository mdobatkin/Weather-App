import React from 'react';
import {TextInput} from 'react-materialize';
import './css/style.css';
type SearchBarType = {
    doCityFilter: (e: string) => void
}
export const SearchBar = ({doCityFilter}:SearchBarType): JSX.Element => {
    return (
        <div className='search-bar-container'>
            <TextInput
                inputClassName='search-bar-input'
                id="TextInput-38"
                label="Введите название города"
                onChange={(e) => doCityFilter(e.target.value)}
            />
        </div>
    )
}