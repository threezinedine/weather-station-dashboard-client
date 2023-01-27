import React, {
    useEffect,
} from "react"
import axios from "axios"
import { 
    useNavigate,
} from "react-router-dom"


const HomePage: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token: string | null = localStorage.getItem("token_item")

        if (token) {
            axios({
                method: "GET",
                url: "http://localhost:8000/users/validate",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .catch(err => {
                    console.log(err)
                    navigate("/login")
                })
        } else {
            navigate("/login")
        }
    }, [])

    return (
        <div>
            Home Page
        </div>
    )
}


export default HomePage
