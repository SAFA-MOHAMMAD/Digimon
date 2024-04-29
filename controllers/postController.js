const db=require('../models');
const Post=db.post

const newPost=async(req,res)=>{
        try {
            const post = await db.postInfo.create({
                postTitle: req.body.postTitle,
                postDescription: req.body.postDescription,
                postImage: req.file ? req.file.path : null, // Assuming image is being uploaded and stored locally
                postDate: new Date() // Automatically setting the post date to current date
            });
            res.status(201).send(post);
        } catch (error) {
            console.error("Failed to create post:", error);
            res.status(400).send(error);
    }
};

const deletePost=async(req,res)=>{
    try {
    let id=req.params.id;
    await Post.destroy({where:{idclubPost:id}});
    res.status(200).send('Post is deleted')
}
catch (error) {
    console.error('Error fetching Events:', error);
    res.status(500).send('Internal Server Error');
}
}


const updatePost=async(req,res)=>{
    try {
    let id=req.params.id;
    const post=await Post.update(req.body,{where:{idclubPost:id}});
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
        // Function to chunk the clubs array into subarrays of 3 elements each
    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };
        // Chunk the clubs array
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
    const post=await Post.findOne({where:{idclubPost:id}});
    res.status(200).send(post);
    }
    catch (error) {
        console.error('Error fetching Events:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports={
    newPost,
    deletePost,
    updatePost,
    getAllPosts,
    getOnePost
}
