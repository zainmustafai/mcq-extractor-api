import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
});
const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;
