const utils = require('../helper/utils')
const mServiceOrder = require('../model/product')
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



module.exports.insert = insert;
//module.exports.getAll = getAll;
//module.exports.update = update;
//module.exports.delete = deleteProduct;