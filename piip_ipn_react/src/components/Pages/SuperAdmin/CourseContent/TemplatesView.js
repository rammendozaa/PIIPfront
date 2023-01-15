import React, { useState, useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import './TemplatesView.css'
const baseURL = 'http://127.0.0.1:5000'

function TemplatesView ({ userData }) {
  const [templates, setTemplates] = useState([{
    position: null,
    id: 5,
    sections: [],
    description: '1111',
    is_active: true,
    name: '1111'
  }])
  const navigate = useNavigate()
  const [newTemplateTitle, setNewTemplateTitle] = useState('')
  const [newTemplateDescription, setNewTemplateDescription] = useState('')

  const handleClick = (template) => {
    navigate(`/templates/${template.id}`)
  }

  const getTemplates = async () => {
    const response = await fetch('/template', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      }
    })
    const response_json = await response.json()
    setTemplates(response_json)
  }

  const addNewTemplate = async () => {
    if (!newTemplateTitle || !newTemplateDescription) {
      alert('Title and description need to be filled out')
      return
    }
    await fetch('/template/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      },
      body: JSON.stringify({
        name: newTemplateTitle,
        description: newTemplateDescription
      })
    })
    setNewTemplateTitle('')
    setNewTemplateDescription('')
    getTemplates()
  }

  useEffect(() => {
    getTemplates()
  }, [])
  return (
    <>
      <div className="templateview-container">
        <div className="templateview">
          {templates.length > 0 && (
              <div className="templateview-course">
                <h1 className="templateview-title">
                  These are the current templates.
                </h1>
                <div className="templateview-accordionSection">
                  <div className="templateview-Container">
                    {templates.map((template, indexTemplate) => {
                      return (
                        <div className="templateview-wrap">
                          <h1 onClick={() => handleClick(template)}>
                            {template.name}
                          </h1>
                        </div>
                      )
                    })}
                    {userData.role === 'super' && <div className="flex templateview-add-new-template">
                      <div>
                        <h3>Add a new template: </h3>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Title"
                          className="templateview-input"
                          value={newTemplateTitle}
                          onChange={(e) => setNewTemplateTitle(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Description"
                          className="templateview-input"
                          value={newTemplateDescription}
                          onChange={(e) =>
                            setNewTemplateDescription(e.target.value)
                          }
                        />
                        <span>
                          {<FiPlus onClick={() => addNewTemplate()} />}
                        </span>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
          )}
          {templates.length == 0 && (
            <>
              <h1 className="template-view-title">
                There aren't any templates yet.
              </h1>
              {userData.role === 'super' && <div className="templateview-add-new-template">
                <input
                  type="text"
                  placeholder="Title"
                  className="templateview-input"
                  value={newTemplateTitle}
                  onChange={(e) => setNewTemplateTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="templateview-input"
                  value={newTemplateDescription}
                  onChange={(e) => setNewTemplateDescription(e.target.value)}
                />
                <span>{<FiPlus onClick={() => addNewTemplate()} />}</span>
              </div>}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default TemplatesView
