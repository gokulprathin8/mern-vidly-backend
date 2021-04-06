const mongoose = require('mongoose');
const Joi = require('joi');

const Course = mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255
    }
}));

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate({course}, schema);
}

exports.Course = Course;
exports.validateCourse = validateCourse;