const functions = require('firebase-functions');
const admin = require('firebase-admin');

const order = require('./order')
const manage = require('./management')

const errorCodes = {
  permission: {
    code: "permission-denied",
    message: "The firewall has detected a try to abuse the ordering system."
  },
  firestoreError: {
    code: "internal",
    message: "An error has occurred, please try again later."
  }
}


module.exports = {
  errorCodes,
  order,
  manage
}
