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
                postDate: new Date()
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
    let name=req.params.name;
    await Post.destroy({where:{postname:name}});
    res.status(200).send('Post is deleted')
}
catch (error) {
    console.error('Error fetching Events:', error);
    res.status(500).send('Internal Server Error');
}
}



const updatePost=async(req,res)=>{
    try {
    let name=req.params.name;
    const post=await Post.update(req.body,{where:{postname:name}});
    res.status(200).send(post);
}
catch (error) {
    console.error('Error fetching Events:', error);
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
        console.error('Error fetching Events:', error);
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
            },
        });
        // Send the posts as the response
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching events by club Name:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports={
    newPost,
    deletePost,
    updatePost,
    getAllPosts,
    getOnePost,
    getPostsByClubName
}
