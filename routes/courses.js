const { Course, validateCourse } = require('../models/courses');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404).send('No Course found!')
    }

    res.send(course);
});

router.get('/', async (req, res) => {
    const courses = await Course.find().sort('name');
    res.send(courses);
});


router.post('/', async (req, res) => {
    
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    let { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    const course = new Course({
        name: req.body.name
    });

    const result = await course.save();
    res.send(result);
    
});

router.put('/:id', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error);
        return;
    }

    const course = await Course.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {new: true});

    if (!course) {
        res.send('The course with the id is not found').send(404);
    }
    res.send(course);

});

router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) {
        return res.status(404).send('The course for deleting is not found!');
    }
    res.send(course);
});



module.exports = router;