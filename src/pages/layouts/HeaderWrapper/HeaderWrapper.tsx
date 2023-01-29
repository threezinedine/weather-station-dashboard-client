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
    LOGOUT_BUTTON_TEST_ID,
    USER_DATA_TEST_ID,
    ADMIN_ROUTE,
    AVATAR_TEST_ID,
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
                    onClick={() => {
                        setOptionDislay(!optionDisplay)
                    }}
                >
                    <div
                        className={st("avatar")}
                    >
                        <img 
                            src={FacebookUserImage}
                        />
                    </div>
                </Button>
                {
                    optionDisplay && (
                        <>
                            <button
                                data-testid={USER_DATA_TEST_ID}
                                onClick={() => {
                                    setOptionDislay(!optionDisplay)
                                    navigate(ADMIN_ROUTE)
                                }}
                            >
                                User 
                            </button>
                            <button
                                data-testid={LOGOUT_BUTTON_TEST_ID}
                                onClick={() => {
                                    clearToken()
                                    navigate(LOGIN_ROUTE)
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )
                }
            </div>
            { children }
        </div>
    )
} 


export default HeaderWrapper
