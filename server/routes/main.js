import express from 'express';
import { createCourse , getAllCourse, SingleCourse, updateCourse} from '../controllers/courseController.js';

const router = express.Router();
router.post('/courses', createCourse);
router.get('/get-all-courses', getAllCourse);
router.get('/get-single-courses/:courseId', SingleCourse);
router.patch('/update-course/:courseId', updateCourse);

export default router;
