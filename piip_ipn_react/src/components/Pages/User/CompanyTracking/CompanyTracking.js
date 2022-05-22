import DateTimePicker from "react-datetime-picker";
import { IconContext } from "react-icons";
import { FiPlus } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import React, { useState } from "react";
import { useEffect } from "react";
import "./CompanyTracking.css";
import CompanyPopup from "./CompanyTrackingPopup";
import {
  FaFacebook,
  FaMicrosoft,
  FaGoogle,
  FaAmazon,
  FaApple,
} from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
const baseURL = "http://127.0.0.1:5000";

const COMPANIES = {
  "Facebook": 1,
  "Microsoft": 2,
  "Google": 3,
  "Amazon": 4,
  "Apple": 5,
};

const COMPANIES_TO_ICON = {
  1: <FaFacebook />,
  2: <FaMicrosoft />,
  3: <FaGoogle />,
  4: <FaAmazon />,
  5: <FaApple />,
};

const COMPANIES_LIST = ["Facebook", "Microsoft", "Google", "Amazon", "Apple"];

const USER_COMPANY_STATUS = {
  "Not applied": 1,
  "Applied": 2,
  "Coding challenge": 3,
  "Interviewing": 4,
  "Received offer": 5,
  "Rejected": 6,
};

const USER_ID_TO_STATUS = {
  1: "Not applied",
  2: "Applied",
  3: "Coding challenge",
  4: "Interviewing",
  5: "Received offer",
  6: "Rejected",
};

