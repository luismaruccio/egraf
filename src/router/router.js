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

module.exports = router