import express from 'express';
import { createBulkMCQs, createNewChapter, createNewMCQ, createNewSubject, getAllChaptersBySubjectId, getAllSubjects } from './controllers.js';

const router = express.Router();
router.get('/subjects', getAllSubjects);
router.get('/subjects/:subjectid/chapters', getAllChaptersBySubjectId);

router.post('/subjects', createNewSubject);
router.post('/:subjectid', createNewChapter);
router.post('/:subjectid/:chapterid', createNewMCQ);
router.post('/:subjectid/:chapterid/mcqs', createBulkMCQs);



export default router;