import React from "react"
import { 
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome"

import WeatherInformationProps from "./WeatherInformationProps"
import styles from "./WeatherInformation.module.scss"
import { 
    combineClassName,
} from "utils"
import { EMPTY_STRING } from "const"


const st = combineClassName(styles)


const WeatherInformation: React.FC<WeatherInformationProps> = ({
    label,
    value,
    unit = EMPTY_STRING,
    icon = null,
}) => {
    return (
        <div className={st("wrapper")}>
            <div className={st("header")}>
                <div>{ label }</div>
                <div className={st("icon")}>
                    { icon && <FontAwesomeIcon icon={icon} /> }
                </div>
            </div>
            <div className={st("value")}>
                { value } 
                <span>{ unit }</span>
            </div>
        </div>
    )
}


export default WeatherInformation