const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const postController = require('./controllers/postController')
const commentController = require('./controllers/commentController')

const app = express()

const dbURL = "mongodb://localhost:27017/blog_db";

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(`Connected to blog database`)
    })
    .catch(err => console.error('MongoDB Connection error: ', err))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/posts', postController.getPosts)
app.post('/posts', postController.createPost)

app.get('/posts/:postId/comments', commentController.getComments)
app.post('/posts/:postId/comments', commentController.createComment)
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});

