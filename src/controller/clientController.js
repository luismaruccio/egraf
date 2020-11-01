const mClient = require('../model/client')
const url = require('url');

async function insert(req, res, next) {

    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'O corpo da requisição está em branco.' }).end()
        return null
    }

    //Check if cpf already exists
    const clientCpfCount = await mClient.alreadyExistsByCPF(req.body.cpf);

    if (clientCpfCount > 0) {
        res.status(400).send({ message: 'Este CPF já está cadastrado!'}).end()
        return null
    }

    const client = {
        name: req.body.name,
        cpf: req.body.cpf,
        street: req.body.street,
        district: req.body.district,
        number: req.body.number,
        city: req.body.city,
        states: req.body.states,
        cep: req.body.cep,
        complement: req.body.complement,
        tellNumber: req.body.tellNumber,
        email: req.body.email,
        company: req.body.company,
    }

    try {
        insertClient = await mClient.insert(client);
        if(insertClient.affectedRows === 1){
            const client = await mClient.getById(insertClient.insertId);
            res.status(200).send({client});
        }else{
            res.status(500).send();
        }
    } catch (error) {
        next(error)
    }
}

async function getAll(req, res, next){

    const company = req.authCompany;

    try {
        const clients = await mClient.getAll(company);
        return res.status(200).send({clients})
    } catch (error) {
        next(error)
    }
}

async function update(req, res, next) {

    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'O corpo da requisição está em branco.' }).end()
        return null
    }

    const id = req.body.id;

    //Check if user exist
    const originalClient = await mClient.getById(id);

    if (originalClient  === undefined) {
        res.status(400).send({ message: 'Cliente não encontrado.' }).end();
        return null
    }

    const client = {
        name: req.body.name,
        cpf: req.body.cpf,
        street: req.body.street,
        district: req.body.district,
        number: req.body.number,
        city: req.body.city,
        states: req.body.states,
        cep: req.body.cep,
        complement: req.body.complement,
        tellNumber: req.body.tellNumber,
        email: req.body.email,
        company: req.body.company
    }

    try {
        updatedClient = await mClient.update(id,client);
        if(updatedClient.affectedRows === 1){
            const client = await mClient.getById(id);
            res.status(200).send({client});
        }else{
            res.status(500).send();
        }
    } catch (error) {
        next(error)
    }
}

async function deleteClient(req, res, next){

    const queryObject = url.parse(req.url,true).query;

    const id = queryObject.id;
    
    //Check if user exist
    const originalClient = await mClient.getById(id);

    if (originalClient  === undefined) {
        res.status(400).send({ message: 'Cliente não encontrado.' }).end();
        return null
    }

    try {
        result = await mClient.delete(id);
        if(result.affectedRows === 1){
            res.status(200).send({status: 'ok'});
        }else{
            res.status(500).send();
        }
    } catch (error) {
        next(error)
    }
}

module.exports.insert = insert;
module.exports.getAll = getAll;
module.exports.update = update;
module.exports.delete = deleteClient;