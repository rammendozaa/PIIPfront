import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {useState} from 'react'

import './Accordion.css'

function Accordion({data}) {
    const [clicked, setClicked] = useState(false);
    const toggle = index => {
        if (clicked === index) {
        //if clicked question is already active, then close it
        return setClicked(null);
        }   
        setClicked(index);
    };
    const addNewActivity = (index) => {
        data.Sections[index].Activities = [...data.Sections[index].Activities,
            {"ActivityName": "New Activity", "Description": "Perro"}
        ]
    }
    const AddNewSection = () => {
        data.Sections = [...data.Sections,
            {
                "SectionName": "New Section",
                "Activities": []
            },
        ]
    }
    return (
        <IconContext.Provider value={{ color: '#00FFB9', size: '25px' }}>
        <div className='AccordionSection'>
            <div className='Container'>
                {data.Sections.map((section, indexSection) => {
                    return (
                    <>
                        <div className='Wrap' onClick={() => toggle(indexSection)} key={indexSection}>
                            <h1>{section.SectionName}</h1>
                            <span>{clicked === indexSection ? <FiMinus /> : <FiPlus />}</span>
                        </div>
                        {
                            clicked === indexSection 
                                ? 
                                (
                                    section.Activities.map((activity,indexActivity) => {
                                        return (
                                            <>
                                                <div className='Dropdown' key={indexActivity}>
                                                    <p>{activity.ActivityName}</p>
                                                </div>                                                                
                                            </>
                                        )
                                    })
                                ) 
                                : null
                        }
                        {
                            clicked === indexSection
                            ?
                            (
                                <div className='AddNewActivity' onClick={() => addNewActivity(indexSection)}>
                                    <input type='text'></input>
                                    <span>{<FiPlus />}</span>
                                </div>
                            )
                            :null
                        }
                    </>
                    );
                })}
                <div className='AddNewSection' onClick={() => AddNewSection()}>
                    <input type='text'></input>
                    <span>{<FiPlus />}</span>
                </div>
            </div>
        </div>
    </IconContext.Provider>
    )
}

export default Accordion