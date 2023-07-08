import mongoose from "mongoose";

const mcqSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: [{
        type: String,
        required: true,

    }],
    answer: {
        type: String,
        required: true,
    },
    // explanation: {
    //     type: String,
    //     required: true,
    // },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
});

mcqSchema.post('save', function (error, doc, next) {
    console.log("Saving MCQ....");
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('MCQ already exists'));
    } else {
        next(error);
    }
});

const MCQ = mongoose.model("MCQ", mcqSchema);
export default MCQ;

