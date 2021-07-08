const router = require("express").Router();
const bcrypt = require('bcrypt');
const axios = require('axios');
const { verifyToken }= require('../../middleware/verifyToken');
const jwt = require("jsonwebtoken");
const constant = require("../../config/config");

const clientController = require("../../controllers/client.controller.js");
const lawyerController = require("../../controllers/lawyer.controller.js");
const adminController = require("../../controllers/admin.controller.js");

let cmnProps = [];
let rank_list = [];
rank_list.push({id: "HT", name: "Thường"});
rank_list.push({id: "HV", name: "Vàng"});
rank_list.push({id: "HB", name: "Bạc"});
rank_list.push({id: "VIP", name: "VIP"});

const api_url = process.env.API_URL || 'http://api.veneris.bitiland.com/api/';


router.use("/client", clientController);

router.use("/admins", adminController);

router.use("/lawyers", lawyerController);

// /admin
router.post("/login", async (req, res) => {

    // passport Authentication using the "Local strategy" inside the "config" folder config/passport.js."
    // passport check the email and password and returns a function passing three arguments (err, info, user)

    if (req.body.UserName === "" || req.body.PasswordHash === ""){
        res.json({
            success: 0,
            message: "Invalid Input" 
        });
    } 

    await axios.post('http://api.veneris.bitiland.com/api/auth/', req.body,{
        "headers": {  
            "content-type": "application/json",  
        },
    })
    .then(function(response) {
        // console.log(response.data.accessToken); 
        const user = jwt.verify(response.data.accessToken, process.env.ACCESS_TOKEN_SECRET);
        //console.log("Access Token" + response.data.accessToken);
        res.cookie('mylawyer', response.data.accessToken, {
            expires: new Date(Date.now() + 999999),
            secure: false, // set to true if your using https
            httpOnly: false,  // The cookie only accessible by the web server
        });
        //res.send('client/index.ejs');

        res.json({
            success: 1,
            message: "Login Successful",
            username: req.body.UserName,
            userID : user.UserID,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
        });
    })
    .catch(function(error) {
        console.log(error);
        res.json({
            success: 0,
            message: "Login Unsuccessful",
        });
    });

});

router.post("/logout", async (req, res) => {

    // passport Authentication using the "Local strategy" inside the "config" folder config/passport.js."
    // passport check the email and password and returns a function passing three arguments (err, info, user)

    // console.log(req.body.refreshtoken);

    if (req.body.refreshToken === ""){
        res.json({
            success: 0,
            message: "Invalid Input" 
        });
    } 

    const deleteURL = 'http://api.veneris.bitiland.com/api/auth/' + req.body.refreshtoken;
    
    // console.log(deleteURL);

    await axios.delete(deleteURL)
    .then(function(response) {
        //console.log("Sucessful");
        //res.send('client/index.ejs');

        /*
        res.json({
            success: 1,
            message: "Logout Successful",
        });
        */
        res.clearCookie('mylawyer');
        // /
        res.json({
            success: 1,
            message: "Logout Successful",
        });

    })
    .catch(function(error) {
        //console.log("Error");
        res.json({
            success: 0,
            message: "Logout Unsuccessful",
        });
    });




});

router.get('/login', verifyToken, function(req, res) {

    if (req.decode){
        res.redirect('/');
    } else {
        res.render('admin/login');
    }
});

