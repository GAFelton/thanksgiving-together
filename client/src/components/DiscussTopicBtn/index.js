import React, { useState, useEffect } from "react";
// import "./style.css";
import API from "../../utils/API";

function DiscussTopicBtn() {
  const [topics, setTopics] = useState([]);


  function loadDiscussionTopics() {
    API.getDiscussTopics()
      .then((res) => setTopics(res.data))
      .catch((err) => console.log(err));
  }

  
  useEffect(() => {
    loadDiscussionTopics(); // eslint-disable-line no-use-before-define
    console.log(topics, setTopics);
  }, []);

  function showDiscussionTopic() {
    const randomTopic = Math.floor((Math.random() * topics.length));
    return topics[randomTopic];
  }

  return (
    <div>
      <button className="DiscussTopicBtn" onClick={showDiscussionTopic} type="button" name="DiscussTopicBtn">
        Help! I need a discussion topic.
      </button>
      { // TODO: Figure out where to display the fetched discussion topic.
      }
      <div className="DiscussTopicArea"> {topics}
      
      </div>
    </div>
  );
}

export default DiscussTopicBtn;
