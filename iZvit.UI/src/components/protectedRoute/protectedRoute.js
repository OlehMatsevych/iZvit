import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({auth, children}) => {
    if (!auth) {
        return <Navigate to="/" replace/>
    }

    return children
}