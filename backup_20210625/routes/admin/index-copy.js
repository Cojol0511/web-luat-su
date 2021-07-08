const router = require("express").Router();
const path = require("path");
const moment = require("moment");
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
const passport = require("../../config/passport");
const auth = require("../../middleware/auth");
const { Administrator, CommonProperties, Guest, Lawyer, Page, Post} = require("../../models");
const { report, prependOnceListener } = require("process");
const { Op } = require('sequelize');
let cmnProps = [];

// /admin
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // check if there are any empty fields
    if (email === "" || password === "") return res.status(400).json({ message: "Vui lòng điền đầy đủ các thông tin" });

    // passport Authentication using the "Local strategy" inside the "config" folder config/passport.js."
    // passport check the email and password and returns a function passing three arguments (err, info, user)
    passport.authenticate('local', (err, user, info) => {
        if (err) throw (err);
        // if can't find email, or if password is incorrect, send error message (info)
        if (!user) res.status(404).json(info);
        // Log user
        req.logIn(user, function (err) {
            if (err) throw (err);
            return res.json(user);
        });
    })(req, res);
});

router.get('/login', function(req, res) {
    res.render('admin/login');
});

// Route: /admin/logout
router.get("/logout", (req, res) => {
    // Log out user
    req.logout();
    // redirect to main page
    res.redirect('/admin/login');
});

// admin
router.get('/', auth, async function(req, res) {
    // Get list of Guest
    var guest_list = await Guest.findAll({
        order: [['id','DESC']]
    });

    // Get list of Lawyer
    var lawyer_list = await Lawyer.findAll({
        order: [['id','DESC']]
    });

    // Get list of Page
    var page_list = await Page.findAll({});

    // Get list of Post
    var post_list = await Post.findAll({});

    // get list of common properties
    retrieveCmnProps();

    req.session.guest_number = guest_list.length.toString();
    req.session.lawyer_number = lawyer_list.length.toString();
    req.session.page_number = page_list.length.toString();
    req.session.post_number = post_list.length.toString();
    req.session.cmnProps = cmnProps;

    res.render('admin/index', {
        guest_list: guest_list,
        lawyer_list: lawyer_list,
        page_list: page_list,
        post_list: post_list
    });
});

router.get('/pages', function(req, res) {
    res.render('admin/pages');
});

router.get('/posts', function(req, res) {
    res.render('admin/posts');
});

router.get('/guests', async function (req, res) {
    var guest_list = await Guest.findAll({
        order: [["fullname", "ASC"]]
    });
    if (guest_list === null) {
        console.log("not found");
        guest_list = [];
    }

    const lawyer_list = await Lawyer.findAll({});
    retrieveCmnProps();

    guest_list.map((guest) => {
        // name of sex
        guest.sex = getCmnProName(guest.sex);

        // name of marital status
        guest.marital_status = getCmnProName(guest.marital_status);

        // name of rank
        guest.rank = getCmnProName(guest.rank);

        // name of lawyer
        guest.lawyer_name = isNullOrEmpty(guest.lawyer_id) ? '' : guest.lawyer_id
            .split(',')
            .map(id => lawyer_list.some(lawyer => lawyer.id == id) ?
                lawyer_list.find(lawyer => lawyer.id == id).fullname : null)
            .filter(fullname => !isNullOrEmpty(fullname))
            .join();
    });

    res.render('admin/guests', {
        guest_list: guest_list,
        rank_types: getCmnPropsByKind('Guest Rank'),
        sex_types: getCmnPropsByKind('Guest Sex')
    });
});

router.get('/guests/edit-guest/:guest_id', async function(req, res) {
    retrieveCmnProps();
    var lawyer_list = await Lawyer.findAll({});
    var guest = await Guest.findOne({ where: { id: req.params.guest_id } });
    guest.lawyer_name = guest.lawyer_id.split(',').map(id => id = getLawyerName(id, lawyer_list)).join();

    res.render('admin/edit-guest', {
        guest: guest,

        marital_status: getCmnPropsByKind('Guest Marial Status'),
        sex_types: getCmnPropsByKind('Guest Sex'),
        rank_types: getCmnPropsByKind('Guest Rank'),
        lawyers: await Lawyer.findAll({})
    });
});

router.get('/lawyers', async function(req, res) {
    var lawyer_list = await Lawyer.findAll({});
    if (lawyer_list === null) {
        console.log("not found");
        lawyer_list = [];
    }

    retrieveCmnProps();
    lawyer_list.forEach(lawyer => {
        lawyer.practice_area_name = lawyer.practice_area_id.split(',').map(id => getCmnProName(id)).join();
    });

    res.render('admin/lawyers', { lawyer_list: lawyer_list });
});

router.get('/lawyers/edit-lawyer/:lawyer_id', async function (req, res) {
    retrieveCmnProps();
    var lawyer_info = await Lawyer.findOne({ where: { id: req.params.lawyer_id } });

    res.render('admin/edit-lawyer', {
        lawyer: lawyer_info,
        guests: await Guest.findAll({ where: {
            id: { [Op.in]: [lawyer_info.guest_id.split(',')] }
        }}),

        pratice_area: getCmnPropsByKind('Pratice Area'),
        cases: getCmnPropsByKind('Guest Sex')
    });
});

router.get('/register', function(req, res) {
    res.render('admin/register');
});

router.post("/register", async (req, res) => {

    try {
        const { email, password, passwordTwo } = req.body;
        // check if there are any empty fields
        if (!email || !password || !passwordTwo) return res.status(400).json({ message: "Please fill all fields" });
        // check for correct email format
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) return res.status(400).json({ message: "Invalid email format" });
        // check for password length - al least 6 characters
        if (password.length < 6) return res.status(400).json({ message: "Password needs to be at least 6 characters" });
        // for both passwords to be the same
        if (password !== passwordTwo) return res.status(400).json({ message: "Passwords don't match" });
        // check database for a user with the email entered in the form
        const user = await Administrator.findOne({ where: { email: email } })

        if (user) {
            // if user already in database, send error
            res.status(400).json({ message: "User already Registered. Please, LogIn" })
        } else {
            // Using bcrypt to hash the password
            var number = (await Administrator.count({}) + 1).toString();
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) throw err;
                    // save hashed password into dtaa base
                    Administrator.create({
                        id: "AD" + number,
                        email: email,
                        password: hash,
                        fullname: "Admin " + number,
                        role: "R0001"
                    })
                        .then(data => {
                            const { id, email } = data;
                            res.json({
                                id,
                                email
                            });
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    } catch (err) {
        if (err) res.status(500).json({ message: "Internal Error" })
    }

});

router.get('/page/edit-page', async function(req, res) {
    res.render('admin/edit-page');
});

function getLawyerName(id, lawyer_list) {
    if(lawyer_list == null || lawyer_list.length == 0) {
        return "";
    }

    var lawyer_objective = lawyer_list.find(lawyer => lawyer.id == id);
    return lawyer_objective == null ? "" : lawyer_objective.fullname;
}

function getCmnProName(cmnId) {
    var prop = cmnProps.find(p => p.id == cmnId);
    return prop != null ? prop.name : '';
}

async function retrieveCmnProps() {
    if (cmnProps.length == 0) {
        const cmnProList = await CommonProperties.findAll({});
        for (cmnProp of cmnProList) {
            cmnProps.push({ id: cmnProp.id, name: cmnProp.name, kind: cmnProp.kind });
        }
    }
}

function getCmnPropsByKind(kind) {
    return cmnProps.filter(pro => pro.kind == kind);
}

function isNullOrEmpty(str) {
    return str == null || str == '';
}

module.exports = router;