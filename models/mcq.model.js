import mongoose from "mongoose";

const mcqSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true,
    },
    options: [{
        type: String,
        required: true,

    }],
    answer: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true,
    }
});



const MCQ = mongoose.model("MCQ", mcqSchema);
export default MCQ;


