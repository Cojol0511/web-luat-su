const express = require("express");
//const db = require("./models");
const session = require("express-session");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const sequelize = require('./config/connection');

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// import routes
const routes = require("./routes");

// set up PORT
const PORT = process.env.WEB_PORT;

// use Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// set up express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// use passport middleware
//app.use(passport.initialize());
//app.use(passport.session());

// use routes
app.use(routes)



// set the view engine to ejs
app.set('view engine', 'ejs');

// connect to database and start server
// db.sequelize.sync().then(() => {
//     app.listen(PORT, () => {
//         console.log(`app listening on: http://localhost:${PORT}`);

//     })
// })

/*
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`app listening on: http://localhost:${PORT}`));
});
*/

app.listen(PORT, () => {
    console.log(`app listening on: http://localhost:${PORT}`);

})
