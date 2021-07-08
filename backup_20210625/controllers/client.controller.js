/*
const clientService = require('../services/client.service');

exports.update = (req, res, next) => {
    clientService.update(req.params.id, req.body)
        .then(() => res.json({
            success: 1,
            message: "Update successfully"
        }))
        .catch(err => next(err));
};

exports._delete = (req, res, next) => {
    clientService.delete(req.params.id)
    .then(() => res.json({
        success: 1,
        message: "Delete successfully"
    }))
    .catch(err => next(err));
}
*/

const router = require('express').Router();
const {Client} = require('../models/');
const { verifyToken }= require('../middleware/verifyToken');

/*
router.get('/', (req, res) => {
    Client.findAll()
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
*/
/*
router.get('/:ClientID', (req, res) => {
    Client.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at'
                    ]
                },

                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
*/
/*
router.post('/', (req, res) => {

    Client.create({
        username: req.body.username,
        password: req.body.password
    })

    .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    Client.findOne({
            where: {
                username: req.body.username
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that username!' });
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password);
            console.log(validPassword);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }
            req.session.save(() => {
                console.log("SAVING SESSION");

                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
*/
router.put('/:ClientID', verifyToken, (req, res) => {

    Client.update(req.body, {
            individualHooks: true,
            where: {
                ClientID: req.params.ClientID
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.delete('/:ClientID', verifyToken, (req, res) => {
    console.log(req.params.ClientID)
    Client.destroy({
            where: {
                ClientID: req.params.ClientID
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;