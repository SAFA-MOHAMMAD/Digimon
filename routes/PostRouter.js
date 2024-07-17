const PostControllar=require('../controllers/PostController');
const router=require('express').Router();
const multer=require('multer');
const upload = multer({ dest: 'uploads/' });

//create post route
router.post('/newPost',upload.single('file'),PostControllar.newPost);

//get all route
router.get('/getAllPosts',PostControllar.getAllPosts);
router.get('/getAllNotAprovePosts',PostControllar.getAllNotAprovePosts);

//get one route
router.get('/:id',PostControllar.getOnePost);

router.get('/search/:Date/:ClubName', PostControllar.searchPostsByDateAlleventPages);

//get all posts with same clubname route
router.get('/posts/club/:clubName',PostControllar.getPostsByClubName);
router.get('/search/byname/:key', PostControllar.searchForPost);

router.get('/search/byname/:key/:clubName',PostControllar.searchForPostwithClubName);
//update route
router.put('/:id',upload.single('postImage'),PostControllar.updatePost);
router.put('/approvePost/:id',PostControllar.approvePost);
//update route
router.patch('/:id',upload.single('file'),PostControllar.updatePost);

//delete route
router.delete('/:id',PostControllar.deletePost);

module.exports=router;