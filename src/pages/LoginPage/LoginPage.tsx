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
} from "const"
import store from "stores"
import {saveToken} from "utils"


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
                    const username = fields.filter(field => field.name === "username")[0].value
                    const password = fields.filter(field => field.name === "password")[0].value

                    api({
                        method: POST_METHOD,
                        url: LOGIN_API_ROUTE,
                        data: {
                            username: username,
                            password: password
                        }
                    })           
                        .then((response) => {
                            if (response.status === 200) {
                                saveToken(response.data.token)
                            }
                            navigate(HOME_ROUTE)
                        })
                        .catch(err => {
                            console.log(err)
                        })

                }}
                onSubmitError={() => {
                    dispatch(addErrorAction("Login error"))

                    setTimeout(() => {
                        dispatch(popErrorAction())
                    }, 2000)
                }}
            />
        </div>
    )
}


export default LoginPage
