const { Schema, Types, model } = require("mongoose");

const roomSchema = new Schema({
  ownerId: { type: Types.ObjectId, ref: "User" },
  name: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  reviews: [{ type: Types.ObjectId, ref: "Review" }],
});

module.exports = model("Room", roomSchema);
