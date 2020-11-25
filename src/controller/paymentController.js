const utils = require('../helper/utils')
const mPayment = require('../model/payment')
const url = require('url');

async function insert(req, res, next) {

    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'O corpo da requisição está em branco.' }).end()
        return null
    }

    const paymentToInsert = {
        description: req.body.description,
        user: req.authId,
        entryExit: req.body.entryExit,
        date: utils.ParseDateFormat(req.body.date),
        serviceOrder: req.body.serviceOrder,
        amount: utils.ParseNumberToDB(req.body.amount),
        company: req.body.company
    }    

    try {
        result = await mPayment.insert(paymentToInsert);
        if(result.affectedRows === 1){
            var payment = await mPayment.getById(result.insertId);
            payment.amount = utils.ParseNumberToBRLocale(payment.amount, true);
            payment.date = utils.ParseDateFormat(payment.date, false)
            res.status(200).send({payment});
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
        var payments = await mPayment.getAll(company);
        payments = await mPayment.treatPaymentsValues(payments);
        return res.status(200).send({payments})
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

    const originalPayment = await mPayment.getById(id);

    if (originalPayment  === undefined) {
        res.status(400).send({ message: 'Pagamento não encontrado.' }).end();
        return null
    }

    const payment = {
        description: req.body.description,
        user: req.authId,
        entryExit: req.body.entryExit,
        date: utils.ParseDateFormat(req.body.date),
        serviceOrder: req.body.serviceOrder,
        amount: utils.ParseNumberToDB(req.body.amount),
        company: req.body.company
    }

    try {
        result = await mPayment.update(id, payment);
        if(result.affectedRows === 1){
            const payment = await mPayment.getById(id);
            payment.amount = utils.ParseNumberToBRLocale(payment.amount, true);
            payment.date = utils.ParseDateFormat(payment.date, false)
            res.status(200).send({payment});
        }else{
            res.status(500).send();
        }
    } catch (error) {
        next(error)
    }
}

async function deletePayment(req, res, next){

    const queryObject = url.parse(req.url,true).query;

    const id = queryObject.id;

    const originalpayment = await mPayment.getById(id);

    if (originalpayment  === undefined) {
        res.status(400).send({ message: 'Pagamento não encontrado.' }).end();
        return null
    }
   
    try {
        result = await mPayment.delete(id);
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
module.exports.delete = deletePayment;