const mReport = require('../model/report')
const url = require('url');

async function getMonetaryMovements(req, res, next) {

    const queryObject = url.parse(req.url,true).query;

    const day = queryObject.day;
    const company = req.authCompany;
    
    try {
        result = await mReport.getMonetaryMovements(day, company);
        if (result == null) {
            res.status(400).send({ message: 'Não foi encontrado movimentações para este dia.' }).end()
        }
        else {
            const MonetaryMovements = await mReport.treatMonetaryMovementsValues(result);
            res.status(200).send({MonetaryMovements});
        }
    } catch (error) {
        next(error)
    }
}

async function getServiceOrdersByStatus(req, res, next) {

    const queryObject = url.parse(req.url,true).query;

    const status = queryObject.status;
    const company = req.authCompany;
    
    try {
        result = await mReport.getServiceOrdersByStatus(status, company);
        if (result == null) {
            res.status(400).send({ message: 'Não foi encontrado Ordens de Serviço com este Status' }).end()
        }
        else {
            const ServiceOrders = await mReport.treatServiceOrdersValues(result);
            res.status(200).send({ServiceOrders});
        }
    } catch (error) {
        next(error)
    }
}

async function getClientsWithAmountDue(req, res, next) {

    const company = req.authCompany;
    
    try {
        result = await mReport.getClientsWithAmountDue(company);
        if (result == null) {
            res.status(400).send({ message: 'Não foi encontrado nenhum cliente com saldo devedor' }).end()
        }
        else {
            const ClientsWithAmountDue = await mReport.treatClientsWithAmountDueValues(result);
            res.status(200).send({ClientsWithAmountDue});
        }
    } catch (error) {
        next(error)
    }
}

module.exports.getMonetaryMovements = getMonetaryMovements;
module.exports.getServiceOrdersByStatus = getServiceOrdersByStatus;
module.exports.getClientsWithAmountDue = getClientsWithAmountDue;