/**
 * Dependencies.
 */
const express = require('express')
const router = new express.Router()

/**
 * Middlewares
 */
const authMiddleware = require('../middleware/auth')


/**
 * Controllers
 */
const users = require('../controller/userController')
const clients = require('../controller/clientController')
const products = require('../controller/productController')
const serviceOrders = require('../controller/serviceOrdersController')
const itemServiceOrders = require('../controller/itemsServiceOrdersController')
const payments = require('../controller/paymentController')
const reports = require('../controller/reportController')

/**
 * Routes
 */

router.route('/').get(function(req, res, next) {
    return res.status(200).send("Hi, it's a simple api!")
})

router.route('/login').post(users.login)
 
router.use(authMiddleware);

router.route('/users').post(users.insert)
router.route('/users').get(users.getAll)
router.route('/users').put(users.update)
router.route('/users').delete(users.delete)

router.route('/clients').post(clients.insert)
router.route('/clients').get(clients.getAll)
router.route('/clients').put(clients.update)
router.route('/clients').delete(clients.delete)

router.route('/products').post(products.insert)
router.route('/products').get(products.getAll)
router.route('/products').put(products.update)
router.route('/products').delete(products.delete)

router.route('/serviceOrders').post(serviceOrders.insert, itemServiceOrders.insert)
router.route('/serviceOrders').put(serviceOrders.update, itemServiceOrders.update)
router.route('/serviceOrders').get(serviceOrders.getAll, itemServiceOrders.getAll)
router.route('/serviceOrders').delete(serviceOrders.delete, itemServiceOrders.delete)

router.route('/payments').post(payments.insert)
router.route('/payments').get(payments.getAll)
router.route('/payments').put(payments.update)
router.route('/payments').delete(payments.delete)

router.route('/r/monetaryMovements').get(reports.getMonetaryMovements)
router.route('/r/serviceOrdersByStatus').get(reports.getServiceOrdersByStatus)
router.route('/r/clientsWithAmountDue').get(reports.getClientsWithAmountDue)

module.exports = router