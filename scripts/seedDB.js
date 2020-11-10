const mongoose = require("mongoose");
const {
  Family, User, Recipe, DiscussionTopic,
} = require("../models");

const connectionErrors = 0;
// This file empties the Discussion Topics collection and inserts the topics below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/thanksgivingtogetherdb", { useNewUrlParser: true, useUnifiedTopology: true },
);

const discussionTopicsSeed = [
  {
    topic: "What is one thing that you really appreciate about someone at the table?",
  },
  {
    topic: "What is the most valuable lesson you’ve learned this year?",
  },
  {
    topic: "What is your favorite part of Thanksgiving?",
  },
  {
    topic: "What is one thing you would like to accomplish in the coming year?",
  },
  {
    topic: "What made you laugh the hardest this past year?",
  },
  {
    topic: "What family member or friend do you wish was with us at the table today?",
  },
  {
    topic: "If you could learn a new skill this coming year, what would it be?",
  },
  {
    topic: "Which of your qualities make you a good friend?",
  },
  {
    topic: "What book, article, or blog post are you most grateful for this year?",
  },
  {
    topic: "What random acts of kindness have you received this year?",
  },
  {
    topic: "If you could have any job in the world, what would you do?",
  },
  {
    topic: "Who do you admire?",
  },
  {
    topic: "Time to Come Clean. What is something you did as a child that no one else knows about?",
  },
  {
    topic: "What is a wellness, diet, or exercise activity you've tried that actually works?",
  },
  {
    topic: "What’s your most favorite dad joke of all time?",
  },
  {
    topic: "What new—and unexpected—hobby have you started during quarantine?",
  },
  {
    topic: "If you could have anyone, real or fictional, as a quarantine buddy, who would it be?",
  },
  {
    topic: "What has been your most bizarre quarantine purchase?",
  },
  {
    topic: "What is your craziest prediction for what 2021 will bring?",
  },
  {
    topic: "What's one thing you're deeply proud of--but would never put on your résumé?",
  },
  {
    topic: "What's something you've tried that you'll never, ever try again?",
  },
  {
    topic: "What are you an expert on? Is it because of training, lived experience, or both?",
  },
  {
    topic: "If you could have tea with one fictional character, who would it be?",
  },
  {
    topic: "Have you ever fantasized about changing your first name? To what?",
  },
  {
    topic: "What do you value most: free time, recognition, or money?",
  },
  {
    topic: "What's the worst piece of advice you've ever been given?",
  },
  {
    topic: "What are you most grateful for, right now, in this moment?",
  },
  {
    topic: "If you could enroll in a PhD program, with your tuition paid in full by a mysterious benefactor, what would you study--and why?",
  },
  {
    topic: "Are there any laws or social rules that completely baffle you?",
  },
  {
    topic: "Do you have any irrational fears?",
  },
];

DiscussionTopic
  .remove({})
  .then(() => DiscussionTopic.collection.insertMany(discussionTopicsSeed))
  .then((data) => {
    console.log(`${data.result.n} records inserted!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
