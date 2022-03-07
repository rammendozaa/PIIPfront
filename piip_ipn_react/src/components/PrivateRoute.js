import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({children, validToken, validRoles, role}) {
    let location = useLocation();
    if(!validToken()){
        return <Navigate to="/log-in" state={{ from: location }}/>
    }
    if(validRoles.includes(role) === false){
        return <Navigate to="/" state={{ from: location }}/>
    }
    return children
}
export default PrivateRoute;