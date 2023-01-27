import React from "react"
import {
    useDispatch,
} from "react-redux"
import { 
    useNavigate,
} from "react-router-dom"

import { 
    Form,
} from "components"
import { 
    addErrorAction,
    popErrorAction,
} from "stores/Error/actions"
import api from "stores/api"
import {
    POST_METHOD,
    LOGIN_API_ROUTE,
    HOME_ROUTE,
    HTTP_200_OK,
    ERROR_MESSAGE_TIME_OUT,
} from "const"
import {
    saveToken,
} from "utils"


const LoginPage: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>
            <Form 
                fields={[
                    {
                        name: "username",
                        label: "Username",
                        errors: [
                            {
                                validator: (value: string) => value.length <= 5,
                                message: "Username must have more than 5 characters.",
                            },
                            {
                                validator: (value: string) => value.length >= 20,
                                message: "Username must have less than 20 characters.",
                            },
                            {
                                validator: (value: string) => !/^[a-zA-Z0-9]*$/.test(value),
                                message: "Username cannot contain the specical characters.",
                            },
                        ],
                    },
                    {
                        name: "password",
                        label: "Password",
                        password: true,
                        errors: [
                            {
                                validator: (value: string) => value.length <= 5,
                                message: "Password must have more than 5 characters.",
                            },
                            {
                                validator: (value: string) => value.length >= 20,
                                message: "Password must have less than 20 characters.",
                            },
                            {
                                validator: (value: string) => !/^[a-zA-Z0-9]*$/.test(value),
                                message: "Password cannot contain the specical characters.",
                            },
                        ],
                    }
                ]}
                submitLabel="Login"
                onSubmit={(fields) => {
                    const data = new FormData()

                    const username = fields.filter(field => field.name === "username")[0].value
                    data.append("username", username)

                    const password = fields.filter(field => field.name === "password")[0].value
                    data.append("password", password)

                    api({
                        method: POST_METHOD,
                        url: LOGIN_API_ROUTE,
                        data: data,
                        headers: { "Content-Type": "multipart/form-data" }
                    })           
                        .then((response) => {
                            if (response.status === HTTP_200_OK) {
                                saveToken(response.data.token)
                            }
                            navigate(HOME_ROUTE)
                        })
                        .catch(() => {
                            dispatch(addErrorAction("Login error"))

                            setTimeout(() => {
                                dispatch(popErrorAction())
                            }, ERROR_MESSAGE_TIME_OUT)
                        })

                }}
                onSubmitError={() => {
                    dispatch(addErrorAction("Login error"))

                    setTimeout(() => {
                        dispatch(popErrorAction())
                    }, ERROR_MESSAGE_TIME_OUT)
                }}
            />
        </div>
    )
}


export default LoginPage
