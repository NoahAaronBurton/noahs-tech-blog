//* Overall, this file sets up the data model for dishes and provides the necessary configuration to interact with a database using Sequelize.

//* In the context of MVC, it primarily falls under the Model component, responsible for managing data-related logic and operations. 

const { Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require ('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
} //todo: add checkpassword method

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
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, //todo: add hooks for bcrypt
    {
        hooks: {
          beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;