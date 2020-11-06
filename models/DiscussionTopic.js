const mongoose = require("mongoose");

const { Schema } = mongoose;

const discussTopicSchema = new Schema({
  topic: { type: String, required: true },
  archived: { type: Boolean, required: true, default: false },
});

const DiscussionTopic = mongoose.model("DiscussionTopic", discussTopicSchema);

module.exports = DiscussionTopic;
