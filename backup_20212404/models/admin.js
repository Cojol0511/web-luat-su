const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class Admin extends Model {
    // set up method to run on instance data (per user) to check password 
}

// define table columns and configuration
Admin.init(
  {
    // define an id column
    AdminID: {
        // use the special Sequelize DataTypes object provide what type of data it is 
        type: DataTypes.STRING,
        // equivalent of SQL "NOT NULL"
        // instruct that this is the Primary Key
        primaryKey: true,
        // turn on auto increment
    },
	FirstName: {
		type: DataTypes.STRING,
	},
	LastName: {
		type: DataTypes.STRING,
	},
	CreatedDateTime: {
		type: "TIMESTAMP",
	},
	UpdatedDateTime: {
		type: "TIMESTAMP",
	},
  },
  {
    hooks: {
    },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    engine: 'MYISAM',
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    //underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'Admin'
  }
);

module.exports = Admin;