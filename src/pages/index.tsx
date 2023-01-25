import React from "react"
import { 
    createBrowserRouter,
} from "react-router-dom"

import LoginPage from "./LoginPage"


const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    }
])


export default router
