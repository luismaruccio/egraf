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

/**
routes.post('/login', UserController.login);

routes.use(authMiddleware);

routes.post('/users', UserController.insert);
routes.get('/users', UserController.getAll)
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

*/


module.exports = router