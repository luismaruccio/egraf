/**
 * Dependencies
 */
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const webServerConfig = require('../config/webserver')
const router = require('../router/router')
const bodyParser = require('body-parser')
const cors = require('cors')


let httpServer

/**
 * Start http and Express Web Server
 */
function initialize(){
    return new Promise((resolve, reject) =>{

        const app = express()
        
        //Creating http server
        httpServer = http.createServer(app)

        app.use(bodyParser.json())
        
        app.use(cors())

        //including morgan to log requests
        app.use(morgan('combined'))

        //adding router
        app.use(router)
        
        httpServer.listen(webServerConfig.webServerPort)
        .on('listening', () => {
            console.log(`Web server started in the port: ${webServerConfig.webServerPort}`)
            resolve()
        })
        .on('error', err => {
            reject(err)
        })

    })
}
module.exports.initialize = initialize

/**
 * Close Webserver Module
 */
function close () {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err)
                return
            }
            resolve()
        })
    })
}
module.exports.close = close