/**
 * Dependencies.
 */
const mUser = require('../model/user')
const cryptHelper = require('../helper/cryptHelper')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

async function insertUser(req, res, next){

    //console.log(req)

    console.log(req.body)


    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'The request body is empty!' }).end()
        return null
    }
   
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        level: req.body.level,
        company: req.body.company
    }

    user.password = await cryptHelper.generatePassword(user.password);

    try {
        insertUser = await mUser.insertUser(user)
        if(insertUser.affectedRows === 1){
            const user = await mUser.getUserById(insertUser.insertId);
            console.log(user);
            res.status(200).send({user});
        }else{
            res.status(500).send();
        }
    } catch (error) {
        next(error)
    }
}

async function getAll(req, res, next){

    try {
        const users = await mUser.getAllUser();
        return res.status(200).send({users})
    } catch (error) {
        next(error)
    }
}

async function update(req, res, next){

    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'The request body is empty!' }).end()
        return null
    }

    const id = req.body.id;

    const originalUser = await mUser.getUserById(id);

    if (originalUser  === undefined) {
        res.status(400).send({ message: 'User not found.' }).end();
        return null
    }
   
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        level: req.body.level,
        company: req.body.company
    }

    user.password = await cryptHelper.generatePassword(user.password);

    try {
        insertUser = await mUser.updateUser(id,user);
        if(insertUser.affectedRows === 1){
            const user = await mUser.getUserById(id);
            res.status(200).send({user});
        }else{
            res.status(500).send();
        }
    } catch (error) {
        next(error)
    }
}

async function deleteUser(req, res, next){

    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'The request body is empty!' }).end()
        return null
    }

    const id = req.body.id;

    const originalUser = await mUser.getUserById(id);

    if (originalUser  === undefined) {
        res.status(400).send({ message: 'User not found.' }).end();
        return null
    }
   
    try {
        insertUser = await mUser.deleteUser(id);
        if(insertUser.affectedRows === 1){
            res.status(200).send({status: 'ok'});
        }else{
            res.status(500).send();
        }
    } catch (error) {
        next(error)
    }
}

async function login(req, res, next) {

    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'The request body is empty!' }).end()
        return null
    }

    const {email, password} = req.body;

    var user = await mUser.getUserByEmail(email);

    if(user === undefined) {
        res.status(400).send({error: 'User not found.'}).end();
        return null
    }     

    if (!(await cryptHelper.checkPassword(user.password, password))) {
      res.status(401).send({error: 'The password is wrong.'}).end()
      return null
    }

    const {id, name, level, company} = user;

    res.status(200).send({
      user: {
        id,
        name,
        level,
        company
      },
      token: jwt.sign({id}, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })
    });
}


module.exports.insert = insertUser
module.exports.update = update
module.exports.getAll = getAll
module.exports.delete = deleteUser
module.exports.login = login