import React from "react";
import {TextInput} from "react-materialize";
import "./css/style.css";

type SearchBarType = {
    cityFilter: (e: string) => void
}

export const SearchBar = ({cityFilter}:SearchBarType): JSX.Element => {
    return (
        <div className='search-bar-container'>
            <TextInput
                inputClassName='search-bar-input'
                id="TextInput-38"
                label="Введите название города"
                onChange={(e) => cityFilter(e.target.value)}
            />
        </div>
    )
}