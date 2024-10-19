const Comment = require('../models/comment');
const Post = require('../models/post');

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.postId});
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createComment = async (req, res) => {
    const comment = new Comment(req.body);
    try {
        const post = await Post.findById(req.body.postId);
        console.log(post);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await comment.save();
        post.comments.push(comment)
        await post.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getComments, createComment }