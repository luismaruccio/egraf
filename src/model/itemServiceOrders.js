const database = require('../database/mariadb'); 
const utils = require('../helper/utils');

async function insert(soItens) {
    const query = `
    INSERT INTO soItens
    (
        serviceOrder,
        product,
        quantity
    ) 
    VALUES(?, ?, ?)`
    const {serviceOrder, product, quantity} = soItens;
    const parms = Object.assign({}, [serviceOrder, product, quantity])
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function getByServiceOrderId(serviceOrderId) {
    const query = `
    SELECT
        product,
        quantity
    FROM
        soItens
    WHERE
        serviceOrder = ? and
        enable = ?
    `;

    const parms = Object.assign({}, [serviceOrderId, '1'])

    try {
        const queryResult = await database.executeQuery(query, parms);
        return await queryResult;
    } catch (error) {
        console.log(error)
    }
}

async function update(soItens, serviceOrderId) {
    const query = `
    UPDATE soItens
    SET
        quantity = ?
    WHERE
        product = ? AND
        serviceOrder = ?
    `
    const {product, quantity} = soItens;
    const parms = Object.assign({}, [quantity, product, serviceOrderId])
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function falseDelete(soItens, serviceOrderId) {
    const query = `
    UPDATE soItens
    SET
        enable = 0
    WHERE
        product = ? AND
        serviceOrder = ?
    `
    const {product} = soItens;
    const parms = Object.assign({}, [product, serviceOrderId])
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function getAll(ServiceOrderId) {

    const query = `
    SELECT
        id,
        product,
        quantity
    FROM
    soItens
    WHERE
        enable = ? and
        serviceOrder = ?
    `;
    const parms = Object.assign({}, [1, ServiceOrderId])

    try {
        const queryResult = await database.executeQuery(query, parms);
        return queryResult
    } catch (error) {
        console.log(error)
    }

}

async function treatServiceOrdersItensValues(serviceOrdersItensFromDB){

    var serviceOrdersItens = serviceOrdersItensFromDB.map(function(ItemServiceOrder){
        return {
                    id: ItemServiceOrder.id,
                    product: ItemServiceOrder.product,
                    quantity: utils.ParseNumberToBRLocale(ItemServiceOrder.quantity)
                }
    });

    return serviceOrdersItens;
}

async function deleteAll(serviceOrderId) {
    const query = `
    UPDATE soItens
    SET
        enable = 0
    WHERE
        serviceOrder = ?
    `
    const parms = Object.assign({}, [serviceOrderId])
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}


module.exports.insert = insert;
module.exports.getByServiceOrderId = getByServiceOrderId;;
//module.exports.getById = getById;
module.exports.getAll = getAll;
module.exports.treatServiceOrdersItensValues = treatServiceOrdersItensValues;
module.exports.update = update;
module.exports.delete = falseDelete;
module.exports.deleteAll = deleteAll;