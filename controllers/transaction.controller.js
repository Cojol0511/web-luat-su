const router = require('express').Router();
const {Client, Admin, Lawyer, Transaction} = require('../models/');
const { verifyToken }= require('../middleware/verifyToken');


router.get('/', (req, res) => {
    Transaction.findAll()
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/:TransactionID', (req, res) => {
    Transaction.findOne({
            attributes: { },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Client,
                    attributes: [
                        'ClientID',
                        'FirstName',
                        'LastName'
                    ]
                },

                {
                    model: Lawyer,
                    attributes: [
                        'LawyerID', 
                        'FirstName', 
                        'LastName'
                    ]
                },
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No transaction found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', (req, res) => {

    Transaction.create()

    .then(dbUserData => {
                res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:TransactionID', verifyToken, (req, res) => {

    Transaction.update(req.body, {
            individualHooks: true,
            where: {
                TransactionID: req.params.TransactionID
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

router.delete('/:TransactionID', verifyToken, (req, res) => {
    console.log(req.params.TransactionID)
    Transaction.destroy({
            where: {
                TransactionID: req.params.TransactionID
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