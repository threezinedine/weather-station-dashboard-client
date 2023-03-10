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
    LOGIN_SUCCESSFULLY_MESSAGE,
} from "const"
import {
    displayTheNotification,
    getLoginFormFromFields,
    handleErrorResponse,
    saveToken, sendLoginFormData,
} from "utils"
import { 
    combineClassName,
} from "utils"
import styles from "./LoginPage.module.scss"


const LoginPage: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const st = combineClassName(styles)

    return (
        <div
            className={st("wrapper")}
        >
            <Form 
                wrapperStyle={st("form-style")}
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
                            displayTheNotification(LOGIN_SUCCESSFULLY_MESSAGE, dispatch)
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
