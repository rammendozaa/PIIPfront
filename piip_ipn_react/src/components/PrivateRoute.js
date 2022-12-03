import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function PrivateRoute ({ children, userData, validUserData, validRoles }) {
  const location = useLocation()
  if (!validUserData()) {
    return <Navigate to="/log-in" state={{ from: location }}/>
  }
  if (validRoles.includes(userData.role) === false) {
    return <Navigate to="/" state={{ from: location }}/>
  }
  return children
}
export default PrivateRoute
