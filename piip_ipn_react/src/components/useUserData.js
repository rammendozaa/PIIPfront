import { useState } from 'react'

function useUserData () {
  function getToken () {
    const userToken = localStorage.getItem('token')
    return userToken
  }

  function getRole () {
    const userRole = localStorage.getItem('role')
    return userRole
  }

  function getSignedInUser () {
    const signedInUser = localStorage.getItem('user_id')
    return signedInUser
  }
  const [userData, setData] = useState({
    token: getToken(),
    role: getRole(),
    user_id: getSignedInUser()
  })

  function saveUserData (token, role, user_id) {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('user_id', user_id)
    setData({
      token,
      role,
      user_id
    })
  }

  function removeUserData () {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user_id')
    setData({
      token: '',
      role: '',
      user_id: ''
    })
  }

  function validUserData () {
    if (!userData.token || userData.token === undefined || userData.token === '' ||
      !userData.role || userData.role === undefined || userData.role === '') {
      return false
    }
    return true
  }

  return {
    userData,
    setUserData: saveUserData,
    removeUserData,
    validUserData
  }
}

export default useUserData
