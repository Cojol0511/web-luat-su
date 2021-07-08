const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Guest model
class Page extends Model {
    // set up method to run on instance data (per user) to check password 
}

// define table columns and configuration
Page.init(
    {
        // id
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        // title
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // content
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // author
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // tag
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // publishied
        publishied: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        // updated
        publishied: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'pages'
    });

module.exports = Page;