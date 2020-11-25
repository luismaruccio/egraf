const database = require('../database/mariadb'); 
const utils = require('../helper/utils');

async function getMonetaryMovements(day, company) {
    const [initialDate, endDate] = utils.ParseDay(day);

    const query = `
    SELECT 
        p.description, 
        u.name as userName, 
        p.entryExit, 
        p.date, 
        s.description AS os, 
        p.amount
    FROM payment p
    JOIN users u ON (u.id = p.user)
    LEFT JOIN serviceOrders s ON (s.id = p.serviceOrder)
    WHERE 
        p.date BETWEEN ? AND ? AND 
        p.enable = ? AND 
        p.company = ?
    ORDER BY 
        p.date, p.entryExit`
    const parms = Object.assign({}, [initialDate, endDate, 1, company])
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function treatMonetaryMovementsValues(monetaryMovementsDB) {

    var MonetaryMovements = monetaryMovementsDB.map(function(monetaryMovement){
        return {
                    description: monetaryMovement.description,
                    userName: monetaryMovement.username,
                    entryExit: monetaryMovement.entryExit,
                    date: utils.ParseDateFormat(monetaryMovement.date, false),
                    os: monetaryMovement.os,
                    amount: utils.ParseNumberToBRLocale(monetaryMovement.amount, true)
                }
    });

    return MonetaryMovements;

}

async function getServiceOrdersByStatus(status, company) {
    const query = `
    SELECT 
        o.description, 
        c.name AS client, 
        o.requestDate, 
        o.deliveryDate, 
        o.totalPrice, 
        u.name AS user, 
        sos.name AS statusOS, 
        sp.description AS paymentStatus
    FROM serviceOrders o
    JOIN clients c ON c.id = o.client
    JOIN users u ON u.id = o.user
    JOIN sostatus sos ON sos.id = o.status
    JOIN paymentStatus sp ON sp.id = o.paymentStatus
    WHERE 
        o.enable = ? AND 
        o.status = ? AND
        o.company = ?
    ORDER BY o.id`
    const parms = Object.assign({}, [1, status, company])
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function treatServiceOrdersValues(serviceOrdersDB) {

    var ServiceOrders = serviceOrdersDB.map(function(serviceOrder){
        return {
                    description: serviceOrder.description,
                    client: serviceOrder.client,
                    requestDate: utils.ParseDateFormat(serviceOrder.requestDate, false),
                    deliveryDate: serviceOrder.deliveryDate == undefined ? null : utils.ParseDateFormat(serviceOrder.deliveryDate, false),
                    totalPrice: utils.ParseNumberToBRLocale(serviceOrder.totalPrice, true),
                    user: serviceOrder.user,
                    statusOS: serviceOrder.statusOS,
                    paymentStatus: serviceOrder.paymentStatus
                }
    });

    return ServiceOrders;

}

async function getClientsWithAmountDue(company) {
    const query = `
    SELECT 
        c.name, 
        c.tellNumber, 
        c.email, 
        SUM(so.totalPrice) AS totalDueAmount, 
        SUM(p.amount) AS totalPaymentAmount, 
        (SUM(so.totalPrice) - SUM(p.amount)) AS remainingDueAmount
    FROM clients c
    JOIN serviceOrders so ON so.client = c.id AND so.paymentStatus IN (1,2) AND so.enable = 1
    JOIN payment p ON p.serviceOrder = so.id AND p.enable = 1
    WHERE 
        c.enable = 1 AND
        c.company = ?
    GROUP BY c.name`
    const parms = Object.assign({}, [company])
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function treatClientsWithAmountDueValues(ClientsWithAmountDueDB) {

    var ClientsWithAmountDue = ClientsWithAmountDueDB.map(function(clientWithAmountDue){
        return {
                    name: clientWithAmountDue.name,
                    tellNumber: clientWithAmountDue.tellNumber,
                    email: clientWithAmountDue.email,
                    totalDueAmount: utils.ParseNumberToBRLocale(clientWithAmountDue.totalDueAmount, true),
                    totalPaymentAmount: utils.ParseNumberToBRLocale(clientWithAmountDue.totalPaymentAmount, true),
                    remainingDueAmount: utils.ParseNumberToBRLocale(clientWithAmountDue.remainingDueAmount, true)
                }
    });

    return ClientsWithAmountDue;
}

module.exports.getMonetaryMovements = getMonetaryMovements;
module.exports.treatMonetaryMovementsValues = treatMonetaryMovementsValues;
module.exports.getServiceOrdersByStatus = getServiceOrdersByStatus;
module.exports.treatServiceOrdersValues = treatServiceOrdersValues;
module.exports.getClientsWithAmountDue = getClientsWithAmountDue;
module.exports.treatClientsWithAmountDueValues = treatClientsWithAmountDueValues;