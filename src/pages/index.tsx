import React from "react"
import { 
    createBrowserRouter,
} from "react-router-dom"

import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import { 
    Wrapper,
} from "./layouts"


const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <Wrapper>
                <LoginPage /> 
            </Wrapper>
        ),
    },
    {
        path: "/register",
        element: (
            <Wrapper>
                <RegisterPage />
            </Wrapper>
        ),
    }
])


export default router
