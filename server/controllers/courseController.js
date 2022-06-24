import mongoose from 'mongoose';
import Course from '../models/course.js';

//create new course
export function createCourse(req,res){
    const course = new Course({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,

    });
    
    return course
    .save()
        .then((newCourse) => {
            return res.status(201).json({
                success: true,
                message: "Create new course successful !",
                course: newCourse,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });

}
export function getAllCourse(req,res){
    Course.find()
    .select('_id title description')
    .then((allCourse)=>{
        return res.status(200).json({
            success: true,
            message: 'A list of Course',
            Course: allCourse
        });

    })
    .catch((err)=>{
        return res.status(500).json({
            success:false,
            message: 'Server Error',
            error: err.message
        });
    })
}

export function SingleCourse(req,res){
    const id = req.params.courseId;
    Course.findById(id)
    .then((getSingleCourse)=>{
        return res.status(200).json({
            success: true,
            message : `This is detail of course ${getSingleCourse.title}`,
            Course: getSingleCourse
        });
    })
    .catch((err)=> {
        return res.status(500).json({
            success:false,
            message: 'Server error',
            error: err.message
        });
    })
}

export function updateCourse(req,res){
    const id = req.params.courseId;
    const updateObj = req.body;
    Course.update({_id:id}, {$set:updateObj})
    .exec()
    .then(()=>{
        return res.status(201).json({
            success:true,
            message: 'Course is updated',
            Course: updateObj
        });
    })
    .catch((err)=>{
        return res.status(500).json({
            success:false,
            message: 'server error',
            error: err.message
        });
    })
}