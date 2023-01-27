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
import {
    HOME_ROUTE,
    HTTP_200_OK,
    ERROR_MESSAGE_TIME_OUT,
    LOGIN_ERROR_MESSAGE,
    LOGIN_SUBMIT_LABEL,
} from "const"
import {
    getLoginFormFromFields,
    handleErrorResponse,
    saveToken, sendLoginFormData,
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
                submitLabel={LOGIN_SUBMIT_LABEL}
                onSubmit={(fields) => {
                    sendLoginFormData(getLoginFormFromFields(fields))
                        .then((response) => {
                            if (response.status === HTTP_200_OK) {
                                saveToken(response.data.token)
                            }
                            navigate(HOME_ROUTE)
                        })
                        .catch(err => {
                            handleErrorResponse(err, dispatch)
                        })

                }}
                onSubmitError={() => {
                    dispatch(addErrorAction(LOGIN_ERROR_MESSAGE))

                    setTimeout(() => {
                        dispatch(popErrorAction())
                    }, ERROR_MESSAGE_TIME_OUT)
                }}
            />
        </div>
    )
}


export default LoginPage
