import React from "react"
import { 
    createBrowserRouter,
} from "react-router-dom"

import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import HomePage from "./HomePage"
import { 
    Wrapper,
    AuthWrapper,
} from "./layouts"


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Wrapper>
                <AuthWrapper>
                    <HomePage /> 
                </AuthWrapper>
            </Wrapper>
        ),
    },
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
