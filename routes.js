import express from "express";
import {
  createBulkMCQs,
  createNewChapter,
  createNewDepartment,
  createNewMCQ,
  createNewSubject,
  deleteChapterById,
  deleteDepartmentById,
  deleteMCQSBySubjectId,
  deleteSubjectById,
  getAllChaptersBySubjectId,
  getAllDepartments,
  getAllMCQs,
  getAllSubjects,
  getAllSubjectsByDepartmentId,
} from "./controllers.js";

const router = express.Router();

router.post("/departments", createNewDepartment);
router.get("/departments", getAllDepartments);
router.delete("/departments/:departmentid", deleteDepartmentById);

//subjects:
router.post("/departments/:departmentid/subjects", createNewSubject );
router.get("/departments/:departmentid/subjects", getAllSubjectsByDepartmentId );
router.get('/subjects',getAllSubjects);
router.delete("/subjects/:subjectid", deleteSubjectById);

//chapters:
router.post("/subjects/:subjectid/chapters", createNewChapter);
router.get("/subjects/:subjectid/chapters", getAllChaptersBySubjectId);
router.delete("/chapters/:chapterid",deleteChapterById);

//mcqs:
router.get("/mcqs",getAllMCQs);
router.post(":departmentid/:subjectid/:chapterid/mcqs", createNewMCQ);
router.delete("/:subjectid/mcqs", deleteMCQSBySubjectId);

//

export default router;
