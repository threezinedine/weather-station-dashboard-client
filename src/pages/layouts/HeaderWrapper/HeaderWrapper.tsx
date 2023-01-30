import React, {
    useState,
} from "react"
import { 
    useNavigate,
} from "react-router-dom"

import HeaderWrapperProps from "./HeaderWrapperProps"
import { 
    BRAND_DATA_TEST_ID,
    HOME_ROUTE,
    LOGIN_ROUTE,
    USER_BUTTON_LABEL,
    ADMIN_ROUTE,
    AVATAR_TEST_ID,
    LOGOUT_BUTTON_LABEL,
} from "const"
import { 
    clearToken,
} from "utils"
import styles from "./HeaderWrapper.module.scss"
import { 
    combineClassName,
} from "utils"
import {
    Button,
} from "components"
import LogoImage from "assets/images/hust.jpeg"
import FacebookUserImage from "assets/images/facebook-user.jpg"


const HeaderWrapper: React.FC<HeaderWrapperProps> = ({
    children,
}) => {
    const navigate = useNavigate()
    const [optionDisplay, setOptionDislay] = useState(false)
    const st = combineClassName(styles)

    return (
        <div
            className={st("wrapper")}
        >
            <div
                className={st("header")}
            >
                <Button
                    fit
                    noColor
                    data-testid={BRAND_DATA_TEST_ID}
                    onClick={() => {
                        navigate(HOME_ROUTE)
                    }}
                >
                    <div
                        className={st("logo")}
                    >
                        <img 
                            src={LogoImage}
                        />
                        <div
                            className={st("brand-name")}
                        >
                            ĐẠI HỌC BÁCH KHOA HÀ NỘI
                        </div>
                    </div>
                </Button>
                <Button
                    fit
                    noColor
                    data-testid={AVATAR_TEST_ID}
                    toggleItem={(
                        <div>
                            <Button
                                noColor
                                haveHover
                                onClick={() => {
                                    navigate(ADMIN_ROUTE)
                                }}
                            >
                                <div className={st("menu-btn__label")}>
                                    { USER_BUTTON_LABEL }
                                </div>
                            </Button>
                            <Button
                                noColor
                                haveHover
                                onClick={() => {
                                    clearToken()
                                    navigate(LOGIN_ROUTE)
                                }}
                            >
                                <div className={st("menu-btn__label")}>
                                    { LOGOUT_BUTTON_LABEL }
                                </div>
                            </Button>
                        </div>
                    )}
                >
                    <div
                        className={st("avatar")}
                    >
                        <img 
                            src={FacebookUserImage}
                        />
                    </div>
                </Button>
            </div>
            <div className={st("content")}>
                { children }
            </div>
        </div>
    )
} 


export default HeaderWrapper
