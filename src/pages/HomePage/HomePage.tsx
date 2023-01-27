import React from "react"
import { 
    useNavigate,
} from "react-router-dom"

import { 
    LOGIN_ROUTE,
    LOGOUT_BUTTON_TEST_ID,
} from "const"
import { 
    clearToken,
} from "utils"


const HomePage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div>
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
            Home Page
        </div>
    )
}


export default HomePage
