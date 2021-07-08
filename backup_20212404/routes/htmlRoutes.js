const router = require("express").Router();
const path = require("path");
const auth = require("../middleware/auth");


// user authorized views - they all use the "auth" middleware
router.get("/", auth, (req, res) => res.sendFile(path.join(__dirname, "../views/dashboard.ejs")));
router.get("/user/page2", auth, (req, res) => res.sendFile(path.join(__dirname, "../views/page2.ejs")));
router.get("/user/profile", auth, (req, res) => res.sendFile(path.join(__dirname, "../views/profile.ejs")));

// login and register forms view
router.get("/admin/login", (req, res) => res.sendFile(path.join(__dirname, "../views/login.ejs")));
router.get("/admin/register", (req, res) => res.sendFile(path.join(__dirname, "../views/register.ejs")));

module.exports = router;