const router = require('express').Router();
const { Post } = require('../models/');
const { verifyToken }= require('../middleware/verifyToken');

router.put('/:PostID', verifyToken, (req, res) => {

    Post.update(req.body, {
            individualHooks: true,
            where: {
                PostID: req.params.PostID
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

router.delete('/:PostID', verifyToken, (req, res) => {
    console.log(req.params.PostID)
    Post.destroy({
            where: {
                PostID: req.params.PostID
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