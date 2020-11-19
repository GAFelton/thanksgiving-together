const mongoose = require("mongoose");
const {
  Family, User, Recipe, DiscussionTopic,
} = require("../models");

const connectionErrors = [];

// This script empties the Discussion Topics, Family, User, and Recipe collections
// and inserts the seed data below.
// THE DELETION IS IRREVERSIBLE! Make sure you back up records that you wish to keep.

// Connect to MongoDB Database.
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/thanksgivingtogetherdb", {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
  },
);
console.log("Database Connection made, seeding data:");

// Seed Data for discussion topics. 30 Records.
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

// Seed Data for family. 1 Record.
const familySeed = {
  title: "testFam",
};

// Seed Data for user. 1 Record.
const userSeed = {
  firstName: "Abby",
  lastName: "Testersmith",
  email: "tester@test.com",
  password: "test",
  familyAdmin: true,
};

// Seed Data for recipe. 1 Record. Requires a userID, so must be seeded after user is seeded.
const recipeSeed = { title: "Acorn Squash Soup" };

// Deletes existing records and Inserts family seed data into database.
// Takes in seed data.
async function familyInsert(seed) {
  try {
    const deleted = await Family.deleteMany();
    console.log(`Number of Family records deleted: ${deleted.deletedCount}`);
    const famData = await Family.create(seed);
    const famID = famData._id; // eslint-disable-line no-underscore-dangle
    console.log(`Family Inserted: ObjectID: ${famID}`);
    // Returns famID so that userInsert and recipeInsert can add their _ids to this family record.
    return famID;
  } catch (err) {
    console.error(err);
    connectionErrors.push(err);
  }
  return null;
}

// Deletes existing records and Inserts user seed data into database.
// Takes in seed data and family ID from familyInsert().
async function userInsert(seed, familyID) {
  try {
    const deleted = await User.deleteMany();
    console.log(`Number of User records deleted: ${deleted.deletedCount}`);
    seed.family = familyID; // eslint-disable-line no-param-reassign
    const newUser = new User(seed); // eslint-disable-next-line no-unused-vars
    const dbFamilyModel = await Family.findOneAndUpdate({ _id: familyID },
      { $push: { members: newUser.id } }, { new: true });
    const userID = newUser.id;
    console.log(`User Inserted: ObjectID: ${userID}`);
    const saved = await newUser.save(); // eslint-disable-line no-unused-vars
    // Returns userID so that it can be used in the recipeSeed.
    return userID;
  } catch (err) {
    console.error(err);
    connectionErrors.push(err);
  }
  return null;
}

// Deletes existing records and Inserts recipe seed data into database.
// Takes in seed data, family ID from familyInsert(), and memberID from userInsert().
async function recipeInsert(seed, familyID, memberID) {
  try {
    const authorID = memberID;
    const deleted = await Recipe.deleteMany();
    console.log(`Number of Recipe records deleted: ${deleted.deletedCount}`);
    seed.author = authorID; // eslint-disable-line no-param-reassign
    const newRecipe = new Recipe(seed); // eslint-disable-next-line no-unused-vars
    const dbFamilyModel = await Family.findOneAndUpdate({ _id: familyID },
      { $push: { recipes: newRecipe.id } }, { new: true });
    console.log(`Recipe Inserted: ObjectID: ${newRecipe.id}`);
    const savedRecipe = await newRecipe.save();
    return savedRecipe;
  } catch (err) {
    console.error(err);
    connectionErrors.push(err);
  }
  return null;
}

// Deletes existing records and Inserts discussion topic seed data into database.
// Takes in seed data.
async function discussionInsert(seed) {
  try {
    const deleted = await DiscussionTopic.deleteMany();
    console.log(`Number of Discussion Topic records deleted: ${deleted.deletedCount}`);
    const data = await DiscussionTopic.insertMany(seed);
    console.log(`${data.length} Discussion Topic records inserted!`);
  } catch (err) {
    console.error(err);
    connectionErrors.push(err);
  }
}

// This function ends the database connection at the end of the seeding script.
function errorHandler(errArray) {
  const errNumber = errArray.length;
  if (errNumber > 0) {
    console.log(`Errors: ${errArray}`);
    process.exit(1);
  } else {
    console.log("Connection Successful, now terminating node process.");
    process.exit(0);
  }
}

// init() is the controller for all inserting functions.
// It ensures that famID and userID are accessible for later use.
async function init() {
  const famID = await familyInsert(familySeed);
  const userID = await userInsert(userSeed, famID);
  await recipeInsert(recipeSeed, famID, userID);
  await discussionInsert(discussionTopicsSeed);
  errorHandler(connectionErrors);
}

// Calls init() and runs the script.
init();
