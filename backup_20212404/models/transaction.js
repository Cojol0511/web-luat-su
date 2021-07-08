const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class Transaction extends Model {
    // set up method to run on instance data (per user) to check password 
}

// define table columns and configuration
Transaction.init(
  {
    // define an id column
    TransactionID:{
        // use the special Sequelize DataTypes object provide what type of data it is 
        type: DataTypes.INTEGER,
        // equivalent of SQL "NOT NULL"
        // instruct that this is the Primary Key
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        // turn on auto increment
    },
    LawyerID: {
        // use the special Sequelize DataTypes object provide what type of data it is 
        type: DataTypes.STRING(50),
        references: {
          model: 'Lawyer',
          key: 'LawyerID'
        }
        // equivalent of SQL "NOT NULL"
    },
    ClientID: {
      // use the special Sequelize DataTypes object provide what type of data it is 
      type: DataTypes.STRING(50),
      references: {
        model: 'Client',
        key: 'ClientID'
      }
      // equivalent of SQL "NOT NULL"
    },
    Payment: {
        // use the special Sequelize DataTypes object provide what type of data it is 
      type: DataTypes.INTEGER,
        // equivalent of SQL "NOT NULL"
    },
    BankName: {
      type: DataTypes.STRING(50),
    },
    BankAccount:{
      type: DataTypes.STRING(50),
    },
    BankInfo: {
      type: DataTypes.STRING(50),
    },
    Status: {
      type: DataTypes.INTEGER,
    },
    CreatedDateTime: {
      type: "TIMESTAMP",
    },
    UpdatedDateTime: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
    modelName: 'Transaction'
  }
);

module.exports = Transaction;