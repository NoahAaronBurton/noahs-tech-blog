//* not concerned with rendering HTML pages; instead, they return data or perform actions based on the request.
router = require('express').Router();
const userRoutes = require('./user-routes');
// const postRoutes = require('./post-routes');

router.use('/users', userRoutes)
// router.use('/posts', postRoutes)

module.exports = router;