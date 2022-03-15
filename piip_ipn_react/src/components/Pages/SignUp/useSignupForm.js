import {useState,useEffect} from 'react'

const useSignupForm = (submitForm, validate, validUserData, setUserData) => {
    const [values,setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        school_id: 1,
        password: '',
        password2: ''
    })
    const [errors,setErrors] = useState({})
    const [isSubmitting,setIsSubmitting] = useState(false)

    const handleChange = e => {
        const { name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const SubmitToServer = async () => {
        let formData = new FormData();
        formData.append('firstname', values.firstname);
        formData.append('lastname', values.lastname);
        formData.append('email', values.email);
        formData.append('school_id', values.school_id);
        formData.append('password', values.password);
        
        const response = await fetch('/sign-up', {
            method: "POST",
            body: formData
        })
        const data = await response.json()
        console.log("Token assigned: ",data.access_token)
        console.log("Role assigned: ",data.role)
        setUserData(data.access_token, data.role)
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    }

    useEffect(
        () => {
            if(Object.keys(errors).length === 0 && isSubmitting){
                SubmitToServer();
                if(validUserData()){
                    submitForm()
                }
            }
        }
    )
    return {handleChange, values, handleSubmit, errors};
}

export default useSignupForm;