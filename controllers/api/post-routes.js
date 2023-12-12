const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/helpers/auth');

// Add comment to post
router.post('/:postId', async (req, res) => {
    try {
        // Get the post by its ID
        const postId = req.params.postId;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: 'No Post with this ID.' });
        }

        // Create a new comment
        const commentText = req.body.commentText; // send commentText in the request body

        
        // Check if req.body.currentUser is defined
        let currentUser;



        // Check if req.body.currentUser is defined
        if (req.body.currentUser) {
            currentUser = req.body.currentUser;
            console.log('Using currentUser from request body:', currentUser);
        } else if (req.session.username) {
            currentUser = req.session.username;
            console.log('Using currentUser from session:', currentUser);
        } else {
            // Set a default value if neither is present
            currentUser = 0;
            console.log('Using default currentUser:', currentUser);
        }

        console.log('Final current user:', currentUser);


        
        
        const comment = await Comment.create({
            commentText,
            postId,
            comment_author: currentUser,
        });

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        
        const { title, text } = req.body;
        const newPost = await Post.create({
            title,
            text,
            authorId: req.session.user_id,
        });
        res.status(200).json(newPost);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
