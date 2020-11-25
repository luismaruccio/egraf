const utils = require('../helper/utils')
const mServiceOrder = require('../model/serviceOrders')
const url = require('url');

async function insert(req, res, next) {

    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'O corpo da requisição está em branco.' }).end()
        return null
    }

    const serviceOrders = {
        client: req.body.client,
        user: req.authId,
        requestDate: utils.ParseDateFormat(req.body.requestDate),
        deliveryDate: req.body.deliveryDate == undefined ? null : utils.ParseDateFormat(req.body.deliveryDate),
        totalPrice:  utils.ParseNumberToDB(req.body.totalPrice),
        status: req.body.status,
        paymentStatus: req.body.paymentStatus,
        company: req.body.company,
        items: req.body.items,
    }    

    try {
        result = await mServiceOrder.insert(serviceOrders);
        if(result.affectedRows === 1){
            var serviceOrder = await mServiceOrder.getById(result.insertId);
            serviceOrder.requestDate = utils.ParseDateFormat(serviceOrder.requestDate, false);
            serviceOrder.deliveryDate = req.body.deliveryDate == null ? null : utils.ParseDateFormat(serviceOrder.deliveryDate, false);
            req.serviceOrder = serviceOrder;
            return next();            
        }else{
            res.status(500).send();
        }
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
    const originalServiceOrder = await mServiceOrder.getById(id);

    if (originalServiceOrder  === undefined) {
        res.status(400).send({ message: 'Ordem de Serviço não encontrada.' }).end();
        return null
    }

    const serviceOrders = {
        client: req.body.client,
        user: req.authId,
        requestDate: utils.ParseDateFormat(req.body.requestDate),
        deliveryDate: req.body.deliveryDate == undefined ? null : utils.ParseDateFormat(req.body.deliveryDate),
        totalPrice:  utils.ParseNumberToDB(req.body.totalPrice),
        status: req.body.status,
        paymentStatus: req.body.paymentStatus,
        company: req.body.company,
        items: req.body.items,
    }    

    try {
        result = await mServiceOrder.update(id, serviceOrders);
        if(result.affectedRows === 1){
            var serviceOrder = await mServiceOrder.getById(id);
            serviceOrder.requestDate = utils.ParseDateFormat(serviceOrder.requestDate, false);
            serviceOrder.deliveryDate = req.body.deliveryDate == null ? null : utils.ParseDateFormat(serviceOrder.deliveryDate, false);
            req.serviceOrder = serviceOrder;
            return next();            
        }else{
            res.status(500).send();
        }
    } catch (error) {
        next(error)
    }
}


async function getAll(req, res, next) {

    const company = req.authCompany;

    try {
        var serviceOrder = await mServiceOrder.getAll(company);
        serviceOrder = await mServiceOrder.treatServiceOrdersValues(serviceOrder);
        req.serviceOrder = serviceOrder;
        return next();
    } catch (error) {
        next(error)
    }
}

async function deleteServiceOrder(req, res, next){

    const queryObject = url.parse(req.url,true).query;

    const id = queryObject.id;

    const serviceOrder = await mServiceOrder.getById(id);

    if (serviceOrder  === undefined) {
        res.status(400).send({ message: 'Ordem de serviço não encontrada.' }).end();
        return null
    }
   
    try {
        result = await mServiceOrder.delete(id);
        if(result.affectedRows === 1){
            req.serviceOrderId = id;
            return next();
        }else{
            res.status(500).send();
        }
    } catch (error) {
        next(error)
    }
}



module.exports.insert = insert;
module.exports.update = update;
module.exports.getAll = getAll;
module.exports.delete = deleteServiceOrder;