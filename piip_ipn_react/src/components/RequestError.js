import useUserData from '../components/useUserData'

const refreshPage = async() => {
    window.location.reload();
}

const redirect = () => {
    const { removeUserData } = useUserData()

    fetch('/logout', {
        method: 'POST'
      })
    .then(res => res.json())
    .then(data => {
      removeUserData()
    })
    const timer = setTimeout(() => navigate('/'), 3000)
    return () => clearTimeout(timer)
}

function RequestError({errorCode}) {
        if (errorCode === 401) {
            return (
                <div className='mycourse-content-container'>
                    <h1>There was an authentication error while processing your request</h1>
                    <img className='mycourse-sorryimg' src='/images/sorry-removebg-preview.png'></img>
                    {redirect()}
                </div>
            )
        } else {
            return (
                <div className='mycourse-content-container'>
                    <h1>There was an error processing your request</h1>
                    <img className='mycourse-sorryimg' src='/images/sorry-removebg-preview.png'></img>
                    <p className="subtitle" style={{cursor:"pointer"}} onClick={ refreshPage }>Click here to reload page</p>
                    <br/>
                    <p className="subtitle" style={{cursor:"pointer"}} onClick={ refreshPage }>Contact us at piip.ipn.noreply.secure@gmail.com if problem persists.</p>
                </div>
            )
        }
}

export default RequestError;