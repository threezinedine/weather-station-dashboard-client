import React, {
    useEffect,
} from "react"
import { 
    useNavigate,
} from "react-router-dom"


const HomePage: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/login")
    }, [])

    return (
        <div>
            Home Page
        </div>
    )
}


export default HomePage
