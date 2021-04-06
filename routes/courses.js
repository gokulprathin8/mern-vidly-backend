const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const Course = new mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255
    }
}));

const courses = [
    {
        id: 1,
        name: 'Course 1'
    },
    {
        id: 2,
        name: 'Course 2'
    },
    {
        id: 3,
        name: 'Course 3'
    }
]

// router.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// });

// router.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });
//
// router.get('/api/courses/:id', (req, res) => {
//    let course = courses.find(c => c.id === parseInt(req.params.id));
//    if (!course) {
//        res.send('The course with the id is not found!').status(404)
//    }
// });

router.get('/', async (req, res) => {
    const courses = await Course.find().sort('name');
    res.send(courses);
});


router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    const course = new Course({
        name: req.body.name
    });
    const result = await course.save();
    res.send(course);
});

router.put('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        res.send('The course with the id is not found').send(404);
    }

    const result = validateCourse(course);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

router.delete('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.send('The course with the id is not found!').send(404);
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course, schema);
}

module.exports = router;