const router = require('express').Router();
// todo: link models

router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;