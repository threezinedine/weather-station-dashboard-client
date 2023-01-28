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


const HeaderWrapper: React.FC<HeaderWrapperProps> = ({
    children,
}) => {
    const navigate = useNavigate()
    const [optionDisplay, setOptionDislay] = useState(false)

    return (
        <div>
            <div>
                <button
                    data-testid={BRAND_DATA_TEST_ID}
                    onClick={() => {
                        navigate(HOME_ROUTE)
                    }}
                >
                    Brand
                </button>
                <button
                    data-testid={AVATAR_TEST_ID}
                    onClick={() => {
                        setOptionDislay(!optionDisplay)
                    }}
                >
                    Avatar 
                </button>
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