// Admin
router.get('/', verifyToken, async function(req, res) {
      

    //console.log(req.message);
    //res.render('admin/index');
    console.log("Here " + req.message);
    
    if (req.decode){

        console.log("Token is " + req.cookies['mylawyer']);

        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        var activity_list =[
            {
                CreatedDateTime: '2021-01-06T22:18:50.000Z',
                ActivityName: 'Người dùng mới',
                ActivityDescription: 'Tên người dùng ABCD'
            },
            {
                CreatedDateTime: '2021-01-06T22:18:50.000Z',
                ActivityName: 'Người dùng cập nhật',
                ActivityDescription: 'Tên người dùng ABCD'
            },
            {
                CreatedDateTime: '2021-01-06T22:18:50.000Z',
                ActivityName: 'Luật sư mới',
                ActivityDescription: 'Tên luật sư ABCD'
            }
        ]

        var transaction_list =[
            {
                CreatedDateTime: '2021-01-06T22:18:50.000Z',
                TransactionID: 'Giao dịch 1',
                Client: 'Client 1',
                Lawyer: 'Lawyer 1',
                Status: 'Đã thanh toán',

            },
            {
                CreatedDateTime: '2021-01-06T22:18:50.000Z',
                TransactionID: 'Giao dịch 2',
                Client: 'Client 2',
                Lawyer: 'Lawyer 2',
                Status: 'Chờ xử lý',

            },
            {
                CreatedDateTime: '2021-01-06T22:18:50.000Z',
                TransactionID: 'Giao dịch 3',
                Client: 'Client 3',
                Lawyer: 'Lawyer 3',
                Status: 'Đã thanh toán',

            }
        ]

        await axios.all([
            axiosInstance.get(api_url + 'client'), 
            axiosInstance.get(api_url + 'lawyer'),
            axiosInstance.get(api_url + 'admin'),
            axiosInstance.get(api_url + 'post'),
        ])
        .then(function(responseArr) {
            console.log(responseArr[0].data);
            console.log(responseArr[1].data);
            console.log(responseArr[2].data);
            console.log(responseArr[3].data);

            res.render('admin/index',{
                guest_list: responseArr[0].data,
                lawyer_list: responseArr[1].data,
                admin_list: responseArr[2].data,
                page_list: '5',
                post_list: responseArr[3].data,
                activity_list: activity_list,
                transaction_list: transaction_list
            });


            //res.send('client/index.ejs');
    
        })
        .catch(function(error) {
            //console.log(error);
            res.json({
                success: 0,
                message: "Login Unsuccessful",
            });
        });

        /*
        await axios.all([
            axiosInstance.get(api_url + 'client'), 
            axiosInstance.get(api_url + 'lawyer'),
            axiosInstance.get(api_url + 'admin'),
          ])
          .then(responseArr  => {
            // Both requests are now complete
            console.log(' Total Client ' + responseArr[0].length());
            console.log(' Total Lawyer ' + responseArr[1].length());
            console.log(' Total Admin ' + responseArr[2].length());
          });
         */
    } else {
        res.redirect('/admin/login');
    }
    /*
    
        // Get list of Guest
        var guest_list = "";
        // Get list of Lawyer

        var lawyer_list = "";

        // Get list of Page
        var page_list = ""

        // Get list of Post
        var post_list = ""

        // get list of common properties
        /*
        retrieveCmnProps();

        req.session.guest_number = guest_list.length.toString();
        req.session.lawyer_number = lawyer_list.length.toString();
        req.session.page_number = page_list.length.toString();
        req.session.post_number = post_list.length.toString();
        req.session.cmnProps = cmnProps;
        */
       
});

router.get('/pages', function(req, res) {
    res.render('admin/pages');
});

router.get('/posts', verifyToken, async function(req, res) {

    if (req.decode){

        console.log("Token is " + req.cookies['mylawyer']);

        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.get(api_url + 'post')
        .then(function(responseArr) {
            console.log(responseArr.data);


            res.render('admin/posts',{
                post_list: responseArr.data
            });
            //res.send('client/index.ejs');
    
        })
        .catch(function(error) {
            console.log(error);
            res.redirect('/admin/login');
        });

        /*
        await axios.all([
            axiosInstance.get(api_url + 'client'), 
            axiosInstance.get(api_url + 'lawyer'),
            axiosInstance.get(api_url + 'admin'),
          ])
          .then(responseArr  => {
            // Both requests are now complete
            console.log(' Total Client ' + responseArr[0].length());
            console.log(' Total Lawyer ' + responseArr[1].length());
            console.log(' Total Admin ' + responseArr[2].length());
          });
         */
    } else {
        res.redirect('/admin/login');
    }
});

