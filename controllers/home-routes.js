const router = require('express').Router();
// todo: link models

router.get('/', (req, res) => { // todo: serialize data

     // We use map() to iterate over dishData and then add .get({ plain: true }) each object to serialize it. 
     //const dishes = dishData.map((dish) => dish.get({ plain: true }));
     // We render the template, 'all', passing in dishes, a new array of serialized objects.
     //res.render('all', { dishes });
    res.render('home', { layout: 'main'});
});

module.exports = router;