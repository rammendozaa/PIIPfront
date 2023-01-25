const refreshPage = async() => {
    window.location.reload();
}

function RequestError({errorCode}) {
        if (errorCode === 401) {
            return (
                <div className='mycourse-content-container'>
                    <h1>There was an authentication error while processing your request</h1>
                    <img className='mycourse-sorryimg' src='/images/sorry-removebg-preview.png'></img>
                    <p className="subtitle" style={{cursor:"pointer"}} onClick={ refreshPage }>Click here to reload page</p>
                </div>
            )
        } else if (errorCode === 500) {
            return (
                <div className='mycourse-content-container'>
                    <h1>There was an error processing your request</h1>
                    <img className='mycourse-sorryimg' src='/images/sorry-removebg-preview.png'></img>
                    <p className="subtitle" style={{cursor:"pointer"}} onClick={ refreshPage }>Click here to reload page</p>
                </div>
            )
        } else {
            return (
                <div className='mycourse-content-container'>
                    <h1>There was an error processing your request</h1>
                    <img className='mycourse-sorryimg' src='/images/sorry-removebg-preview.png'></img>
                    <p className="subtitle" style={{cursor:"pointer"}} onClick={ refreshPage }>Click here to reload page</p>
                </div>
            )
        }
}

export default RequestError;