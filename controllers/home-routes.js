const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/helpers/auth');
// const bodyParser


router.get('/', async (req, res) => { 
    try {
        const postData = await Post.findAll({
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          });
      
        const posts = postData.map((post) => post.get({ plain: true }));
      
        //   console.log(posts);
      
          res.render('home', { 
            posts,
            logged_in: req.session.logged_in,
           }); 

    } catch (err) { // chat GPT wrote this catch block
        console.error('Sequelize Error:', err.name);
        console.error('Error Details:', err);
        res.status(500).json(err);
    }
});

//! post without an S
//todo: get post comments
router.get('/post/:postId', async (req,res) => {
  try{
    const postData = await Post.findByPk(req.params.postId, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
            }
          ]
        },
      ],
    });
    console.log(postData);
    if (!postData) {
      res.status(404).json({message: 'bad request for post id...'})
      return;
    }
    const post = postData.get({ plain: true});
    console.log('this is sent to the front end: \n');
    console.log(post);

    res.render('post', { layout: 'main', post });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
} );



router.get('/login', async (req,res) => {
  try {// redirect to home if logged in already
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }

    res.render('login');
  } catch (err) {
    console.error('Sequelize Error:', err.name);
    console.error('Error Details:', err);
    res.status(500).json(err);
  }
  
});

router.get('/sign-up', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }

    res.render('sign-up');
  } catch (err) {
    res.status(500).json(err);
  }});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
          id: req.session.user_id,
      },
      attributes: { exclude: ['password'] },
      include: [{
          model: Post,
          attributes: ['id', 'title', 'text', 'created_at'],
      }],
  });

  const user = userData.get({ plain: true });

  res.render('profile', {
      ...user,
      logged_in: true
  });
  } catch (err) {
    console.error('Sequelize Error:', err.name);
    console.error('Error Details:', err);
    res.status(500).json(err);
  }
});
  

module.exports = router;