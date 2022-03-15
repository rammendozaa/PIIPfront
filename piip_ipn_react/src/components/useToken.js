import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken
  }

  function getRole() {
    const userRole = localStorage.getItem('role');
    return userRole
  }

  const [token, setToken] = useState(getToken());
  const [role, setRole] = useState(getRole());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function saveRole(userRole){
    localStorage.setItem('role', userRole)
    setRole(userRole)
  }

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
    removeRole();
  }

  function removeRole() {
    localStorage.removeItem("role");
    setRole(null);
  }

  function validToken(){
    console.log("Valid Token:2", token)
    console.log("Role2: ", role)
    if(!token || token === undefined || !role || role === undefined) {
      return false;
    }
    return true;
  }

  return {
    token,
    setToken: saveToken,
    removeToken,
    validToken,
    role,
    setRole: saveRole,
  }

}

export default useToken;