router.get('/guests', verifyToken, async function (req, res) {

    if (req.decode){

        console.log("Token is " + req.cookies['mylawyer']);

        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.get(api_url + 'client')
        .then(function(responseArr) {
            console.log(responseArr.data);

            res.render('admin/guests',{
                guest_list: responseArr.data,
                rank_list: rank_list
            });
            //res.send('client/index.ejs');
    
        })
        .catch(function(error) {
            console.log(error);
            res.redirect('/admin/login');
        });

        /*
        await axios.all([
            axiosInstance.get(api_url + 'client'), 
            axiosInstance.get(api_url + 'lawyer'),
            axiosInstance.get(api_url + 'admin'),
          ])
          .then(responseArr  => {
            // Both requests are now complete
            console.log(' Total Client ' + responseArr[0].length());
            console.log(' Total Lawyer ' + responseArr[1].length());
            console.log(' Total Admin ' + responseArr[2].length());
          });
         */
    } else {
        res.redirect('/admin/login');
    }
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

router.get('/lawyers', verifyToken, async function(req, res) {
    if (req.decode){

        // console.log("Token is " + req.cookies['mylawyer']);
        var offset = 0;
        var limit = 5;

        if (req.query.offset){
            //console.log(req.query.offset);
            offset = req.query.offset;
        }

        if (req.query.limit){
            limit = req.query.limit;
        }


        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

       // await axiosInstance.get(api_url + 'lawyer/findAndCountAll?offset=' + offset + '&limit=' + limit)
        await axiosInstance.get(api_url + 'lawyer')
        .then(function(responseArr) {
            console.log(responseArr.data);


            res.render('admin/lawyers',{
                lawyer_list: responseArr.data,
                lawyer_count:  responseArr.data.length,
                lawyer_page: Math.floor(responseArr.data.count/limit) + 1,
                offset: parseInt(offset),
                limit : parseInt(limit)
            });
            //res.send('client/index.ejs');
    
        })
        .catch(function(error) {
            console.log(error);
            res.redirect('/admin/login');
        });

        /*
        await axios.all([
            axiosInstance.get(api_url + 'client'), 
            axiosInstance.get(api_url + 'lawyer'),
            axiosInstance.get(api_url + 'admin'),
          ])
          .then(responseArr  => {
            // Both requests are now complete
            console.log(' Total Client ' + responseArr[0].length());
            console.log(' Total Lawyer ' + responseArr[1].length());
            console.log(' Total Admin ' + responseArr[2].length());
          });
         */
    } else {
        res.redirect('/admin/login');
    }
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

router.get('/admins', verifyToken, async function (req, res) {

    if (req.decode){

        //console.log("Token is " + req.cookies['mylawyer']);
        var offset = 0;
        var limit = 5;
        console.log("Offset Query is" + req.query.offset);
        if (req.query.offset){
            //console.log(req.query.offset);
            offset = req.query.offset;
        }

        if (req.query.limit){
            limit = req.query.limit;
        }

        console.log("Offset is" + offset);

        console.log("Limit is" + limit);

        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        //await axiosInstance.get(api_url + 'admin/findAndCountAll?offset=' + offset + '&limit=' + limit)
        await axiosInstance.get(api_url + 'admin')
        .then(function(responseArr) {
            console.log(responseArr.data);

            console.log( Math.floor(responseArr.data.length/limit) + 1);

            res.render('admin/admins',{
                admin_list: responseArr.data,
                admin_count:  responseArr.data.length,
                admin_page: Math.floor(responseArr.data.length/limit) + 1,
                offset: parseInt(offset),
                limit : parseInt(limit)
            });
            //res.send('client/index.ejs');
    
        })
        .catch(function(error) {
            console.log(error.data);
            res.redirect('/admin/login');
        });

        /*
        await axios.all([
            axiosInstance.get(api_url + 'client'), 
            axiosInstance.get(api_url + 'lawyer'),
            axiosInstance.get(api_url + 'admin'),
          ])
          .then(responseArr  => {
            // Both requests are now complete
            console.log(' Total Client ' + responseArr[0].length());
            console.log(' Total Lawyer ' + responseArr[1].length());
            console.log(' Total Admin ' + responseArr[2].length());
          });
         */
    } else {
        res.redirect('/admin/login');
    }
});

router.post("/register/addAdmin", verifyToken, async (req, res) => {

    if (req.decode){

        if (req.body.UserName === "" || req.body.PasswordHash === "" || req.body.Email === ""){
            return res.json({
                success: 0,
                message: "Invalid Input" 
            });
        } 

        const axiosInstance = axios.create({
            headers: {
                "content-type": "application/json",
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.post('http://api.veneris.bitiland.com/api/admin/', req.body)
        .then(function(response) {
            console.log("Registration Successful"); 
            //res.send('client/index.ejs');
            res.json({
                success: 1,
                message: "Registration Successful",
            });
        })
        .catch(function(error) {
            console.log(error);
            res.json({
                success: 0,
                message: "Registration Unsuccessful",
            });
        });
    } else {
        res.redirect('/admin/login');
    }
});

router.post("/register/addClient", verifyToken, async (req, res) => {

    if (req.decode){

        if (req.body.UserName === "" || req.body.PasswordHash === "" || req.body.Email === ""){
            return res.json({
                success: 0,
                message: "Invalid Input" 
            });
        } 

        const axiosInstance = axios.create({
            headers: {
                "content-type": "application/json",
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.post('http://api.veneris.bitiland.com/api/client/', req.body)
        .then(function(response) {
            console.log("Registration Successful"); 
            //res.send('client/index.ejs');
            res.json({
                success: 1,
                message: "Registration Successful",
            });
        })
        .catch(function(error) {
            console.log(error);
            res.json({
                success: 0,
                message: "Registration Unsuccessful",
            });
        });
    } else {
        res.redirect('/admin/login');
    }
});

router.post("/register/addLawyer", verifyToken, async (req, res) => {

    if (req.decode){

        if (req.body.UserName === "" || req.body.PasswordHash === "" || req.body.Email === ""){
            return res.json({
                success: 0,
                message: "Invalid Input" 
            });
        } 

        const axiosInstance = axios.create({
            headers: {
                "content-type": "application/json",
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.post('http://api.veneris.bitiland.com/api/lawyer/', req.body)
        .then(function(response) {
            console.log("Registration Successful"); 
            //res.send('client/index.ejs');
            res.json({
                success: 1,
                message: "Registration Successful",
            });
        })
        .catch(function(error) {
            console.log(error);
            res.json({
                success: 0,
                message: "Registration Unsuccessful",
            });
        });
    } else {
        res.redirect('/admin/login');
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