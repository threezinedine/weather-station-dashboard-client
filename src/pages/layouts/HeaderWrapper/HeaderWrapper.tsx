import React from "react"
import { 
    useNavigate,
} from "react-router-dom"

import HeaderWrapperProps from "./HeaderWrapperProps"
import { 
    LOGIN_ROUTE,
    LOGOUT_BUTTON_TEST_ID,
} from "const"
import { 
    clearToken,
} from "utils"


const HeaderWrapper: React.FC<HeaderWrapperProps> = ({
    children,
}) => {
    const navigate = useNavigate()

    return (
        <div>
            { children }
            <div>
                <button
                    data-testid={LOGOUT_BUTTON_TEST_ID}
                    onClick={() => {
                        clearToken()
                        navigate(LOGIN_ROUTE)
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    )
} 


export default HeaderWrapper
