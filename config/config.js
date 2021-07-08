require("dotenv").config();
// file to config MySQL database using Sequelize. we are using a .env file to pass the credentials.
module.exports = {

    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql",
        operatorsAliases: 0,
        apiURL : process.env.API_URL,
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql",
        operatorsAliases: 0,
        apiURL : process.env.API_URL

    },
    production: {
        use_env_variable: "JAWSDB_URL",
        dialect: "mysql"
    }
}