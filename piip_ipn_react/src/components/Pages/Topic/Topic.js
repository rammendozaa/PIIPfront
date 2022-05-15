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
  const [topicData, setTopicData] = useState({
    "id": 2,
    "topic_information": "{\"blocks\":[{\"key\":\"637gr\",\"text\":\"111111111111111111111111111111111111111111111\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":45,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":45,\"style\":\"fontsize-medium\"},{\"offset\":0,\"length\":45,\"style\":\"fontfamily-PT Sans\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"307ac\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"44a2k\",\"text\":\"22222222\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":8,\"style\":\"fontsize-medium\"},{\"offset\":0,\"length\":8,\"style\":\"fontfamily-PT Sans\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"start\"}},{\"key\":\"5rkjl\",\"text\":\"2222222222222222222222222222222222222\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":37,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":37,\"style\":\"fontfamily-PT Sans\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"left\"}},{\"key\":\"9r2vk\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"start\"}},{\"key\":\"4a3bh\",\"text\":\"33333333\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":8,\"style\":\"fontfamily-PT Sans\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"start\"}},{\"key\":\"4luqe\",\"text\":\"2222222222222222222222222222222222222\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":37,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":37,\"style\":\"fontfamily-PT Sans\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"left\"}},{\"key\":\"1demf\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"start\"}},{\"key\":\"f07ud\",\"text\":\"33333333\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":8,\"style\":\"fontfamily-PT Sans\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"start\"}},{\"key\":\"7mv0p\",\"text\":\"2222222222222222222222222222222222222\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":37,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":37,\"style\":\"fontfamily-PT Sans\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"left\"}},{\"key\":\"fu1ae\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"start\"}},{\"key\":\"f2ens\",\"text\":\"33333333\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":8,\"style\":\"fontfamily-PT Sans\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"start\"}},{\"key\":\"cfocm\",\"text\":\"2222222222222222222222222222222222222\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":37,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":37,\"style\":\"fontfamily-PT Sans\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"left\"}},{\"key\":\"eau76\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"start\"}},{\"key\":\"bngm5\",\"text\":\"33333333\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":8,\"style\":\"fontfamily-PT Sans\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"left\"}}],\"entityMap\":{}}",
    "description": "this is a descritpion",
    "title": "aaaa"
});

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
      setTopicData(activity);
    } else {
      fetch(`/${topic_route}?topicId=${topic_id}`, {
        method: "GET",
      })
      .then(res => res.json())
      .then(data => {
        setJSON(data["topic_information"]);
        setTopicData(data);
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
        <h1 className="topic-title">
              {topicData.title}: {topicData.description}
        </h1>
        <hr className="hr-style"/>
            <div className="parser" ref={node} key={Math.random()}>
              {json && ReactHTMLParser(draftToHtml(JSON.parse(json)))}
            </div>
            </div>
            {(userData.role === "user") &&
              <div className="d-flex-topic justify-content-center-topic">
                <button button type="button" className="btn-topic btn-light-topic" 
                  onClick={() => {navigate(`/my-course`)}}>
                    Click here to go to your course!
                </button>
                <button type="button" className="btn-topic btn-primary-topic" 
                  onClick={() => {handleButtonClick()}}>
                    Click here to mark this topic as read!
                </button>
              </div>
            }
      </div>
    </>
  );
}

export default Topic;
