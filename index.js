const express = require('express');

const debug = require('debug')('app:startup');
const config = require('config');
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

const courses = require('./routes/courses');


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled!');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);

app.get('/', (req, res) => {
   res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}`));