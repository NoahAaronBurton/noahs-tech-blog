// const router = require('express').Router();
// const Post = require('../../models/Post');

// router.get('/:postId', async (req,res) => {
//     try{
//         const postId = req.params.postId;
//         const post = await Post.findByPk(postId);

//         if (!post) {
//             res.status(404).json({message: 'No Post with this id...'})
//         }
//         // todo: finish this route to get links to post titles on front end

//         res.render('post', { post });
//     } catch (err) {
//         res.status(500).json({ error: "Internal Server Error" })
//     }
// } );


// module.exports = router;