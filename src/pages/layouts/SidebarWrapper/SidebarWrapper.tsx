import React, {
    useEffect,
    useState,
} from "react"
import {
    useDispatch,
} from "react-redux"
import { 
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome"
import { 
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import {
    useNavigate,
} from "react-router-dom"

import SidebarWrapperProps from "./SidebarWrapperProps"
import {
    EMPTY_STRING,
    FREE_API_STATION_STATION_NAME,
    LOGIN_ROUTE,
    RecordType,
} from "const"
import {
    clearToken,
    fetchTheLatestRecord, 
    handleErrorResponse, 
    loadToken,
} from "utils"
import styles from "./SidebarWrapper.module.scss"
import { 
    combineClassName,
} from "utils"
import { 
    Button,
} from "components"


interface SidebarTopicDisplayProps {
    topic: string 
    value: string | number
    unit?: string
}


const SidebarTopicDisplay: React.FC<SidebarTopicDisplayProps> = ({
    topic,
    value,
    unit = EMPTY_STRING,
}) => {
    const st = combineClassName(styles)

    return (
        <div
            className={st("topic-container")}
        >
            <div
                className={st("topic-label")}
            >
                { topic }
            </div>
            <div
                className={st("topic-value")}
            >
                { value } { unit }
            </div>
        </div>
    )
}


const SidebarWrapper: React.FC<SidebarWrapperProps> = ({
    children,
}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [displayRecord, setDisplayRecord] = useState((): RecordType | null => null)
    const st = combineClassName(styles)

    useEffect(() => {
        const token = loadToken()

        fetchTheLatestRecord(token, FREE_API_STATION_STATION_NAME)
            .then(response => {
                setDisplayRecord(response.data)
            })
            .catch(err => {
                handleErrorResponse(err, dispatch)
            })

        const id = setInterval(() => {
            fetchTheLatestRecord(token, FREE_API_STATION_STATION_NAME)
                .then(response => {
                    setDisplayRecord(response.data)
                })
                .catch(err => {
                    handleErrorResponse(err, dispatch)
                })
        }, 300000)

        return () => {
            clearInterval(id)
        }
    }, [])

    return (
        <div
            className={st("wrapper")}
        >
            <div
                className={st("side-bar")}
            >
                <div
                    className={st("data")}
                >
                    <div
                        className={st("feel-like")}
                    >
                        Feels like 
                    </div>
                    {
                        displayRecord && (
                            <div
                                className={st("record")}
                            >
                                <div
                                    className={st("temperature")}
                                >
                                    { displayRecord.temperature }&deg;
                                </div>
                                <SidebarTopicDisplay 
                                    topic="Wind Direction"
                                    value={displayRecord.windDirection}
                                />
                                <SidebarTopicDisplay 
                                    topic="Average Win Speed"
                                    value={displayRecord.averageWindSpeedInOneMinute}
                                    unit="km/h"
                                />
                                <SidebarTopicDisplay 
                                    topic="Rain Fall"
                                    value={displayRecord.rainFallInOneHour}
                                    unit="mm"
                                />
                                <SidebarTopicDisplay 
                                    topic="Humidity"
                                    value={displayRecord.humidity}
                                    unit="%"
                                />
                                <SidebarTopicDisplay 
                                    topic="Pressure"
                                    value={displayRecord.barPressure}
                                    unit="pMa"
                                />
                            </div>
                        )
                    }
                </div>
                <Button
                    noColor
                    haveHover
                    onClick={() => {
                        clearToken()
                        navigate(LOGIN_ROUTE)
                    }}
                    wrapperStyle={st("logout-btn")}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <div>Log out</div>
                </Button>
            </div>
            <div
                className={st("content")}
            >
                { children }
            </div>
        </div>
    )
}


export default SidebarWrapper
