function Settings({user}) {
    return (
        <form className='profile-form' noValidate>
            <div className='profile-form-inputs'>
                <label htmlFor='firstname' className='profile-form-label'>                        
                    First Name
                </label>
                <input id='firtname' type='text' name='firstname' className='profile-form-input' value={user.first_name} disabled/>
            </div>
            <div className='profile-form-inputs'>
                <label htmlFor='lastname' className='profile-form-label'>                        
                    Last Name
                </label>
                <input id='lastname' type='text' name='lastname' className='profile-form-input' value={user.last_name} disabled/>
            </div>
            <div className='profile-form-inputs'>
                <label htmlFor='email' className='profile-form-label'>                        
                    Email
                </label>
                <input id='email' type='email' name='email' className='profile-form-input' value={user.email} disabled/>
            </div>
            <div className='profile-form-inputs'>
                <label htmlFor='password' className='profile-form-label'>                        
                    Previous Password
                </label>
                <input id='password' type='password' name='password' className='profile-form-input' placeholder='Enter your previous password'/>
            </div>
            <div className='profile-form-inputs'>
                <label htmlFor='newpassword' className='profile-form-label'>                        
                    New Password
                </label>
                <input id='newpassword' type='password' name='newpassword' className='profile-form-input' placeholder='Enter your new password'/>
            </div>
            <div className='profile-form-inputs'>
                <label htmlFor='newpassword2' className='profile-form-label'>                        
                    Confirm New Password
                </label>
                <input id='newpassword2' type='password' name='newpassword2' className='profile-form-input' placeholder='Confirm your new password'/>
            </div>
            <button className='profile-form-input-btn' type='submit'>Update</button>
        </form>
    )
}

export default Settings