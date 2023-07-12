import mongoose from "mongoose";
// Schema for Subject
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  departments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    }
  ]
});


// Schema for Chapter
const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
