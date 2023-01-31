import { useState, useEffect } from 'react'

const useLoginForm = (validate, validUserData, setUserData) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const SubmitToServer = async () => {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('password', values.password)
    const response = await fetch('/token', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    return data
  }

  const handleSubmit = e => {
    e.preventDefault()
    setErrors(validate(values))
    setIsSubmitting(true)
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting === true) {
        SubmitToServer()
          .then(data => {
            if (data.error === undefined) {
              setUserData(data.access_token, data.role, data.user_id)
            } else {
              alert('Wrong email or password')
              setIsSubmitting(false)
            }
          })
      }
    }
  )
  return { handleChange, values, handleSubmit, errors }
}

export default useLoginForm
