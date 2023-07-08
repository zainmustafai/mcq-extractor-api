import Subject from "./models/subject.model.js";
import Chapter from "./models/chapter.model.js";
import MCQ from "./models/mcq.model.js";

export const createNewSubject = async (req, res) => {
    try {
        const { name } = req.body;
        const subject = await Subject.create({ name });
        res.status(201).json({ subject });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong. Cannnot create subject" });
    };
};
export const createNewChapter = async (req, res) => {
    try {
        const subjectid = req.params.subjectid;
        const { name } = req.body;
        const subject = await Subject.findById(subjectid);
        if (!subject) {
            res.status(404).json({ message: "Subject not found" });
        };
        if (subject) {
            const chapter = await Chapter.create({ name });
            subject.chapters.push(chapter);
            await subject.save();
            res.status(201).json({ chapter });
        };
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong.Cannnot create chapter" });
    };
};
export const createNewMCQ = async (req, res) => {
    try {
        const subjectid = req.params.subjectid;
        const chapterid = req.params.chapterid;
        const subject = await Subject.findById(subjectid);
        if (!subject) {
            res.status(404).json({ message: "Subject not found" });
        };
        const chapter = await Chapter.findById(chapterid);
        if (!chapter) {
            res.status(404).json({ message: "Chapter not found" });
        };
        if (subject && chapter) {
            const { question, options, answer } = req.body;
            const mcq = await MCQ.create({ question, options, answer, explanation, subject: subjectid });
            res.status(201).json({ mcq });
        };

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong.Cannnot create MCQ" });
    };
};

export const createBulkMCQs = async (req, res) => {
    try {
        console.log("Creating bulk MCQs");
        const subjectid = req.params.subjectid;
        const chapterid = req.params.chapterid;
        const mcqs = req.body.mcqs;
        const mcqsTobeAdded = mcqs.map((mcq) => ({
            question: mcq.question,
            options: mcq.options,
            answer: mcq.answer,
            subject: subjectid
        }));
        console.log(mcqs);
        const subject = await Subject.findById({ _id: subjectid });
        if (!subject) {
            res.status(404).json({ message: "Subject not found" });
        };
        const chapter = await Chapter.findById({ _id: chapterid });
        if (!chapter) {
            res.status(404).json({ message: "Chapter not found" });
        };
        if (subject && chapter) {
            const mcqs = req.body;
            const createdMCQs = await MCQ.insertMany(mcqsTobeAdded);
            res.status(201).json({ createdMCQs });
        };
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong.Cannnot create MCQ" });
    }
};

/********************** */
export const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json({ subjects });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong.Cannnot get subjects" });
    };
};
/******* */

export const getAllChaptersBySubjectId = async (req, res) => {
    try {
        const subjectid = req.params.subjectid;
        const subject = await Subject.findById(subjectid);
        if (!subject) {
            res.status(404).json({ message: "Subject not found" });
        };
        if (subject) {
            const chapters = await Chapter.find({ _id: { $in: subject.chapters } });
            res.status(200).json({ chapters });
        };
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong.Cannnot get chapters" });
    };
};