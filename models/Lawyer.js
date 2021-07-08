const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class Lawyer extends Model {
    // set up method to run on instance data (per user) to check password 
}

// define table columns and configuration
Lawyer.init(
  {
    // define an id column
    LawyerID: {
        // use the special Sequelize DataTypes object provide what type of data it is 
        type: DataTypes.STRING(50),
        // equivalent of SQL "NOT NULL"
        // instruct that this is the Primary Key
        primaryKey: true,
        // turn on auto increment
    },
    Avatar:{
      type: DataTypes.STRING(100),
    },
    FirstName: {
      type: DataTypes.STRING(15),
    },
    LastName: {
      type: DataTypes.STRING(15),
    },
    Specialize:{
      type: DataTypes.INTEGER,
    },
    PhoneNumber:{
      type: DataTypes.STRING(11),
    },
      Gender:{
      type: DataTypes.INTEGER,
    },
    DoB:{
      type: DataTypes.STRING(4) ,
    },
    Degree:{
      type: DataTypes.STRING(50),
    },
    DegreeType:{
      type: DataTypes.INTEGER,
    },
    Major:{
      type: DataTypes.INTEGER,
    },
    Street:{
      type: DataTypes.STRING(50),
    },
    District:{
      type: DataTypes.STRING(20),
    },
    Province:{
      type: DataTypes.STRING(20),
    },
    Zipcode:{
      type: DataTypes.STRING(7),
    },
    Schedule:{
      type: DataTypes.STRING(100),
    },
    Fee:{
      type: DataTypes.STRING(10),
    },	
    Rating: {
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
    modelName: 'Lawyer'
  }
);

module.exports = Lawyer;