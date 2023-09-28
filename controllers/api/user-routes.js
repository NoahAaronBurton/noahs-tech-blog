const router = require('express').Router();
const {User} = require('../../models');

router.post('/login', async (req, res) => {
    try {
        console.log('POST request to /login received')
        //find user in db
        const dbUser = await User.findOne({where: { username: req.body.username }});

        if (!dbUser) {
            return res.status(400).json({ message: "Incorrect username or Password" }); 
        };
        //verify password 
        const correctPassword = await dbUser.checkPassword(req.body.password);
        if (!correctPassword) {
            return res.status(400).json({ message: "Incorrect username or Password" });
        };
        
        req.session.save(() => {
            req.session.username = dbUser.id;
            req.session.logged_in = true;
            res.json({user : dbUser, message: 'Logged in!'})
        })
    } catch (err) {
        console.error('Error in /login:', err);
        res.status(500).json({ error: "Internal Server Error" })
    }
})
module.exports = router;