const express = require('express');
const bodyParser = require("body-parser");
const { createPost } = require('./controllers/post.controller');
const { getUsersWithPostCount } = require('./controllers/user.controller');

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())  //to handle json data

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/posts', createPost);
app.get('/users', getUsersWithPostCount);

module.exports = app;