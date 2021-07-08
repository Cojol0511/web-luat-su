const router = require("express").Router();
const bcrypt = require('bcrypt');
const axios = require('axios');
const { verifyToken, checkAuth, checkRole, adminAuth }= require('../../middleware/verifyToken');
const jwt = require("jsonwebtoken");
const Constant = require('../../config/const');

//const clientController = require("../../controllers/client.controller.js");
//const lawyerController = require("../../controllers/lawyer.controller.js");
//const adminController = require("../../controllers/admin.controller.js");

const mimeTypes = require("mime-types");
const multer = require("multer");
const fs = require("fs");
const { resolve } = require("path");
const publicPath = '/public/admin';
const uploadFolder = '/uploads/posts/';
const uploadDir = process.cwd() + publicPath + uploadFolder;
const upload = multer({ dest: uploadDir});


let cmnProps = [];
let rank_list = [];
rank_list.push({id: "HT", name: "Thường"});
rank_list.push({id: "HV", name: "Vàng"});
rank_list.push({id: "HB", name: "Bạc"});
rank_list.push({id: "VIP", name: "VIP"});

const api_url = process.env.API_URL || 'http://api.venerispro.bitiland.com/api/';

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

router.post('/sendMail', function (req, res) {
    var mailOption = {
        from: req.body.sender,
        to: req.body.receiver,
        subject: req.body.subject,
        text: req.body.content
    };
    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

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
        
        if (response.data.userInfo.Role !== "admin"){
            res.json({
                success: 0,
                message: "You must be admin",
            });
        }

        res.cookie('mylawyer', response.data.accessToken, {
            expires: new Date(Date.now() + 999999),
            secure: false, // set to true if your using https
            httpOnly: false,  // The cookie only accessible by the web server
        });
        //res.send('client/index.ejs');

        res.json({
            success: 1,
            message: "Login Successful",
            username: response.data.userInfo.UserName,
            userID : response.data.userInfo.UserID,
            email: response.data.userInfo.Email,
            role: response.data.userInfo.Role,
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

    const deleteURL = api_url + 'auth/' + req.body.refreshtoken;
    
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
router.get('/', adminAuth, async function(req, res) {
      

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
            axiosInstance.get(api_url + 'booking')
        ])
        .then(function(responseArr) {
            console.log(responseArr[0].data);
            console.log(responseArr[1].data);
            console.log(responseArr[2].data);
            console.log(responseArr[3].data);
            console.log(responseArr[4].data);


            res.render('admin/index',{
                guest_list: responseArr[0].data,
                lawyer_list: responseArr[1].data,
                admin_list: responseArr[2].data,
                transaction_list: responseArr[4].data,
                page_list: '5',
                post_list: responseArr[3].data,
                activity_list: activity_list,
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

router.post('/changePassword', verifyToken, async (req, res) => {
    if (req.decode) {

        console.log(req.body);

        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.post(api_url + 'auth/changepassword', req.body)
        .then(updateRes => {
            console.log("Update password successfully");
            console.log(updateRes)
            res.json({
                success: 1,
                message: "Update password successfully"
            });
        })
        .catch(errorRes => {
            console.log(errorRes);
            res.json({
                success: 0,
                message: "Update password unsuccessfully"
            });
        });
    } else {

        res.redirect('client/index');

    }
});

router.get('/admin-dashboard', verifyToken, async (req, res) => {
    if (req.decode){

        // console.log("Token is " + req.cookies['mylawyer']);

        // const axiosInstance = axios.create({
        //     headers: {
        //         Authorization: `token ${req.cookies['mylawyer']}`
        //     }
        // });

        res.render('admin/admin-dashboard', {
        });
    } else {
        res.redirect('/admin/login');
    }
});

router.get('/change-password', verifyToken, async (req, res) => {
    if (req.decode){
        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        res.render('admin/admin-changepw', {
        });
    } else {
        res.redirect('/admin/login');
    }
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
    } else {
        res.redirect('/admin/login');
    }
});

router.post("/posts", verifyToken, async (req, res) => {

    if (req.decode){

        console.log(req.body);

        if (req.body.Title === "" || req.body.Content === "" ){
            return res.json({
                success: 0,
                message: "Empty Title or Content" 
            });
        } 

        const axiosInstance = axios.create({
            headers: {
                "content-type": "application/json",
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        console.log("Add post");

        await axiosInstance.post(api_url + 'post/', req.body)
        .then(function(response) {
            console.log("Add post Successful"); 
            //res.send('client/index.ejs');
            res.json({
                success: 1,
                message: "Add post Successful",
            });
        })
        .catch(function(error) {
            console.log(error);
            res.json({
                success: 0,
                message: "Add post Unsuccessful",
            });
        });
    } else {
        res.redirect('/admin/login');
    }
});

router.get('/domains', verifyToken, async (req, res) => {
    if(req.decode) {
        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.get(api_url + 'domain/')
            .then(domainRes => {
                res.render('admin/practice_areas', {
                    DomainList: domainRes.data
                });
            })
            .catch(errorRes => {
                res.json(errorRes);
            });
    } else {
        res.redirect('/admin/login');
    }
});


router.put('/update-practice-area', verifyToken, async (req, res) => {
    if(req.decode) {
        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.put(api_url + 'domain/' + req.body.DomainID, req.body)
            .then(domainRes => {
                res.json(domainRes.data);
            })
            .catch(errorRes => {
                res.status(500).json({
                    message: "Có lỗi xảy ra khi cập nhật!"
                });
            });
    } else {
        res.redirect('/admin/login');
    }
})

router.get('/posts/edit-post/:PostId', verifyToken, async function(req, res) {
    if(req.decode) {
        var postResponse = await axios.get(api_url + 'post/' + req.params.PostId, {
            "headers": {
                "content-type": "application/json",
            },
        });

        var adminResponse = null;
        if(postResponse.data.AdminID) {
            try {
                adminResponse = await axios.get(api_url + 'admin/' + postResponse.data.AdminID, {
                    "headers": {
                        "content-type": "application/json",
                    }
                })
            } catch(errorResponse) {
                adminResponse = errorResponse;
            }
        }

        res.render('admin/edit-post', {
            Post: postResponse.data,
            CategoryMapper: Constant.CATEGORY_MAPPER,
            Admin: adminResponse ? adminResponse.data : null,
        })
    } else {
        res.redirect('/admin/login');
    }
});

router.delete('/posts/:PostID', verifyToken, async function(req, res) {
    if(req.decode) {
        if(req.params.PostID) {
            await axios.delete(api_url + 'post/' + req.params.PostID)
            .then(delResponse => {
                res.json(delResponse.data);
            })
            .catch(err => {
                res.status(500).json(err);
            })
        }
    } else {
        res.redirect('/admin/login');
    }
});

router.put('/post/:PostId', verifyToken, async function(req, res) {
    if(req.decode) {

        console.log(req.body);
        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.put(api_url + 'post/' + req.params.PostId, req.body)
        .then(response => {
            console.log("Update post successfully");
            res.status(200).json({ message: 'Update Post Successful.' });
        })
        .catch(err => {
            console.log("Update post unsuccessfully");
            res.json({ message: err.message });
        })

    } else {
        res.redirect('/admin/login');
    }
})

router.post('/post/upload', verifyToken, upload.single('photo'), async function(req, res) {
    if(req.file) {
        fs.readFile(req.file.path, function(err, original_data){
            var base64Image = original_data.toString('base64');
            var decodedImage = Buffer.from(base64Image, 'base64');

            // Lưu ảnh đại diện với tên là id của user (client/ lawyer)
            // Nơi lưu ảnh: /public/client/uploads/images/
            // Trong db sẽ lưu giá trị cột Avatar theo định dạng: '/client/uploads/images/<UserId>.<extension>';

            fs.writeFile(uploadDir + req.query.PostID + "." + mimeTypes.extension(req.file.mimetype), decodedImage, function(err) {});
            if(fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        });

        var filepath =  "/admin/uploads/posts/" + req.query.PostID + "." + mimeTypes.extension(req.file.mimetype);
        console.log(filepath);

        res.json({
            success: 1,
            message: "Upload successfully"
        })

        //res.redirect('/user/dashboard?UserID='+ req.clientId); 
    }
    else {
        res.json({
            success: 0,
            message: "Please choose file"
        })
    };
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

router.delete('/guests/:GuestID', verifyToken, async function (req, res) {
    if (req.decode) {
        if (req.params.GuestID) {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.delete(api_url + 'client/' + req.params.GuestID)
                .then(delResponse => {
                    res.json(delResponse.data);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }

    } else {
        res.redirect('/admin/login');
    }
});

router.delete('/lawyers/:LawyerID', verifyToken, async function (req, res) {
    if (req.decode) {
        if (req.params.LawyerID) {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.delete(api_url + 'lawyer/' + req.params.LawyerID)
                .then(delResponse => {
                    res.json(delResponse.data);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }

    } else {
        res.redirect('/admin/login');
    }
});

router.delete('/domains/:DomainID', verifyToken, async function (req, res) {
    if (req.decode) {
        if (req.params.DomainID) {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.delete(api_url + 'domain/' + req.params.DomainID)
                .then(delResponse => {
                    res.json(delResponse.data);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }

    } else {
        res.redirect('/admin/login');
    }
});

router.get('/guests/edit-guest/:guest_id', async function(req, res) {
    const axiosInstance = axios.create({
        headers: {
            Authorization: `token ${req.cookies['mylawyer']}`
        }
    });

    await axiosInstance.get(api_url + req.params.guest_id)
    .then(guestResponse => {
        console.log(guestResponse)
    })
    .catch(err => {
        console.log(err)
    });


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

router.put('/guests/:ClientID', verifyToken, async function(req, res) {

    if (req.decode){

        console.log("Updating...");
        console.log(req.body);
        if (req.params.ClientID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.put(api_url + 'client/' + req.params.ClientID, req.body)
            .then(function(responseArr) {
                console.log(responseArr);
                res.json({
                    success: 1,
                    message: "Update Successful"
                })
               //res.send('client/index.ejs');
        
            })
            .catch(async function(error) {
                console.log("Update Unsuccessful");
                res.json({
                    success: 0,
                    message: "Update Failed"
                })
                //res.redirect('/lawyer/dashboard?UserID='+ req.query.UserID); 
                /*   
                await axiosInstance.get(api_url + 'lawyer/' + req.query.UserID)
                .then(function(responseArr) {
                    console.log(responseArr.data);
        
        
                   res.render('client/lawyer-dashboard',{
                       lawyer: responseArr.data,
                       username: req.decode.UserID
                   });
                   //res.send('client/index.ejs');
            
                })
                .catch(function(error) {
                    console.log("Admin Account??");
                    res.redirect('/');
                })
                */
                
            });
        } else {
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
    }
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


router.put('/lawyers/:LawyerID', verifyToken, async function(req, res) {

    if (req.decode){

        console.log("Updating...")
        if (req.params.LawyerID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.put(api_url + 'lawyer/' + req.params.LawyerID, req.body)
            .then(function(responseArr) {
                console.log(responseArr);
                res.json({
                    success: 1,
                    message: "Update Successful"
                })
               //res.send('client/index.ejs');
        
            })
            .catch(async function(error) {
                console.log("Update Unsuccessful");
                res.json({
                    success: 0,
                    message: "Update Failed"
                })
                //res.redirect('/lawyer/dashboard?UserID='+ req.query.UserID); 
                /*   
                await axiosInstance.get(api_url + 'lawyer/' + req.query.UserID)
                .then(function(responseArr) {
                    console.log(responseArr.data);
        
        
                   res.render('client/lawyer-dashboard',{
                       lawyer: responseArr.data,
                       username: req.decode.UserID
                   });
                   //res.send('client/index.ejs');
            
                })
                .catch(function(error) {
                    console.log("Admin Account??");
                    res.redirect('/');
                })
                */
                
            });
        } else {
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
    }
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

router.put('/admins/:AdminID', verifyToken, async function(req, res) {

    if (req.decode){

        console.log("Updating...")
        if (req.params.AdminID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.put(api_url + 'admin/' + req.params.AdminID, req.body)
            .then(function(responseArr) {
                console.log(responseArr);
                res.json({
                    success: 1,
                    message: "Update Successful"
                })
               //res.send('client/index.ejs');
        
            })
            .catch(async function(error) {
                console.log("Update Unsuccessful");
                res.json({
                    success: 0,
                    message: "Update Failed"
                })
                //res.redirect('/lawyer/dashboard?UserID='+ req.query.UserID); 
                /*   
                await axiosInstance.get(api_url + 'lawyer/' + req.query.UserID)
                .then(function(responseArr) {
                    console.log(responseArr.data);
        
        
                   res.render('client/lawyer-dashboard',{
                       lawyer: responseArr.data,
                       username: req.decode.UserID
                   });
                   //res.send('client/index.ejs');
            
                })
                .catch(function(error) {
                    console.log("Admin Account??");
                    res.redirect('/');
                })
                */
                
            });
        } else {
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
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

        await axiosInstance.post(api_url + 'admin/', req.body)
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

        await axiosInstance.post(api_url + 'client/', req.body)
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

        await axiosInstance.post(api_url + 'lawyer/', req.body)
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


router.post("/register/addCategory", verifyToken, async (req, res) => {

    if (req.decode){

        if (req.body.Domain === ""){
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

        await axiosInstance.post(api_url + 'domain/', req.body)
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

router.get('/transactions', verifyToken, async function(req, res) {
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
        await axiosInstance.get(api_url + 'booking')
        .then(function(responseArr) {
            console.log(responseArr.data);


            res.render('admin/transactions',{
                transaction_list: responseArr.data,
                transaction_count:  responseArr.data.length,
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

router.put('/transactions/:TransactionID', verifyToken, async function(req, res) {

    if (req.decode){

        console.log("Updating...");
        console.log(req.body);
        if (req.params.TransactionID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.put(api_url + 'booking/' + req.params.TransactionID, req.body)
            .then(function(responseArr) {
                console.log(responseArr);
                res.json({
                    success: 1,
                    message: "Update Successful"
                })
               //res.send('client/index.ejs');
            })
            .catch(async function(error) {
                console.log("Update Unsuccessful");
                res.json({
                    success: 0,
                    message: "Update Failed"
                })
                //res.redirect('/lawyer/dashboard?UserID='+ req.query.UserID); 
                /*   
                await axiosInstance.get(api_url + 'lawyer/' + req.query.UserID)
                .then(function(responseArr) {
                    console.log(responseArr.data);    
        
                   res.render('client/lawyer-dashboard',{
                       lawyer: responseArr.data,
                       username: req.decode.UserID
                   });
                   //res.send('client/index.ejs');
            
                })
                .catch(function(error) {
                    console.log("Admin Account??");
                    res.redirect('/');
                })
                */
                
            });
        } else {
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
    }
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