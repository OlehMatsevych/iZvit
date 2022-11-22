import { Navigate } from "react-router-dom"

export const ProtectedLogin = ({auth, pathname, children}) => {
    if (auth && pathname === '/reportingsystem') {
        return <Navigate to='/reportingsystem' replace/>
    } else if (auth) {
        return <Navigate to='/home' replace/>
    }

    return children
}