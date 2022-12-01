import { useEffect, useRef, useState } from 'react';

function CompanyPopup(props) {
    const [progress, setProgress] = useState("Started");
    const [isChecked, setIsChecked] = useState(false);
    return (props.trigger) ? (
        <div className='company'>
          <div className='company-inner'>
            <div className="options-container">
            <button className='close-btn' onClick={() => props.setButtonPopup(false)}>close</button>
            <div className='options'>
            <p>Register your progress:</p>
    </div>
            <div className='create-activity'>
            <textarea id="input" rows="3"></textarea>
            </div>
            </div>
          </div>
        </div>
        ) : "";


}

export default CompanyPopup