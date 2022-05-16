import { useDispatch } from "react-redux"
import {useState} from 'react'
import { FiPlus } from 'react-icons/fi';
import React, {useEffect} from 'react'
import { ActivityInfo } from '../../../../externalClasses';
import { setUserActivityInfo } from '../../../../state/reducers/activity';
import { useNavigate } from "react-router-dom";
import "./TemplatesView.css"
const baseURL = "http://127.0.0.1:5000"

function TemplatesView({userData}) {
    const [templates, setTemplates] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newTemplateTitle, setNewTemplateTitle] = useState("")
    const [newTemplateDescription, setNewTemplateDescription] = useState("")
    useEffect(() => {
        fetch(baseURL + `/template`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setTemplates(data);
        })
    }, []);

    const handleClick = (template) => {
        const activityInfo = ActivityInfo(
            template.id,
            1,
            template,
            template,
            template,
        );
        dispatch(setUserActivityInfo(activityInfo));
        navigate(`/templates/${template.id}`)
    }

    const addNewTemplate = async() => {
        if (!newTemplateTitle || !newTemplateDescription) {
            alert("Title and description need to be filled out");
            return;
        }
        var current = templates
        const response = await fetch(baseURL + `/template/add` ,{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": newTemplateTitle,
                "description": newTemplateDescription,
            }),
        })
        const newTemplateResponse = await response.json()
        console.log(newTemplateResponse)
        console.log("1")
        console.log()
        current = [
            ...current,
            newTemplateResponse,
        ]
        setTemplates(current);
        setNewTemplateTitle("");
        setNewTemplateDescription("");
    }
    return (
        <>
            <div className='template-view-container'>
                        {templates.length > 0 && (<>
                            <div className='course'>
                            <h1 className='template-view-title'>These are the current templates. Click on one to edit.</h1>
                        <div className='AccordionSection'>
                            <div className='Container'>
                                {templates.map((template, indexTemplate) => {
                                return (
                                            <div className='Wrap'>
                                                    <h1 onClick={() => handleClick(template)}>{template.name}: {template.description}</h1>
                                            </div>
                                    )
                                })}
                    <div className='flex add-new-template'>
                        <div>
                    <h3>Add a new template: </h3>
                    </div>
                    <div>
                    <input type='text' placeholder='Title' className='input' value={newTemplateTitle} onChange={(e) => setNewTemplateTitle(e.target.value)}/>
                    <input type='text' placeholder='Description' className='input' value={newTemplateDescription} onChange={(e) => setNewTemplateDescription(e.target.value)}/>
<span>{<FiPlus onClick={() => addNewTemplate()}/>}</span>
</div>
                    </div>
                                </div>
                                </div>
            </div>

                            </>)
                        }
                        {templates.length == 0 &&
                            <>
                            <h1 className='template-view-title'>There aren't any templates yet. Add one.</h1>
                            <div className='add-new-template'>
                                <input type='text' placeholder='Title' className='input' value={newTemplateTitle} onChange={(e) => setNewTemplateTitle(e.target.value)}/>
                                <input type='text' placeholder='Description' className='input' value={newTemplateDescription} onChange={(e) => setNewTemplateDescription(e.target.value)}/>
                                <span>{<FiPlus onClick={() => addNewTemplate()}/>}</span>
                            </div>
                            </>        
                        }
                </div>
        </>
    )
}


export default TemplatesView