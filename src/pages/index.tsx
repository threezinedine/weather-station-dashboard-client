import React from "react"
import { 
    createBrowserRouter,
} from "react-router-dom"

import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import HomePage from "./HomePage"
import AdminPage from "./AdminPage"
import StationPage from "./StationPage"
import { 
    Wrapper,
    AuthWrapper,
    HeaderWrapper,
    SidebarWrapper,
} from "./layouts"
import {
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    HOME_ROUTE,
    ADMIN_ROUTE,
    STATION_PAGE_ROUTE,
} from "const"


const router = createBrowserRouter([
    {
        path: HOME_ROUTE,
        element: (
            <Wrapper>
                <AuthWrapper>
                    <HeaderWrapper>
                        <SidebarWrapper>
                            <HomePage /> 
                        </SidebarWrapper>
                    </HeaderWrapper>
                </AuthWrapper>
            </Wrapper>
        ),
    },
    {
        path: STATION_PAGE_ROUTE,
        element: (
            <Wrapper>
                <AuthWrapper>
                    <HeaderWrapper>
                        <SidebarWrapper>
                            <StationPage />
                        </SidebarWrapper>
                    </HeaderWrapper>
                </AuthWrapper>
            </Wrapper>
        )
    },
    {
        path: ADMIN_ROUTE,
        element: (
            <Wrapper>
                <AuthWrapper>
                    <HeaderWrapper>
                        <SidebarWrapper>
                            <AdminPage />
                        </SidebarWrapper>
                    </HeaderWrapper>
                </AuthWrapper>
            </Wrapper>
        )
    },
    {
        path: LOGIN_ROUTE,
        element: (
            <Wrapper>
                <LoginPage /> 
            </Wrapper>
        ),
    },
    {
        path: REGISTER_ROUTE,
        element: (
            <Wrapper>
                <RegisterPage />
            </Wrapper>
        ),
    }
])


export default router
