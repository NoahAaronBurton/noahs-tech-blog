//* Overall, this file sets up the data model for dishes and provides the necessary configuration to interact with a database using Sequelize.

//* In the context of MVC, it primarily falls under the Model component, responsible for managing data-related logic and operations. 

const { Model, Datatypes} = require('sequelize');
const sequelize = require ('../config/connection'); // todo: code this file

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;