import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import NotFound from './pages/NotFound';

function PrivateRoute({children, validToken}) {
    let location = useLocation();
    if(!validToken()){
        return <Navigate to="/log-in" state={{ from: location }}/>
    }
    return children
}
export default PrivateRoute;