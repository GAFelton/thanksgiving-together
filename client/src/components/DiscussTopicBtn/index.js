import React, { useState, useEffect } from "react";
import API from "../../utils/API";

function DiscussTopicBtn() {
  const [topics, setTopics] = useState([]);
  const [topicIndex, setTopicIndex] = useState(-1);

  function loadDiscussionTopics() {
    API.getDiscussTopics()
      .then((res) => {
        const result = Array.from(res.data);
        const response = result.map((resObj) => resObj.topic);
        setTopics(response);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadDiscussionTopics();
  }, []);

  function showDiscussionTopic() {
    const randomTopic = Math.floor((Math.random() * topics.length));
    setTopicIndex(randomTopic);
  }

  return (
    <div>
      <button className="DiscussTopicBtn" onClick={showDiscussionTopic} type="button" name="DiscussTopicBtn">
        Help! I need a discussion topic.
      </button>
      { // TODO: Figure out where to display the fetched discussion topic.
      }
      <div className="DiscussTopicArea">
        <p>
          {topics[topicIndex]}
        </p>
      </div>
    </div>
  );
}

export default DiscussTopicBtn;
