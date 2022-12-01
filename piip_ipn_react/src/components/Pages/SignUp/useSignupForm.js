import {useState,useEffect} from 'react'

const useSignupForm = (validate, setUserData, validUserData) => {
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
        return data
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    }

    useEffect(
        () => {
            if(Object.keys(errors).length === 0 && isSubmitting === true){
                SubmitToServer()
                .then(data => {
                    if(data.error === undefined){
                        setUserData(data.access_token, data.role, data.user_id)
                    }else{
                        alert("User already exists")
                        setIsSubmitting(false)
                    }
                });
            }
        }
    )
    return {handleChange, values, handleSubmit, errors};
}

export default useSignupForm;