const mongoose = require("mongoose");
const en = require("nanoid-good/locale/en");
const nanoid = require("nanoid-good").nanoid(en);

const { Schema } = mongoose;

const familySchema = new Schema({
  title: { type: String, required: true },
  roomCode: {
    type: String,
    required: true,
    default: () => nanoid(8),
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  zoomInfo: {
    id: { type: Number, default: 0 },
    pwd: { type: String, default: "" },
  },
  archived: { type: Boolean, required: true, default: false },
});

const Family = mongoose.model("Family", familySchema);

module.exports = Family;
