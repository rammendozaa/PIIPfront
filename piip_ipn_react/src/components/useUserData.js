import { useState } from 'react';

function useUserData() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken
  }

  function getRole() {
    const userRole = localStorage.getItem('role');
    return userRole
  }

  const [userData, setData] = useState({
    "token": getToken(),
    "role": getRole()
  })

  function saveUserData(token, role) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setData({
      "token": token,
      "role": role
    })
  }

  function removeUserData() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setData({
      "token": "",
      "role": ""
    })
  }

  function validUserData(){
    console.log("Valid Tokennn:", userData.token)
    console.log("Valid Roleeee: ", userData.role)
    if(!userData.token || userData.token === undefined  || userData.token === ""
      || !userData.role || userData.role === undefined || userData.role === "") {
      return false;
    }
    return true;
  }

  return {
    userData,
    setUserData: saveUserData,
    removeUserData,
    validUserData,
  }

}

export default useUserData;