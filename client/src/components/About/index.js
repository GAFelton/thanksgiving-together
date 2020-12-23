import React from "react";
import Card from "react-bootstrap/Card";

function About() {
  return (
    <div className="container">
      <Card className="bg-dark cardText">
        <Card.Img src="https://images.pexels.com/photos/5662351/pexels-photo-5662351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Thanksgiving Table" />
        <Card.ImgOverlay>
          <Card.Header style={{
            position: "relative",
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            fontSize: "6vw",
          }}
          >
            Thanksgiving Together
          </Card.Header>
          <Card.Text style={{
            position: "relative",
            left: "50%",
            top: "35%",
            transform: "translate(-50%, -50%)",
            fontSize: "2.5vw",
          }}
          >
            Celebrate Thanksgiving with your loved ones virtually this year
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
      <br />
      <div className="aboutParagraph">
        <p>
          With the ever increasing cases of Covid-19 and Thanksgiving coming up,
          it is more important than ever that people wear masks and refrain from
          frequenting public spaces.
        </p>
        <p>
          Thanksgiving Together allows for family members and/or friends to gather
          together in a Zoom meeting call to remotely celebrate Thanksgiving. Our app wraps Zoom,
          discussion topics, recipes for Thanksgiving activities, and music altogether in one place
          for your convenience.
        </p>
        <p>
          Register and login to experience a whole new Thanksgiving together online this year!
        </p>
        <p>
          If you need a guide on how to register, head on over to
          <a href="/how-to" style={{ color: "#fd7e14" }}> How-to </a>
          for a quick rundown.
        </p>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default About;
