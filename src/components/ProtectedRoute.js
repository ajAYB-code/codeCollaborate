import { auth } from "../config/firebase";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const user = auth.currentUser;
    
    if(!user)
        return <Navigate to="/login"/>
    
    return children;
}

export default ProtectedRoute;