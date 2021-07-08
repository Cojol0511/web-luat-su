const router = require("express").Router();
const path = require("path");
const axios = require('axios');
const jwt = require("jsonwebtoken");
const url = require("url");
const http = require('http');
const https = require('https');
const {verifyToken, checkAuth} = require('../../middleware/verifyToken');
const Constant = require('../../config/const');

//const clientController = require("../../controllers/client.controller.js");
//const lawyerController = require("../../controllers/lawyer.controller.js");
//const adminController = require("../../controllers/admin.controller.js");
//const transactionController = require("../../controllers/transaction.controller.js");
const { AsyncResource } = require("async_hooks");

const api_url = process.env.API_URL || 'http://api.venerispro.bitiland.com/api/';

const mimeTypes = require("mime-types");
const multer = require("multer");
const fs = require("fs");
const { resolve } = require("path");
const publicPath = '/public/client';
const uploadFolder = '/uploads/avatar/';
const uploadDir = process.cwd() + publicPath + uploadFolder;
const upload = multer({ dest: uploadDir});

// General Routes
// -------------------------------------------------------------------------------------------
router.post('/login', async function(req,res){

    if (req.body.UserName === "" || req.body.PasswordHash === ""){
        res.json({
            success: 0,
            message: "Invalid Input" 
        });
    } 

    await axios.post(api_url + 'auth/', req.body,{
        "headers": {  
            "content-type": "application/json",  
        },
    })
    .then(function(response) {
        console.log(response.data); 
        const user = jwt.verify(response.data.accessToken, process.env.ACCESS_TOKEN_SECRET);
        //console.log("Access Token" + response.data.accessToken);
        res.cookie('mylawyer', response.data.accessToken, {
            expires: new Date(Date.now() + 999999),
            secure: false, // set to true if your using https
            httpOnly: false
              // The cookie only accessible by the web server
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

router.post('/register', async function(req,res){

    //if (req.body.PasswordHash != req.body.PasswordConfirm) return res.status(400).json({ message: "Mật khẩu không trùng khớp" });
    if (req.body.UserName === "" || req.body.PasswordHash === "" || req.body.Email === ""){
        return res.json({
            success: 0,
            message: "Thiếu thông tin" 
        });
    } 

    const userObj = {
        "FirstName": req.body.FirstName || 'client',
        "LastName": req.body.LastName || 'anomynous',
        "Avatar": req.body.Avatar || '/client/uploads/avatar/default.png',
        "Gender": 0,
        "UserName": req.body.UserName,
        "PasswordHash": req.body.PasswordHash,
        "Email": req.body.Email,
        "Role": req.body.Role
    }

    console.log(userObj);

    await axios.post(api_url + 'client/', JSON.stringify(userObj),{
            "headers": {  
                "content-type": "application/json",  
            },
        })
        .then(function(response) {
            console.log("User registration Successfully"); 
            console.log(response.data); 
            res.json({
                success: 1,
                message: "Đăng ký thành công",
                response: response.data
            });
        })
        .catch(function(error) {
            console.log("User registration Unsuccessfully");
            console.log(error.data);
            res.json({
                success: 0,
                message: "Đăng ký thất bại",
                error: error.data
            });
        });
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

router.get('/', verifyToken, async function(req, res) {
    /*
    const token = req.cookies.token || '';
    console.log(token);
    try {
      if (!token) {
         console.log('Not logined yet');
      }
      console.log('Already logined');
      const decrypt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = {
        id: decrypt.UserID
      };
      console.log(req.user);
      res.render('client/index',{User: req.user});
    } catch (err) {
      //res.status(500).json(err.toString());
    }
    */

    var postPro = await axios.get(api_url + 'post', {
        "headers": {
            "content-type": "application/json",
        },
    })
        // .then((post) => {
        //     console.log(post.data);
        // })
    if (req.decode){
        res.render('client/index',{
            UserID: req.decode.UserID,
            postList: postPro.data,
        });
    } else {
        res.render('client/index', {
            postList: postPro.data,
        });
    }
});

router.get('/about', function(req, res) {
    res.render('client/about');
});

router.get('/lawyer', function(req, res) {
    res.render('client/lawyer');
});

router.get('/lawyerList', checkAuth, async function(req, res) {
    if (req.query.lawyerID) {
        // await axiosInstance.get(api_url + 'lawyer/findAndCountAll?offset=' + offset + '&limit=' + limit)
        const axiosInstance = axios.create({
        });

        await axios.all([
            axiosInstance.get(api_url + 'lawyer/'),
            axiosInstance.get(api_url + 'lawyer/' + req.query.lawyerID)
        ])
            .then(function (responseArr) {
                console.log(responseArr[0].data);
                console.log(responseArr[1].data);
                console.log(req.status);
                if (req.status == 1) {
                    res.render('client/lawyer', {
                        lawyer_list: responseArr[0].data,
                        lawyer: responseArr[1].data,
                        user: req.decode.UserID
                    });
                } else {
                    res.render('client/lawyer', {
                        lawyer_list: responseArr[0].data,
                        lawyer: responseArr[1].data,
                        user: ""
                    });
                }
                //res.send('client/index.ejs');

            })
            .catch(function (error) {
                console.log(error);
                res.redirect('/');
            });
    } else if (req.query.NameRex) {

        var url = encodeURI(api_url + 'lawyer/search/byNameRex/?key=' + req.query.NameRex);

        console.log(url);

        await axios.get(url)
        .then(function (responseArr) {
            console.log(responseArr.data);
            console.log(req.status);
            if (req.status == 1) {
                res.render('client/lawyerList', {
                    lawyer_list: responseArr.data,
                    user: req.decode.UserID
                });
            } else {
                res.render('client/lawyerList', {
                    lawyer_list: responseArr.data,
                    user: ""
                });
            }
            //res.send('client/index.ejs');

        })
        .catch(function (error) {
            console.log(error);
            res.redirect('/');
        });
    } else {
        await axios.get(api_url + 'lawyer/')
            .then(function (responseArr) {
                console.log(responseArr.data);
                console.log(req.status);
                if (req.status == 1) {
                    res.render('client/lawyerList', {
                        lawyer_list: responseArr.data,
                        user: req.decode.UserID
                    });
                } else {
                    res.render('client/lawyerList', {
                        lawyer_list: responseArr.data,
                        user: ""
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                res.redirect('/');
            });
    }
});

router.get('/lawyer/searchByName/:key', async (req, res) => {
    if (req.params.key) {

        console.log(req.params.key);

        var url = encodeURI(api_url + 'lawyer/search/byNameRex/?key=' + req.params.key);

        console.log(url);

        await axios.get(url)
            .then(function (responseArr) {
                if(Array.from(responseArr.data).length > 0) {
                    res.json(responseArr.data);
                } else {
                    res.status(500).json({ message: "Không tồn tại tên luật sư đã nhập!"})
                }
            })
            .catch(function (error) {
                console.log(error);
                res.redirect('/');
            });
    } else {
        res.redirect('/');
    }
})

router.get('/contact', function(req, res) {
    res.render('client/contact');
});

router.get('/domain-info/:domainId', async (req, res) => {

    const axiosInstance = axios.create({
    });


    await axios.all([
        axiosInstance.get(api_url + 'domain/' + req.params.domainId), 
        axiosInstance.get(api_url + 'lawyer/')
    ]).then(async (arrayRes) => {
        await axios.get(api_url + 'post', {
        }).then((postRes) => {
            res.render('client/domain-info', {
                domain: arrayRes[0].data,
                lawyer_list: arrayRes[1].data,
                postList: postRes.data
            });
        }).catch((postErr) => {
            console.log(postErr)
        })
    }).catch((err) => {
        console.log(err)
    })
})

router.get('/news', async function(req, res) {
    var postPro = await axios.get(api_url + 'post', {
        "headers": {
            "content-type": "application/json",
        },
    })

    res.render('client/news', {
        CategoryMapper: Constant.CATEGORY_MAPPER,
        FlashNewsList: postPro.data.slice(0, 4),
    });
});

router.get('/category-posts/:CategoryId', async function (req, res) {
    var postPro = await axios.get(api_url + 'post', {
        "headers": {
            "content-type": "application/json",
        },
    })

    res.render('client/category-posts', {
        CategoryName: Constant.CATEGORY_MAPPER.get(req.params.CategoryId),
        PostList: postPro.data,
    });
})

router.get('/post-detail/:PostId', async function (req, res) {
    await axios.get(api_url + 'post/' + req.params.PostId, {
        "headers": {
            "content-type": "application/json",
        },
    })
    .then(async (postResponse) => {
        if(postResponse.data.AdminID == null || postResponse.data.AdminID == '') {
            res.render('client/post-detail', {
                Post: postResponse.data,
                Author: ''
            })
        }

        await axios.get(api_url + 'admin/' + postResponse.data.AdminID, {
            "header": {
                "content-type": "application/json"
            }
        })
        .then((lawyerResponse) => {
            res.render('client/post-detail', {
                Post: postResponse.data,
                Author: lawyerResponse.data
            })
        })
        .catch((err) => {
            res.render('client/post-detail', {
                Post: postResponse.data,
                AuthorErr: 'Error occured when fetching author info.'
            })
        })
    })
    .catch((err) => {
        res.render('client/post-detail', {
            Err: err
        })
    })
})

router.get('/search', function(req, res) {
    res.render('client/search');
});

// Lawyer Pages Routes
// -------------------------------------------------------------------------------------------

router.get('/lawyer/register', checkAuth, function(req, res) {

    res.render('client/lawyer-register');
    
});

router.post('/lawyer/register', async function(req,res){

    //if (req.body.PasswordHash != req.body.PasswordConfirm) return res.status(400).json({ message: "Mật khẩu không trùng khớp" });

    const lawyerObj = {
        "FirstName": req.body.FirstName,
        "LastName": req.body.LastName,
        "Avatar": req.body.Avatar || '/client/uploads/avatar/default.png',
        "Gender": 0,
        "DegreeType": 0,
        "Specialize": 0,
        "UserName": req.body.UserName,
        "PasswordHash": req.body.PasswordHash,
        "Email": req.body.Email,
        "Role": "Lawyer",
        "Rating": 0
    }

    const lawyerDomain = {
        "DomainID": 0,
        "Name": "Dân sự"
    }

    const lawyerFormation = {
        "Institution": "Đại học ABC",
        "DegreeType": "Cử nhân",
        "Major": "Luật dân sự",
        "StartYear": 2013,
        "EndYear": 2018,
        "Degree": "string",
        "Description": "string"
    }   

    const lawyerExperience = {
        "PostName": "test PostName",
        "ContractType": "test ContractType",
        "Company": "test major",
        "CompanyAddress": "test major",
        "StartDate": "2012-11-13",
        "EndDate": "2014-11-15",
        "IsCurrentPost": 0,
        "Description": "string"
    }   

    console.log(lawyerObj);

    const axiosInstance = axios.create({
        headers: {
            "content-type": "application/json",
        }
    });

    await axios.post(api_url + 'lawyer/', lawyerObj,{
            "headers": {  
                "content-type": "application/json",  
            },
        })
        .then(function(response) {

            console.log("Lawyer registration Successfully");
            console.log(response.data);

            axios.all([
                axiosInstance.post(api_url + 'lawyer/' + response.data.LawyerID + '/formation', lawyerFormation),
                axiosInstance.post(api_url + 'lawyer/' + response.data.LawyerID + '/experience', lawyerExperience),
                //axiosInstance.post(api_url + 'lawyer/' + response.data.LawyerID + '/domain', lawyerDomain),
            ]).then(function(responseArr) {
                console.log("Registration Successfully");
            }).catch(function(error) {
                console.log("Registration formation/experience/domain unsuccessfully");
                console.log(error);
            })

            res.json({
                success: 1,
                message: "Đăng ký thành công",
                response: response
            });
        })
        .catch(function(error) {
            console.log("Lawyer registration unsucccessfully");
            res.json({
                success: 0,
                message: "Đăng ký thất bại",
                error: error
            });
        });
});

router.get('/lawyer/profile', verifyToken, async function(req, res) {

    if (req.decode){
        if (req.query.lawyerID){
            await axios.get(api_url + 'lawyer/' + req.query.lawyerID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
    
               res.render('client/profile',{
                   lawyer: responseArr.data,
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/user/login');
    }
    
});

router.get('/lawyer/dashboard', verifyToken, async function(req, res) {
    console.log("Enter here");
    if (req.decode){
        if (req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

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
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/lawyer/dashboard/setting', verifyToken, async function(req, res) {
    if (req.decode){
        if (req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'lawyer/' + req.query.UserID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
    
               res.render('client/lawyer-setting',{
                   lawyer: responseArr.data,
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.put('/lawyer/dashboard/setting/:LawyerID', verifyToken, async function(req, res) {

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
                console.log(error);
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
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/lawyer/dashboard/contact', verifyToken, async function(req, res) {
    if (req.decode){
        if (req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'lawyer/' + req.query.UserID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
    
               res.render('client/lawyer-contact',{
                   lawyer: responseArr.data,
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.put('/lawyer/dashboard/contact/:AddressID', verifyToken, async function(req, res) {

    if (req.decode){

        console.log("Updating...")
        if (req.params.AddressID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.put(api_url + 'address/' + req.params.AddressID, req.body)
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
                console.log(error);
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
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/lawyer/dashboard/profile', verifyToken, async function(req, res) {
    if (req.decode){
        if (req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'lawyer/' + req.query.UserID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
    
               res.render('client/lawyer-profile',{
                   lawyer: responseArr.data,
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.put('/lawyer/dashboard/formation/', verifyToken, async function(req, res) {

    if (req.decode){

        console.log("Updating...")
        if (req.query.LawyerID && req.query.FormationID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.put(api_url + 'lawyer/' + req.query.LawyerID + '/formation/' + req.query.FormationID, req.body)
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
                console.log(error);
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
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.put('/lawyer/dashboard/experience/', verifyToken, async function(req, res) {

    if (req.decode){

        console.log("Updating...")
        if (req.query.LawyerID && req.query.ExperienceID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.put(api_url + 'lawyer/' + req.query.LawyerID + '/experience/' + req.query.ExperienceID, req.body)
            .then(function(response) {
                console.log(response);
                res.json({
                    success: 1,
                    message: "Update Successful"
                })
               //res.send('client/index.ejs');
        
            })
            .catch(async function(error) {
                console.log("Update Unsuccessful");
                console.log(error);
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
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/lawyer/dashboard/changepw', verifyToken, async function(req, res) {

    if (req.decode){
        if (req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'lawyer/' + req.query.UserID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
    
               res.render('client/lawyer-changepw',{
                   lawyer: responseArr.data,
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/lawyer/dashboard/avatar', verifyToken, async function(req, res) {
    if (req.decode){
        if (req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'lawyer/' + req.query.UserID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
    
               res.render('client/lawyer-avatar',{
                   lawyer: responseArr.data,
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/lawyer/dashboard/booking', function(req, res) {
    res.render('client/lawyer-booking');
});

router.get('/lawyer/dashboard/schedule', function(req, res) {
    res.render('client/lawyer-schedule');
});

router.get('/lawyer/dashboard/chat', function(req, res) {
    res.render('client/lawyer-chat');
});

router.get('/lawyer/dashboard/review', function(req, res) {
    res.render('client/lawyer-review');
});

router.get('/lawyer/dashboard/blog', function(req, res) {
    res.render('client/lawyer-blog');
});

router.get('/lawyer/dashboard/blog/add', function(req, res) {
    res.render('client/lawyer-add-blog');
});

router.get('/lawyer/dashboard/blog/edit', function(req, res) {
    res.render('client/lawyer-edit-blog');
});

// Client Pages Routes
// -------------------------------------------------------------------------------------------

router.get('/user/register', function(req, res) {
    res.render('client/user-register');
});

router.get('/user/login', verifyToken, function(req, res) {

    if (req.decode){
        res.redirect('/');
    } else {
        res.render('client/user-login');
    }
});

router.get('/user/dashboard/', verifyToken, async function(req, res) {

    if (req.decode){
        if (req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'client/' + req.query.UserID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
    
               res.render('client/user-dashboard',{
                   user: responseArr.data,
                   username: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(async function(error) {
                console.log("Lawyer dashboard");
                res.redirect('/lawyer/dashboard?UserID='+ req.query.UserID); 
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
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/user/dashboard/setting', verifyToken, async function(req, res) {

    if (req.decode){
        if (req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'client/' + req.query.UserID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
    
               res.render('client/user-setting',{
                   user: responseArr.data,
                   username: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }

});

router.put('/user/dashboard/setting/:ClientID', verifyToken, async function(req, res) {

    if (req.decode){

        console.log("Updating...")
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
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/user/dashboard/changepw', verifyToken, async function(req, res) {
    if (req.decode){
        if (req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'client/' + req.query.UserID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
    
               res.render('client/user-changepw',{
                   user: responseArr.data,
                   username: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/user/dashboard/avatar', verifyToken, async function(req, res) {
    if (req.decode){
        if (req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'client/' + req.query.UserID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
    
               res.render('client/user-avatar',{
                   user: responseArr.data,
                   username: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/user/dashboard/booking', function(req, res) {
    res.render('client/user-booking');
});

router.get('/user/dashboard/favorite', function(req, res) {
    res.render('client/user-favorite');
});

// Transaction Pages Routes
// -------------------------------------------------------------------------------------------

router.post('/checkout', verifyToken, async function(req, res) {

    console.log("Enter here");
    console.log(req.query);
    console.log(req.body);
    if (req.decode){
        if (req.query.lawyerID && req.query.userID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'lawyer/' + req.query.lawyerID)
            .then(function(responseArr) {
                console.log(responseArr.data);
                //console.log(responseArr[1].data);
                console.log("Successful");
    
               res.render('client/checkout',{
                   lawyer: responseArr.data,
                   userInfo: req.body,
                   //client: responseArr.data[1],
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
            res.redirect('/');
    }
});

router.post('/booking-success', verifyToken, async function(req, res) {
    console.log(req.body);
    if (req.decode){   
        if (req.query.LawyerID && req.query.UserID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            if (req.body.radio === "3") {
                content = "Thanh toán chuyển khoản";
                state = 2;
            } else if (req.body.radio === "2"){
                content = "Thanh toán ví MOMO";
                state = 1;
            } else if (req.body.radio === "1"){
                content = "Thanh toán thẻ tín dụng";
                state = 0;
            }

            bookingObj = {
                ClientID: req.query.UserID,
                LawyerID: req.query.LawyerID,
                Title: req.body.Name + "-" + req.body.PhoneNumber + "-" + req.body.Email 
                        + "-" + req.body.Lawyer_FullName + "-" + req.body.Lawyer_PhoneNumber + "-" + req.body.Lawyer_Email,
                Content: content,
                BookingDate: req.body.Date,
                StartTime: req.body.Time,
                State: state
            }

            /*

            axiosInstance.get(api_url + 'lawyer/' + req.query.lawyerID)
            .then(function(responseArr) {
                console.log(responseArr.data);
                //console.log(responseArr[1].data);
                let lawyer = responseArr.data;

                console.log("Successful");
                bookingObj.Title += "Luật sư: " + lawyer.FullName + " - SĐT: " + lawyer.PhoneNumber + " - Email: " + lawyer.Email;
    
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
            });
            */

            console.log(bookingObj);

            await axios.all([
                axiosInstance.post(api_url + 'booking/', bookingObj),
                axiosInstance.get(api_url + 'lawyer/' + req.query.LawyerID)
            ])
            .then(function(responseArr) {
                console.log(responseArr[0].data);
                console.log(responseArr[1].data);
                //console.log(responseArr[1].data);
                console.log("Booking Successful");
    
               res.render('client/booking-success',{
                   lawyer: responseArr[1].data,
                   bookingInfo: responseArr[0].data,
                   //client: responseArr.data[1],
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });

/*
            await axiosInstance.get(api_url + 'lawyer/' + req.query.LawyerID)
            .then(function(responseArr) {
                console.log(responseArr.data);
                //console.log(responseArr[1].data);
                console.log("Booking Successful");
    
               res.render('client/booking-success',{
                   lawyer: responseArr.data,
                   //client: responseArr.data[1],
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
*/
        } else {
            res.redirect('/');
        }
    }
});

router.get('/booking-rating', verifyToken, async function(req, res) {

    if (req.decode){

        console.log(req.query);

        if (req.query.BookingID && req.query.LawyerID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axios.all([
                axiosInstance.get(api_url + 'booking/' + req.query.BookingID),
                axiosInstance.get(api_url + 'lawyer/' + req.query.LawyerID)
            ])
            .then(function(responseArr) {
                console.log(responseArr);
    
               res.render('client/booking-rating',{
                   booking: responseArr[0].data,
                   lawyer: responseArr[1].data,
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });

        } else {
            res.redirect('/user/login');
        }
    } else {
        res.redirect('/user/login');
    }
});

router.post('/booking-rating', verifyToken, async function(req, res) {

    if (req.decode){

        if (req.query.BookingID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axios.all([
                //axiosInstance.put(api_url + 'lawyer/' + req.body.LawyerID, {Rating: req.body.Rating}),
                axiosInstance.post(api_url + 'comment/', 
                    {
                        ClientID: req.body.ClientID,
                        LawyerID: req.body.LawyerID,
                        Content: req.body.Comment,
                        Rating: req.body.Rating
                    }
                )
            ])
            .then(function(responseArr) {
             
                console.log(responseArr);
    
                res.redirect('/user/dashboard?UserID=' + req.body.ClientID);
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });

        } else {
            res.redirect('/user/login');
        }
    } else {
        res.redirect('/user/login');
    }
});

router.get('/booking', verifyToken, async function(req, res) {

    if (req.decode){

        if (req.query.LawyerID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'lawyer/' + req.query.LawyerID)
            .then(function(responseArr) {
                console.log(responseArr.data);
    
               res.render('client/booking',{
                   lawyer: responseArr.data,
                   user: req.decode.UserID
               });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });

        } else {
            res.redirect('/user/login');
        }
    } else {
        res.redirect('/user/login');
    }
});

router.post('/booking', verifyToken, async function(req, res) {

    if (req.decode){

        console.log(req.body);

        if (req.body.LawyerID && req.body.ClientID){

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            await axiosInstance.get(api_url + 'lawyer/' + req.body.LawyerID)
            .then(function(responseArr) {
                console.log(JSON.stringify(responseArr.data));
                //console.log(responseArr[1].data);
                console.log("Successful");

                lawyerInfo = JSON.stringify(responseArr.data);

                res.redirect(url.format({
                   pathname:"/checkout",
                   query: {
                      lawyer: lawyerInfo,
                      userInfo: JSON.stringify(req.body),
                      user: req.decode.UserID
                    }
                 }));    
                
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    } else {
            res.redirect('/');
    }
});


router.get('/invoice-view', verifyToken, async function(req, res) {
    if (req.decode){
        if (req.query.BookingID){     
            
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `token ${req.cookies['mylawyer']}`
                }
            });

            var bookingInfo;

            await axiosInstance.get(api_url + 'booking/' + req.query.BookingID)
            .then(function(responseArr) {
                console.log(responseArr.data);

                bookingInfo = responseArr.data
                                       
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
            });


            await axios.all([
                axiosInstance.get(api_url + 'lawyer/' + bookingInfo.LawyerID),
                axiosInstance.get(api_url + 'client/' + bookingInfo.ClientID)
            ])
            .then(function(responseUser) {
                //console.log(responseUser[0].data);
                //console.log(responseUser[1].data);
    
    
                res.render('client/invoice-view',{
                   lawyer: responseUser[0].data,
                   user: responseUser[1].data,
                   bookingInfo: bookingInfo,
                   userID: req.decode.UserID,
                   invoiceID : "#TestID",
                   invoiceDate: new Date().toLocaleDateString(),
                   paymentMethod: 3
                });
               //res.send('client/index.ejs');
        
            })
            .catch(function(error) {
                console.log(error);
                res.redirect('/');
            }); 


        } else {
            res.redirect('/user/login');
        }
    }
});


router.post('/user/upload', verifyToken, upload.single('photo'), async function(req, res) {
    if(req.file) {
        fs.readFile(req.file.path, function(err, original_data){
            var base64Image = original_data.toString('base64');
            var decodedImage = Buffer.from(base64Image, 'base64');

            // Lưu ảnh đại diện với tên là id của user (client/ lawyer)
            // Nơi lưu ảnh: /public/client/uploads/images/
            // Trong db sẽ lưu giá trị cột Avatar theo định dạng: '/client/uploads/images/<UserId>.<extension>';

            fs.writeFile(uploadDir + req.query.UserID + "." + mimeTypes.extension(req.file.mimetype), decodedImage, function(err) {});
            if(fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        });

        var filepath =  "/client/uploads/avatar/" + req.query.UserID + "." + mimeTypes.extension(req.file.mimetype);
        console.log(filepath);

        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.put(api_url + 'client/' + req.query.UserID, {
            Avatar: filepath
        })
        .then(function(responseArr) {
            console.log(responseArr);
            res.json({
                success: 1,
                message: filepath
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


        //res.redirect('/user/dashboard?UserID='+ req.clientId); 
    }
    else {
        res.json({
            success: 0,
            message: "Please choose file"
        })
    };
});

router.post('/lawyer/upload', verifyToken, upload.single('photo'), async function(req, res) {
    if(req.file) {
        fs.readFile(req.file.path, function(err, original_data){
            var base64Image = original_data.toString('base64');
            var decodedImage = Buffer.from(base64Image, 'base64');

            // Lưu ảnh đại diện với tên là id của user (client/ lawyer)
            // Nơi lưu ảnh: /public/client/uploads/images/
            // Trong db sẽ lưu giá trị cột Avatar theo định dạng: '/client/uploads/images/<UserId>.<extension>';

            fs.writeFile(uploadDir + req.query.UserID + "." + mimeTypes.extension(req.file.mimetype), decodedImage, function(err) {});
            if(fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        });

        var filepath =  "/client/uploads/avatar/" + req.query.UserID + "." + mimeTypes.extension(req.file.mimetype);
        console.log(filepath);

        const axiosInstance = axios.create({
            headers: {
                Authorization: `token ${req.cookies['mylawyer']}`
            }
        });

        await axiosInstance.put(api_url + 'lawyer/' + req.query.UserID, {
            Avatar: filepath
        })
        .then(function(responseArr) {
            console.log(responseArr);
            res.json({
                success: 1,
                message: filepath
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


        //res.redirect('/user/dashboard?UserID='+ req.clientId); 
    }
    else {
        res.json({
            success: 0,
            message: "Please choose file"
        })
    };
});


module.exports = router;