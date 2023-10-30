const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'authorId',
});

Post.hasMany(Comment, {
    foreignKey: 'postId', // Name of the foreign key in the Comment model
});

Comment.belongsTo(Post, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'comment_author', // Define the foreign key column name
});



module.exports = {
    Post,
    User,
    Comment
};