// THIS FILE DOES NOT FUNCTION CORRECTLY RIGHT NOW!

const mongoose = require("mongoose");
const {
  Family, User, Recipe, DiscussionTopic,
} = require("../models");

const connectionErrors = [];

// This file empties the Discussion Topics, Family, User, and Recipe collections
// and inserts the seed data below.

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/thanksgivingtogetherdb", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
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

const familySeed = {
  title: "testFam",
};

const userSeed = {
  firstName: "Abby",
  lastName: "Testersmith",
  email: "tester@test.com",
  password: "test",
};

const recipeSeed = (authorID) => ({ title: "Acorn Squash Soup", author: authorID });

async function familyInsert(seed) {
  try {
    Family.remove({});
    const famData = new Family(seed);
    const famID = famData.insertedId;
    console.log(famID);
    console.log(`Family Inserted? ObjectID: ${famData.insertedId}`);
    famData.save((err) => {
      if (err) throw err;
    });
    return famID;
  } catch (err) {
    console.error(err);
    connectionErrors.push(err);
  }
  return null;
}

async function userInsert(seed, familyID) {
  try {
    User.remove({});
    const newUser = new User(seed); // eslint-disable-next-line no-unused-vars
    const dbFamilyModel = await Family.findOneAndUpdate({ _id: familyID },
      { $push: { members: newUser.id } }, { new: true });
    const userID = newUser.id;
    console.log(`User Inserted? ObjectID: ${userID}`);
    newUser.save((err) => {
      if (err) throw err;
    });
    return userID;
  } catch (err) {
    console.error(err);
    connectionErrors.push(err);
  }
  return null;
}

async function recipeInsert(seed, familyID, memberID) {
  try {
    const authorID = memberID;
    Recipe.remove({});
    const newRecipe = new Recipe(seed(authorID)); // eslint-disable-next-line no-unused-vars
    const dbFamilyModel = await Family.findOneAndUpdate({ _id: familyID },
      { $push: { recipes: newRecipe.id } }, { new: true });
    console.log(`Recipe Inserted? ObjectID: ${newRecipe.id}`);
    newRecipe.save((err) => {
      if (err) throw err;
    });
    return newRecipe;
  } catch (err) {
    console.error(err);
    connectionErrors.push(err);
  }
  return null;
}

function discussionInsert(seed) {
  DiscussionTopic
    .remove({})
    .then(() => DiscussionTopic.collection.insertMany(seed))
    .then((data) => {
      console.log(`${data.result.n} records inserted!`);
      return data;
    })
    .catch((err) => {
      console.error(err);
      connectionErrors.push(err);
    });
}

function errorHandler(errArray) {
  const errNumber = errArray.length;
  if (errNumber > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

async function init() {
  try {
    const famID = await familyInsert(familySeed);
    const userID = await userInsert(userSeed, famID);
    await recipeInsert(recipeSeed, famID, userID)
      .then(() => discussionInsert(discussionTopicsSeed));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  errorHandler(connectionErrors);
}

init();
