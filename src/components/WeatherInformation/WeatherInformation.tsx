import React from "react"

import WeatherInformationProps from "./WeatherInformationProps"


const WeatherInformation: React.FC<WeatherInformationProps> = ({
    label,
    value,
}) => {
    return (
        <div>
            <div>{ label }</div>
            <div>{ value }</div>
        </div>
    )
}


export default WeatherInformation