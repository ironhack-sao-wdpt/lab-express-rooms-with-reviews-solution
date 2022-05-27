const { Schema, Types, model } = require("mongoose");

const reviewSchema = new Schema({
  authorId: { type: Types.ObjectId, ref: "User" },
  comment: { type: String, maxlength: 200 },
  roomId: { type: Types.ObjectId, ref: "Room" },
});

module.exports = model("Review", reviewSchema);
