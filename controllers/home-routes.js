const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/helpers/auth');
// const bodyParser


router.get('/', withAuth, async (req, res) => { 
    try {
        const postData = await Post.findAll({ // todo: edit this?
            include: [
              {
                attributes: { exclude: ['password'] },
                order: [['name', 'ASC']],
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
  // redirect to home if logged in already
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }



  res.render('login');
})


module.exports = router;