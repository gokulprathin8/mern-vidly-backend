const express = require('express');
const router = express.Router();

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

router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(req.body);


    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        res.send('The course with the id is not found').send(404);
    }

    const result = validateCourse(req.body);

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

    const result = schema.validate(req.body, schema);

    return result;
}

module.exports = router;