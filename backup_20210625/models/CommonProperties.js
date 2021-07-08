const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Guest model
class CommonProperties extends Model {
    // set up method to run on instance data (per user) to check password 
}

// define table columns and configuration
CommonProperties.init(
    {
        // id
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        // name
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // kind
        kind: {
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
        modelName: 'common_properties'
    });

module.exports = CommonProperties;