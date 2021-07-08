const Client = require('./client');
const Admin = require('./admin');
const Lawyer = require('./lawyer');
const Transaction = require('./transaction');

Client.hasMany(Transaction, {
    foreignKey: 'ClientID'
});

Lawyer.hasMany(Transaction, {
    foreignKey: 'LawyerID'
});

Transaction.belongsTo(Client, {
    foreignKey: 'ClientID',
    onDelete: "cascade"
});

Transaction.belongsTo(Lawyer, {
    foreignKey: 'LawyerID',
    onDelete: "cascade"
});

module.exports = { Client, Admin, Lawyer, Transaction};