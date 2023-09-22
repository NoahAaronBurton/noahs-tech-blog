const router = require('express').Router();
// const User = require('../models/User')
const Post = require('../models/Post')
// todo: link models

router.get('/', async (req, res) => { // todo: serialize data
    try {
        // const userData = await User.findAll();
        const postData = await Post.findAll();
        
        //serialize
        // const users = userData.map((user) => user.get({ plain: true }));
        const posts = postData.map((post) => post.get({ plain: true }));
        
        // console.log(posts);

        res.render('home', { posts });
    } catch (err) {
        console.error('Sequelize Error:', err.name);
        console.error('Error Details:', err);
        res.status(500).json(err);
    }
});

module.exports = router;