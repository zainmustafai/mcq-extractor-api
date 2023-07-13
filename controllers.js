import Subject from "./models/subject.model.js";
import Chapter from "./models/chapter.model.js";
import MCQ from "./models/mcq.model.js";
import mongoose from "mongoose";
import Department from "./models/department.model.js";

export const createNewSubject = async (req, res) => {
  try {
    const { departmentid } = req.params;
    const { name } = req.body;
    const department = await Department.findById(departmentid);
    const alreadyExists = await Subject.findOne({ name });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    if (alreadyExists && alreadyExists.departments.includes(departmentid)) {
      return res.status(400).json({
        message: `Subject with the name: '${name}' already exists in the same department.`,
      });
    }

    if (!alreadyExists) {
      console.log("Creating new subject");
      const subject = new Subject({ name, departments: [departmentid] });
      console.log("Subject created", subject);
      await subject.save();
      return res.status(201).json({ subject });
    }

    console.log("Subject already exists");
    alreadyExists.departments.push(departmentid);
    await alreadyExists.save();
    return res.status(201).json({ alreadyExists });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong. Cannot create subject" });
  }
};

export const createNewChapter = async (req, res) => {
  try {
    const subjectid = req.params.subjectid;
    const { name } = req.body;
    const subject = await Subject.findById(subjectid);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    if (subject) {
      const chapter = new Chapter({ name });
      chapter.subject = subject._id;
      await chapter.save();
      if (!chapter) {
        return res.status(400).json({ message: "Cannot create chapter" });
      }
      console.log("Chapter created", chapter);
      return res.status(201).json({ chapter });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong.Cannnot create chapter" });
  }
};
export const deleteChapterById = async (req, res) => {
  try {
    const chapterid = req.params.chapterid;
    await Chapter.findByIdAndDelete(chapterid);
    return res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong.Cannnot delete chapter" });
  }
};
/************************************************************************************************************************************************************************************************* */
export const createNewMCQ = async (req, res) => {
  try {
    const { departmentid, subjectid, chapterid } = req.params;

    const department = await Department.findById(departmentid);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const subject = await Subject.findById(subjectid);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const chapter = await Chapter.findById(chapterid);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    if (subject && chapter && department) {
      const { question, options, answer } = req.body;
      const mcq = await MCQ.create({
        question,
        options,
        answer,
        explanation,
        subject: subjectid,
        chapter: chapterid,
        department: departmentid,
      });
      return res.status(201).json({ mcq });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong.Cannnot create MCQ" });
  }
};

export const createBulkMCQs = async (req, res) => {
  console.log("Creating bulk MCQs");
  try {
    console.log("Creating bulk MCQs");
    const subjectid = req.params.subjectid;
    const chapterid = req.params.chapterid;
    const mcqs = req.body.mcqs;
    const mcqsTobeAdded = mcqs.map((mcq) => {
      if (mcq.question && mcq.options && mcq.answer && mcq.explanation) {
        console.log(
          "******************************MCQ to be added***********************************\n",
          mcq
        );
        return {
          question: mcq.question,
          options: mcq.options,
          answer: mcq.answer,
          explanation: mcq.explanation,
          subject: subjectid,
          chapter: chapterid,
        };
      }
    });
    console.log("MCQs to be added", mcqsTobeAdded);
    console.log("MCQs to be added", mcqsTobeAdded.length);

    const subject = await Subject.findById(subjectid);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    const chapter = await Chapter.findById(chapterid);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    if (subject && chapter) {
      const createdMCQs = await MCQ.insertMany(mcqsTobeAdded);
      if (!createdMCQs) {
        return res.status(400).json({ message: "Cannot create MCQs" });
      }
      console.log("Data inserted successfully");
      return res.status(201).json({ createdMCQs });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong. Cannot create MCQs" });
  }
};

/********************** */
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    return res.status(200).json({ subjects });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong.Cannnot get subjects" });
  }
};

/********/
export const getAllSubjectsByDepartmentId = async (req, res) => {
  try {
    const { departmentid } = req.params;
    console.log("Getting all subjects by department id" + departmentid);
    const subjects = await Subject.find({ departments: departmentid });
    if (!subjects) {
      return res.status(404).json({ message: "Subjects not found" });
    }
    console.log("Subjects", subjects);
    return res.status(200).json({ subjects });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong. Cannot get subjects" });
  }
};

export const deleteSubjectById = async (req, res) => {
  try {
    const subjectid = req.params.subjectid;
    await Subject.findByIdAndDelete(subjectid);
    await Chapter.deleteMany({ subject: subjectid });
    await MCQ.deleteMany({ subject: subjectid });

    return res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong.Cannnot delete subject" });
  }
};
/*********************************************************************************************************************************************** */

export const getAllChaptersBySubjectId = async (req, res) => {
  try {
    const subjectid = req.params.subjectid;
    console.log("Getting all chapters by subject id" + subjectid);
    const subject = await Subject.findById(subjectid);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    if (subject) {
      const chapters = await Chapter.find({ subject: subjectid });
      return res.status(200).json({ chapters });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong.Cannnot get chapters" });
  }
};

/*********************************************************************************************************************************************** */
//Departments
/*********************************************************************************************************************************************** */
export const createNewDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Department.create({ name });
    return res.status(201).json({ department });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong. Cannot create department" });
  }
};
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ departments });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong. Cannot get departments" });
  }
};

export const deleteDepartmentById = async (req, res) => {
  try {
    const departmentid = req.params.departmentid;
    await Department.findByIdAndDelete(departmentid);
    return res.status(200).json({ message: "Department deleted successfully" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong. Cannot delete department" });
  }
};

export const getAllMCQs = async (req, res) => {
  try {
    const mcqs = await MCQ.find();
    return res.status(200).json({ mcqs });
  } catch {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong. Cannot get MCQs" });
  }
};
/*********************************************************************************************************************************************** */
/*********** DELETION CONTROLLERS ********************************************************* */

export const deleteMCQSBySubjectId = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong.Cannnot delete MCQs" });
  }
};

/****************** */

export const deleteMCQSByChapterId = async (req, res) => {
  try {
    const { chapterid } = req.params;
    const { subjectid } = req.params;
    console.log("Deleting MCQs by chapter id" + chapterid);
    const subject = await Subject.findById(subjectid);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    const chapter = await Chapter.findById(chapterid);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    if (subject && chapter) {
      await MCQ.deleteMany({ chapter: chapterid, subject: subjectid });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong.Cannnot delete MCQs" });
  }
};

/*********************************************************************************************************************************************** */

const removeDuplicateQuestions = async (req, res) => {};
