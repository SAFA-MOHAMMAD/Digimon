const PostControllar=require('../controllers/postController');
const router=require('express').Router();

router.post('/newPost',PostControllar.newPost);

router.get('/getAllPosts',PostControllar.getAllPosts)

router.put('/:id',PostControllar.updatePost);

router.delete('/:id',PostControllar.deletePost);

module.exports=router;