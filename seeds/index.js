const sequelize = require('../config/connection');
const User = require('../models/User');
const userData = require('./user-seeds.json');
const Post = require('../models/Post');
const postData = require('./post-seeds.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    await User.bulkCreate(userData, {
        individualHooks: true, // this activates the bcrypt hooks when seeds are run
        returning: true,
    });

    await Post.bulkCreate(postData, {
        returning: true,
    })

    process.exit(0);
};

seedDatabase();