function CompanyTracking({ userData }) {
  const user_id = userData.user_id;
  const [chosenCalendarDate, setChosenDate] = useState(new Date());
  const [updateTracking, setUpdateTracking] = useState(false);
  const [dropDownOption, setDropDownOption] = useState("Facebook");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newActivityIndex, setNewActivityIndex] = useState(-1);
  const [newActivitySectionId, setNewActivitySectionId] = useState(-1);
  const [description, setDescription] = useState("");
  const [clicked, setClicked] = useState(-1);
  const [dropDownStatusOption, setDropDownStatusOption] =
    useState("Not applied");
  const [companies, setCompanies] = useState([
    {
      applicationURL: "https://www.metacareers.com/",
      id: 1,
      userId: 1,
      statusId: 1,
      interviewDate: null,
      companyId: 1,
      trackingLinks: [
        {
          description: "Meta openings",
          id: 1,
          url: "https://www.metacareers.com/jobs",
          companyTrackingId: 1,
          is_active: true,
        },
        {
          description: "hla",
          id: 2,
          url: "here",
          companyTrackingId: 1,
          is_active: true,
        },
      ],
      companyName: "Facebook",
    },
  ]);
  const handleSubmit = (event) => {
    setDropDownOption(event.target.value);
  };
  const handleStatusSubmit = (event) => {
    setDropDownStatusOption(event.target.value);
  };
  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it 2
      return setClicked(-1);
    }
    setClicked(index);
  };

  const prepareNewSection = (index, templateSectionId) => {
    setNewActivityIndex(index);
    setNewActivitySectionId(templateSectionId);
  };

  const getCompanies = async () => {
    fetch(baseURL + `/user/${user_id}/tracking`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      });
  };
  useEffect(() => {
    getCompanies();
  }, []);

  const addCompanyTracking = async () => {
    await fetch(baseURL + `/user/${user_id}/tracking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyId: COMPANIES[dropDownOption],
      }),
    });
    getCompanies();
  };

  const addCompanyTrackingLink = async (company_tracking_id) => {
    const response = await fetch(
      baseURL + `/user/tracking/${company_tracking_id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: newDescription,
          url: newUrl,
        }),
      }
    );
    setNewUrl("");
    setNewDescription("");
    getCompanies();
  };

  const updateCompanyTracking = async (
    company_tracking_id,
    statusId,
    interviewDate
  ) => {
    var status = null
    if (statusId !== null) {
        status = USER_COMPANY_STATUS[statusId];
    }
    const response = await fetch(
      baseURL + `/user/tracking/${company_tracking_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          statusId: status,
          interviewDate: interviewDate,
        }),
      }
    );
    setUpdateTracking(false);
    getCompanies();
  };

  const updateCompanyTrackingLink = async (
    company_tracking_link_id,
    description,
    url
  ) => {
    const response = await fetch(
      baseURL + `/user/tracking/link/${company_tracking_link_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description,
          url: url,
        }),
      }
    );
    getCompanies();
  };

  const deleteCompanyTracking = async (indexCompany, company_tracking_id) => {
    const response = await fetch(
      baseURL + `/user/tracking/${company_tracking_id}`,
      {
        method: "DELETE",
      }
    );
    getCompanies();
  };

  const deleteCompanyTrackingLink = async (
    indexLink,
    company_tracking_link_id
  ) => {
    const response = await fetch(
      baseURL + `/user/tracking/link/${company_tracking_link_id}`,
      {
        method: "DELETE",
      }
    );
    getCompanies();
  };

  const [query, setQuery] = useState("");

  function search(rows) {
    return rows.filter(
      (row) => row.companyName.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  return (
    <>
      <div className="course-content-container">
        {companies !== undefined && (
          <div className="course">
            <h1 className="course-title">
              {
                "Here you can keep track of the companies that you're interested in applying to."
              }
            </h1>
            <div className="AccordionSection">
              <div className="Container">
                {companies.map((company, indexCompany) => {
                    var newDate = new Date().toString();
                    if (company.interviewDate !== null) {
                        var dateString  = company.interviewDate;
                        var year        = dateString.substring(0,4);
                        var month       = dateString.substring(5,7);
                        var day         = dateString.substring(8,10);
                        var hour        = dateString.substring(11,16)
                        var date        = new Date(year, month-1, day);
                        newDate = date.toString().substring(0, 15) + " at " + hour;
                    }
                  return (
                    <>
                      <div
                        className="Wrap-Tracking"
                        onClick={() => toggle(indexCompany)}
                        key={indexCompany}
                      >
                        <span>
                          {COMPANIES_TO_ICON[company.companyId]}
                          <h1>{company.companyName}</h1>
                          <h2>
                            Current status:{" "}
                            {USER_ID_TO_STATUS[company.statusId]}
                          </h2>
                        </span>
                        <span>
                          {company.statusId === 5 ? (
                            <div>
                              <h3>Congratulations! We are so excited for you!</h3>
                            </div>
                            ) : company.statusId === 6 ? (
                            <div>
                              <h3>Don't worry! Keep on practicing and you'll be ready next time!</h3>
                            </div>
                            ) : company.interviewDate === null ? (
                            <div>
                              <h3>You don't have any upcoming interviews</h3>
                            </div>
                            ) : company.interviewDate !== null ? (
                              <div>
                                <h3>
                                  You have an upcoming interview on: {company.interviewDate}
                                </h3>
                              </div>
                            ) : <></>}
                        </span>
                        <span></span>
                        <span>
                          <IconContext.Provider
                            value={{ color: "red", size: "25px" }}
                          >
                            <TiDelete
                              onClick={() =>
                                deleteCompanyTracking(indexCompany, company.id)
                              }
                            />
                          </IconContext.Provider>
                        </span>
                      </div>
                      <div className="activities-container">
                        {clicked === indexCompany
                          ? company.trackingLinks.map((link, indexLink) => {
                              return (
                                <>
                                  <div className="Dropdown" key={indexLink}>
                                    <p>
                                      {link.description}: <b>{link.url}</b>
                                    </p>
                                    <span>
                                      <IconContext.Provider
                                        value={{ color: "red", size: "25px" }}
                                      >
                                        <TiDelete
                                          onClick={() =>
                                            deleteCompanyTrackingLink(
                                              indexLink,
                                              link.id
                                            )
                                          }
                                        />
                                      </IconContext.Provider>
                                    </span>
                                  </div>
                                </>
                              );
                            })
                          : null}
                        {clicked === indexCompany ? (
                          <div className="AddNewActivity-company-tracking">
                              <h3>Save important information here</h3>
                            <textarea
                              className="text-area-company-tracking"
                              id="description"
                              placeholder="Description"
                              value={newDescription}
                              onChange={(e) =>
                                setNewDescription(e.target.value)
                              }
                            ></textarea>
                            <textarea
                              className="text-area-company-tracking"
                              id="url"
                              placeholder="URL"
                              value={newUrl}
                              onChange={(e) => setNewUrl(e.target.value)}
                            ></textarea>
                            <IconContext.Provider
                              value={{ color: "green", size: "25px" }}
                            >
                              <span>
                                {
                                  <FiPlus
                                    onClick={() =>
                                      addCompanyTrackingLink(company.id)
                                    }
                                  />
                                }
                              </span>
                            </IconContext.Provider>
                          </div>
                        ) : null}
                        {clicked === indexCompany ? (
                          <div className="AddNewActivity-company-tracking">
                            <div className="Wrap-tracking">
                              <span>
                                <GrDocumentUpdate onClick={() => updateCompanyTracking(company.id, dropDownStatusOption, null)}/>
                              </span>
                              <span>
                                <h3>Received news?</h3>
                                <select
                                  className="dropdown-menu-company"
                                  value={dropDownStatusOption}
                                  onChange={handleStatusSubmit}
                                  disabled={company.statusId===5||company.statusId===6}
                                >
                                  <option value="Not applied">
                                    Not applied
                                  </option>
                                  <option value="Applied">Applied</option>
                                  <option value="Coding challenge">
                                    Coding challenge
                                  </option>
                                  <option value="Interviewing">
                                    Interviewing
                                  </option>
                                  <option value="Received offer">
                                    Received offer
                                  </option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </span>
                            </div>
                            <div className="update-company-tracking">
                              <div className="Wrap-tracking">
                                <span>
                                  <GrDocumentUpdate onClick={() => updateCompanyTracking(company.id, null, chosenCalendarDate)}/>
                                </span>
                                <span>
                                  <h3>Have an important date coming up?</h3>
                                  <div>
                                    <DateTimePicker
                                      onChange={setChosenDate}
                                      value={chosenCalendarDate}
                                    />
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </>
                  );
                })}
                <div className="AddNewSection">
                  <h2>Add a new company to track: </h2>
                  <select
                    className="dropdown-menu-company"
                    value={dropDownOption}
                    onChange={handleSubmit}
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Google">Google</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Apple">Apple</option>
                  </select>
                  <IconContext.Provider
                    value={{ color: "green", size: "25px" }}
                  >
                    <span>
                      {<FiPlus onClick={() => addCompanyTracking()} />}
                    </span>
                  </IconContext.Provider>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CompanyTracking;
