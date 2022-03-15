import {useState,useEffect} from 'react'

const useLoginForm = (validate, validUserData, setUserData) => {
    const [values,setValues] = useState({
        username: '',
        email: '',
        password: '',
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
        formData.append('email', values.email);
        formData.append('password', values.password);
        const response = await fetch('/token', {
            method: "POST",
            body: formData
        })
        const data = await response.json()
        console.log("Token assigned: ",data.access_token)
        console.log("Role: ",data.role)
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
            }
        }
    )
    return {handleChange, values, handleSubmit, errors};
}

export default useLoginForm;