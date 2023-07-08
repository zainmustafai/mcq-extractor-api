import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mcqs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MCQ',
    }],
});
const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;