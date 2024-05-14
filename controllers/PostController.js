const db=require('../models');
const Post=db.post
const multer = require('multer');


const newPost=async(req,res)=>{
        try {
            let info={
                postTitle: req.body.postTitle,
                clubName:req.body.clubName,
                postDescription: req.body.postDescription,
                postImage: req.file ? req.file.path : null,
                postDate: new Date(),
                PostApproval:req.body.PostApproval
            }
            const post=await Post.create(info);
            res.status(200).send(post);
            console.log(post);
        } catch (error) {
            console.error("Failed to create post:", error);
            res.status(400).send(error);
    }
};



const deletePost=async(req,res)=>{
    try {
    let id=req.params.id;
    await Post.destroy({where:{postID:id}});
    res.status(200).send('Post is deleted')
}
catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
}
}



const updatePost=async(req,res)=>{
    try {
    let id=req.params.id;
    const post=await Post.findOne({where:{postID:id}});
    let info={
        postTitle: req.body.postTitle,
        clubName:req.body.clubName,
        postDescription: req.body.postDescription,
        postImage: req.file ? req.file.path : post.postImage,
        postDate: new Date(),
        PostApproval:req.body.PostApproval
    }
    await Post.update(info,{where:{postID:id}});
    const updatedPost = await Post.findOne({ where: { postID: id } });

    res.status(200).send(updatedPost);  
}
catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
}
}



const getAllPosts=async(req,res)=>{
    try {
        // Fetch all Posts from the database
    const post = await Post.findAll({}); 
        // Function to chunk the posts array into subarrays of 3 elements each
    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };
        // Chunk the postss array
    const chunkedPosts = chunkArray(post, 3);
        // Send the chunked array as the response
    res.json(chunkedPosts);
    } catch (error) {
    console.error('Error fetching Posts:', error);
    res.status(500).send('Internal Server Error');
    }
}


const getOnePost=async(req,res)=>{
    try {
    let id=req.params.id
    const post=await Post.findOne({where:{postID:id}});
    res.status(200).send(post);
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Function to fetch posts by club name
const getPostsByClubName = async (req, res) => {
    try {
        // Get the club name from the URL parameters
        const clubName = req.params.clubName;
        // Fetch posts associated with the specified club name
        const posts = await Post.findAll({
            where: {
                clubName: clubName,
                PostApproval:true,
            },
        });
        // Send the posts as the response
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts by club Name:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllNotAprovePosts= async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                PostApproval: false,
            },
        });
        // Send the posts as the response
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching not aproved posts:', error);
        res.status(500).send('Internal Server Error');
    }
};



const approvePost=async(req,res)=>{
    try {
        // Get the post ID and the approval status from the request
        const id = req.params.id; // post ID from URL parameters
        const { PostApproval } = req.body; // Approval status from request body

        // Find the post by its ID
        const post = await Post.findOne({ where: { postID: id } });

        if (!post) {
            // If the post is not found, respond with a 404 Not Found error
            return res.status(404).json({ error: 'post not found' });
        }

        // Update the post's approval status
        post.PostApproval = PostApproval;

        // Save the changes to the database
        await post.save();

        // Respond with a success message
        res.status(200).json({ message: 'post approval status updated successfully', post });
    } catch (error) {
        console.error('Error updating post approval:', error);
        // Respond with a 500 Internal Server Error message
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports={
    newPost,
    deletePost,
    updatePost,
    getAllPosts,
    approvePost,
    getAllNotAprovePosts,
    getOnePost,
    getPostsByClubName
}
