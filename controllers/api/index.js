//* not concerned with rendering HTML pages; instead, they return data or perform actions based on the request.
router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/users', userRoutes)

module.exports = router;