import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import API from "../../utils/API";

// Discussion Topic Button Functional Component
function DiscussTopicBtn() {
  // The topics state is populated when the page first loads (via useEffect).
  // The topicIndex state is changed by user input.
  const [topics, setTopics] = useState([]);
  const [topicIndex, setTopicIndex] = useState(-1);

  // This function asks axios to get the full list of discussion topics from the database.
  // It disregards the _id from each and sets the topics state to an array of discussion topics.
  function loadDiscussionTopics() {
    API.discussionTopics.get()
      .then((res) => {
        const result = Array.from(res.data);
        const response = result.map((resObj) => resObj.topic);
        setTopics(response);
      })
      .catch((err) => console.log(err));
  }

  // On Component load, get discussion topics from database.
  useEffect(() => {
    loadDiscussionTopics();
  }, []);

  // onClick, a random number is generated and used to set the TopicIndex state.
  // This determines which topic is displayed.
  function showDiscussionTopic() {
    const randomTopic = Math.floor((Math.random() * topics.length));
    setTopicIndex(randomTopic);
  }

  // The core of this rendering is just the button.
  // For now, DiscussTopicArea is the div in which topics are displayed.
  // Topics should be displayed in a child component, which can be placed elsewhere on the page.
  return (
    <Col>
      <Button variant="primary" className="DiscussTopicBtn" onClick={showDiscussionTopic} type="button" name="DiscussTopicBtn">
        Help! I need a discussion topic.
      </Button>
      { // TODO: Figure out where to display the fetched discussion topic.
      }
      <div className="DiscussTopicArea">
        <p>
          {topics[topicIndex]}
        </p>
      </div>
    </Col>
  );
}

export default DiscussTopicBtn;
