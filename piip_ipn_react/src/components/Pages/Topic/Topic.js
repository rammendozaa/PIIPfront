import { useState, useEffect, useRef } from "react";
//import MarkdownRender from "../MarkdownRender";
import './Topic.css'
import draftToHtml from 'draftjs-to-html';
import ReactHTMLParser from 'react-html-parser';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"
const baseURL = "http://127.0.0.1:5000"


function Topic({userData}) {
  const navigate = useNavigate()
  const userId = userData.user_id;
  const {activity} = useSelector(state => state.userActivity);
  const {topic_id} = useParams();
  const {topic_type} = useParams();
  const topic_route = (topic_type === "algorithm") ? "algorithmTopics" : "softSkillsTopics";
  const [json, setJSON] = useState(
    localStorage.getItem('editorData')
  );

  const updateUserTemplateActivity = async (user_activity_id, status_id) => {
    await fetch(
      baseURL + `/user/activity/${user_activity_id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "statusId": status_id,
      }),
    })
  }

  const updateUserTopic = async (status_id) => {
    await fetch(
      baseURL + `/user/${userId}/topic/${topic_type}/${topic_id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "statusId": status_id,
      }),
    })
  }

  useEffect(() => {
    if ((activity !== undefined && activity !== null) && activity["topic_information"]) {
      setJSON(activity["topic_information"])
    } else {
      fetch(`/${topic_route}?topicId=${topic_id}`, {
        method: "GET",
      })
      .then(res => res.json())
      .then(data => {
        setJSON(data["topic_information"])
      });
    }
    if (userData.role === "user") {
      updateUserTopic(2);
      if ((activity !== undefined && activity !== null) && activity.user_activity_id) {
        updateUserTemplateActivity(activity.user_activity_id,2);
      }
    }
  }, []);

  const handleButtonClick = async () => {
    updateUserTopic(4);
		if ((activity !== undefined && activity !== null) && activity.user_activity_id) {
			updateUserTemplateActivity(activity.user_activity_id,4);
		}
  }
  /*
  const markdown = `
# Graphs
You are given a tree with $N$ and a number $K$. Each node has a weight associated with it. The tree is rooted in node 1.
You have to choose $K$ disjoint subtrees such that the sum of all chosen subtrees is maximum.
See test cases for a better understanding.
Given a **formula** below
$$
s = ut + \\frac{1}{2}at^{2}
$$
x &lt; 3
\\
Some of the \textbf{greatest}

Here is a [Link](https://example.com/ "Optional link title").
\\
Calculate the value of $s$ when $u = 10\\frac{m}{s}$ and $a = 2\\frac{m}{s^{2}}$ at $t = 1s$
\\
![image info](https://www.himgs.com/imagenes/hola/comunes/hola-2017.gif)
\\
$\\sigma_U \\sim \\mathrm{Normal}(0, \\Theta_U^2)$
\\
$\\int_0^\\infty x^2 dx$
\\
$\\leq$
`
*/
  /*return (
    <>
      <div className="topic-container">
        <div className="topic">
          <MarkdownRender children={markdown} />
        </div>
      </div>
    </>
  );*/
  const node = useRef();
  useEffect(() => {
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, node.current]);
  });
  return (
    <>
      <div className="topic-container">
        <div className="topic">
          <div className="preview">
            <div ref={node} key={Math.random()}>
              {json && ReactHTMLParser(draftToHtml(JSON.parse(json)))}
            </div>
						{(userData.role === "user") && <div><button className="btn-primary" 
            onClick={() => {navigate(`/my-course`)}}>
              Click here to go back to your course!
            </button><button className="btn-primary" 
            onClick={() => {handleButtonClick()}}>
              Click here to mark activity as read!
            </button></div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Topic;
