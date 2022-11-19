import { Navigate } from "react-router-dom"

export const ProtectedLogin = ({auth, children}) => {
    if (auth) {
        return <Navigate to="/home" replace/>
    }

    return children
}