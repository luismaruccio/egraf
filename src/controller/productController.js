const utils = require('../helper/utils')
const mProduct = require('../model/product')
const url = require('url');

async function insert(req, res, next) {

    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'O corpo da requisição está em branco.' }).end()
        return null
    }

    const product = {
        name: req.body.name,
        isService: req.body.isService ? "1" : "0",
        price: utils.ParseNumberToDB(req.body.price),
        quantity: utils.ParseNumberToDB(req.body.quantity),
        company: req.body.company,
    }    

    try {
        result = await mProduct.insert(product);
        if(result.affectedRows === 1){
            const product = await mProduct.getById(result.insertId);
            product.price = utils.ParseNumberToBRLocale(product.price, true);
            product.quantity = utils.ParseNumberToBRLocale(product.quantity);
            product.isService = utils.TinyIntToBool(product.isService);
            res.status(200).send({product});
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
        var users = await mProduct.getAll(company);
        users = await mProduct.treatProductsValues(users);
        return res.status(200).send({users})
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

    const originalProduct = await mProduct.getById(id);

    if (originalProduct  === undefined) {
        res.status(400).send({ message: 'Produto não encontrado.' }).end();
        return null
    }

    const product = {
        name: req.body.name,
        isService: req.body.isService ? "1" : "0",
        price: utils.ParseNumberToDB(req.body.price),
        quantity: utils.ParseNumberToDB(req.body.quantity),
        company: req.body.company,
    }

    try {
        result = await mProduct.update(id, product);
        if(result.affectedRows === 1){
            const product = await mProduct.getById(id);
            product.price = utils.ParseNumberToBRLocale(product.price, true);
            product.quantity = utils.ParseNumberToBRLocale(product.quantity);
            product.isService = utils.TinyIntToBool(product.isService);
            res.status(200).send({product});
        }else{
            res.status(500).send();
        }
    } catch (error) {
        next(error)
    }

}

async function deleteProduct(req, res, next){

    const queryObject = url.parse(req.url,true).query;

    const id = queryObject.id;

    const originalProduct = await mProduct.getById(id);

    if (originalProduct  === undefined) {
        res.status(400).send({ message: 'Produto não encontrado.' }).end();
        return null
    }
   
    try {
        result = await mProduct.delete(id);
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
module.exports.delete = deleteProduct;