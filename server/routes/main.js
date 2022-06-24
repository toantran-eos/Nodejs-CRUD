import express from 'express';
import { createCourse , getAllCourse, SingleCourse, updateCourse, deleteCourse} from '../controllers/courseController.js';
import { createProduct ,getAllProduct, getDetailProduct, editProduct, delProduct} from '../controllers/productController.js';
const router = express.Router();
//course router
router.post('/courses', createCourse);
router.get('/get-all-courses', getAllCourse);
router.get('/get-single-courses/:courseId', SingleCourse);
router.patch('/update-course/:courseId', updateCourse);
router.delete('/delete-course/:courseId', deleteCourse);

//product router
router.post('/product', createProduct);
router.get('/get-all-product',getAllProduct);
router.get('/get-once-product/:prod_id',getDetailProduct);
router.patch('/edit-product/:prod_id',editProduct);
router.delete('/delete-product/:prod_id',delProduct);
export default router;
