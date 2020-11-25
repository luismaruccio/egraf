const utils = require('../helper/utils')
const mItemServiceOrder = require('../model/itemServiceOrders')
const url = require('url');

async function insert(req, res, next) {

    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'O corpo da requisição está em branco.' }).end()
        return null
    }

    const serviceOrderId = req.serviceOrder.id;

    const items = req.body.items;

    try {
        for (const [idx, item] of items.entries()) {

            const itemService = {
                serviceOrder: serviceOrderId,
                product: item.product,
                quantity: item.quantity
            }

            const result = await mItemServiceOrder.insert(itemService);
            
            if(result.affectedRows == 0){
                res.status(500).send({message: "Houve um erro ao inserir o item"});             
            }
        }

        const serviceOrder = req.serviceOrder;
        serviceOrder.items = await mItemServiceOrder.getByServiceOrderId(serviceOrderId);

        res.status(200).send({serviceOrder});

    } catch (error) {
        res.status(500).send({message: "Houve um erro ao inserir o item: " + error.message});
    }
}

async function update(req, res, next) {

    if(!req.body || req.body === ''){
        res.status(400).send({ message: 'O corpo da requisição está em branco.' }).end()
        return null
    }

    const serviceOrderId = req.serviceOrder.id;

    const itemsServiceOrders = await mItemServiceOrder.getByServiceOrderId(serviceOrderId);

    const items = req.body.items;

    try {

        var itemReqs = items.map(function(itemReq){
            return {
                        product: itemReq.product,
                        quantity: itemReq.quantity
                    }
        });

        for (const [idx, itemFromDB] of itemsServiceOrders.entries()) {

            var itemToUpdate = itemReqs.find(item => item.product === itemFromDB.product)

            if (itemToUpdate != undefined) {

                itemToUpdate.serviceOrder = serviceOrderId;

                const result = await mItemServiceOrder.update(itemToUpdate, serviceOrderId);
            
                if(result.affectedRows == 0){
                    res.status(500).send({message: "Houve um erro ao atualizar o item"});             
                }

            }
            else {

                const result = await mItemServiceOrder.delete(itemFromDB, serviceOrderId);
            
                if(result.affectedRows == 0){
                    res.status(500).send({message: "Houve um erro ao deletar o item"});             
                }
                
            }            

        }

        for (const [idx, itemFromReq] of itemReqs.entries()) {

            var itemFound = itemsServiceOrders.find(item => item.product === itemFromReq.product)

            if (itemFound == undefined) {

                const itemService = {
                    serviceOrder: serviceOrderId,
                    product: itemFromReq.product,
                    quantity: itemFromReq.quantity
                }
    
                const result = await mItemServiceOrder.insert(itemService);
                
                if(result.affectedRows == 0){
                    res.status(500).send({message: "Houve um erro ao inserir o item"});             
                }
            }          
        }

        const serviceOrder = req.serviceOrder;
        serviceOrder.items = await mItemServiceOrder.getByServiceOrderId(serviceOrderId);

        res.status(200).send({serviceOrder});

    } catch (error) {
        res.status(500).send({message: "Houve um erro ao atulizar o item: " + error.message});
    }
}

async function getAll(req, res, next) {

    try {

        const serviceOrdersFromReq = req.serviceOrder;   
        
        var ServiceOrders = [];

        for (const [idx, serviceOrderFromReq] of serviceOrdersFromReq.entries()) {

            var serviceOrderId = serviceOrderFromReq.id;
            
            var itens = await mItemServiceOrder.getAll(serviceOrderId);

            itens = await mItemServiceOrder.treatServiceOrdersItensValues(itens);
            
            serviceOrderFromReq.items = itens;

            ServiceOrders.push(serviceOrderFromReq);

        }

        res.status(200).send({ServiceOrders});
    
        return next();
    } catch (error) {
        res.status(500).send({message: "Houve um erro ao obter a ordem de serviço: " + error.message});
    }
}

async function deleteItemServiceOrder(req, res, next){

    const id = req.serviceOrderId;
   
    try {
        result = await mItemServiceOrder.deleteAll(id);
        if(result.affectedRows > 0){
            res.status(200).send({status: 'ok'});
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
module.exports.delete = deleteItemServiceOrder;