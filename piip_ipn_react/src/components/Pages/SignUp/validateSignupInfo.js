export default function validateSignupInfo (values) {
  const errors = {}

  if (!values.firstname) {
    errors.firstname = 'First name required'
  }

  if (!values.lastname) {
    errors.lastname = 'Last name required'
  }

  if (!values.email) {
    errors.email = 'Email required'
  } else {
    const endingRegex = /ipn.mx$/
    const isSchoolEmail = values.email.match(endingRegex)
    if (!isSchoolEmail) {
      errors.email = 'Email must be institutional'
    }
    const startingRegex = /^[A-Za-z0-9.]*@/
    const validUsername = values.email.match(startingRegex)
    if (!validUsername) {
      if (!isSchoolEmail) {
        errors.email += '. Email username must only contain values A-Z, 0-9 and .'
      } else {
        errors.email = 'Email username must only contain values A-Z, 0-9 and .'
      }
    }
  }

  /* else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Email address is invalid"
    } */

  if (!values.password) {
    errors.password = 'Password is required'
  }/* else if(values.password.length < 6){
        errors.password = "Password needs to be 6 characters or more"
    } */

  if (!values.password2) {
    errors.password2 = 'Password is required'
  } else if (values.password !== values.password2) {
    errors.password2 = 'Passwords do not match'
  }

  return errors
}
