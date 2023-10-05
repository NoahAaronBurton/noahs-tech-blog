const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/helpers/auth');
// const bodyParser


router.get('/', withAuth, async (req, res) => { 
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


module.exports = router;