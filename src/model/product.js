const database = require('../database/mariadb'); 
const utils = require('../helper/utils');

async function insert(product) {
    const query = `
    INSERT INTO products
    (
        name,
        isService,
        price,
        quantity,
        company
    ) 
    VALUES(?, ?, ?, ?, ?)`
    const parms = Object.assign({}, product)
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function getById(id) {
    const query = `
    SELECT
        id,
        name,
        isService,
        price,
        quantity,
        company,
        enable
    FROM
        products
    WHERE
        id = ?
    `;

    const parms = Object.assign({}, [id])

    try {
        const queryResult = await database.executeQuery(query, parms);
        const [client, meta] = await queryResult;
        return client
    } catch (error) {
        console.log(error)
    }

}

async function getAll(company = 0) {
    const companyQuery = company > 0 ? "and company = ?" : "";


    const query = `
    SELECT
        id,
        name,
        isService,
        price,
        quantity,
        company
    FROM
    products
    WHERE
        enable = ?
        ${companyQuery}
    `;
    const parms = Object.assign({}, [1, company])

    try {
        const queryResult = await database.executeQuery(query, parms);
        return queryResult
    } catch (error) {
        console.log(error)
    }

}

async function treatProductsValues(productsFromDB){

    var products = productsFromDB.map(function(product){
        return {
                    id: product.id,
                    name: product.name,
                    isService: utils.TinyIntToBool(product.isService),
                    price: utils.ParseNumberToBRLocale(product.price, true),
                    quantity: utils.ParseNumberToBRLocale(product.quantity),
                    company: product.company
                }
    });

    return products;
}

async function update(id, product) {
    const query = `
    UPDATE products
    SET
        name = ?,
        isService = ?,
        price = ?,
        quantity = ?,
        company = ?
    WHERE
        id = ?`
    const {name, isService, price, quantity, company} = product;
    const parms = Object.assign({}, [name, isService, price, quantity, company, id])
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function falseDelete(id){
    const query = `
    UPDATE products
    SET
        enable = 0
    WHERE
        id = ?`
    const parms = Object.assign({}, [id])
    console.log(parms)
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

module.exports.insert = insert;
module.exports.getById = getById;
module.exports.getAll = getAll;
module.exports.treatProductsValues = treatProductsValues;
module.exports.update = update;
module.exports.delete = falseDelete;