import express from 'express';
import { createCourse , getAllCourse, SingleCourse, updateCourse, deleteCourse} from '../controllers/courseController.js';
import { createProduct ,getAllProduct, getDetailProduct, editProduct, delProduct} from '../controllers/productController.js';
// import { InsertNewUser } from '../controllers/userController.js';
import Users from '../models/Users.js';
import { validateUser } from '../models/Users.js';
import bcrypt from 'bcrypt';
import lodash from 'lodash'
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

//register user

router.post('/insert-user', async(req,res)=>{
    const {error} = validateUser(req.body);

    if(error){
        return res.status(400).send(error.detail[0].message);
    }

    let user = await Users.findOne({email: req.body.email});
    if(user){
        return res.status(400).send('That user already exist!');
    }else{
        const user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        user = new user(lodash.pick(req.body, ['username', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);

        await user.save();
        res.send(lodash.pick(user,['_id','username','email']));
    }
});
export default router;
