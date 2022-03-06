import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken
  }

  const [token, setToken] = useState(getToken());

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
    validToken
  }

}

export default useToken;