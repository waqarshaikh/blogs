const Post = require('../models/post');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('comments')
        res.json(posts);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const createPost = async (req, res) => {
    const post = new Post(req.body);
    try {
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {getPosts, createPost}