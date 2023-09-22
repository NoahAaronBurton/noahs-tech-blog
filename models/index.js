const Post = require('./Post');
const User = require('./User');

User.hasMany(Post, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'authorId',
});



module.exports = {
    Post,
    User,
};