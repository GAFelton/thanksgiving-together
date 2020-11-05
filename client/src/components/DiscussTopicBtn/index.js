import { React, useState, useEffect } from "react";
// import "./style.css";
import DiscussTopicAPI from "../../utils/DiscussTopicAPI";

function DiscussTopicBtn() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    loadDiscussionTopics(); // eslint-disable-line no-use-before-define
  }, []);

  function loadDiscussionTopics() {
    DiscussTopicAPI.getDiscussTopics
      .then((res) => setTopics(res.data))
      .catch((err) => console.log(err));
  }

  function showDiscussionTopic() {
    const randomTopic = Math.floor((Math.random() * topics.length));
    return <div>{topics[randomTopic]}</div>;
  }

  return (
    <div>
      <button className="DiscussTopicBtn" onClick={showDiscussionTopic} type="button" name="DiscussTopicBtn">
        Help! I need a discussion topic.
      </button>
      { // TODO: Figure out where to display the fetched discussion topic.
      }
    </div>
  );
}

export default DiscussTopicBtn;
