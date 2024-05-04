const db = require('../models');
const Post = db.post;

const newPost = async (req, res) => {
    try {
        let info = {
            postTitle: req.body.postTitle,
            postDescription: req.body.postDescription,
            postImage: req.file ? req.file.path : null, // Assuming image is being uploaded and stored locally
            postDate: new Date()
        };
        const post = await Post.create(info);
        res.status(201).send(post); // Use 201 for resource created successfully
        console.log(post);
    } catch (error) {
        console.error("Failed to create post:", error);
        res.status(400).send(error);
    }
};

const deletePost = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedPost = await Post.destroy({ where: { postID: id } });
        if (deletedPost === 1) {
            res.status(200).send('Post deleted successfully');
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error('Error deleting Post:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updatePost = async (req, res) => {
    try {
        let id = req.params.id;
        const [updated] = await Post.update(req.body, { where: { postID: id } });
        if (updated === 1) {
            res.status(200).send('Post updated successfully');
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error('Error updating Post:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({});
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching Posts:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getOnePost = async (req, res) => {
    try {
        let id = req.params.id;
        const post = await Post.findOne({ where: { postID: id } });
        if (!post) {
            res.status(404).send('Post not found');
        } else {
            res.status(200).json(post);
        }
    } catch (error) {
        console.error('Error fetching Post:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    newPost,
    deletePost,
    updatePost,
    getAllPosts,
    getOnePost
};
