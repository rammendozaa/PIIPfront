import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken
  }

  const [token, setToken] = useState(getToken());
  const [role, setRole] = useState(getToken());

  function saveRole(userRole){
    localStorage.setItem('role', userRole)
    setRole(userRole)
  }

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  function validToken(){
    console.log("Valid Token", token)
    if(!token || token === undefined){
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
    setRole, saveRole
  }

}

export default useToken;