const express = require('express')
const router = express.Router()
const Order = require("../models/order.model");
const RoleController = require('../controller/role.controller')

router.get('/', function (req, res)
{
    Order.getAllOrders().then( (orders) => {
        res.json(orders)
    })
})

router.get('/:id', function (req, res)
{
    Order.getOneOrder(req).then((order) => {
        res.json(order)
    })
})

router.get('/deliver/:orderID', function (req, res)
{
    if(req.body.roleToken === 3){
        Order.deliverOrder(req.params.orderID)
        res.status(201).send('you delivered a new order')
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }

})

router.get('/accept/:id/:userID', function (req, res)
{
    if(req.body.roleToken === 3) {
        Order.acceptOrder(req.params.id, req.params.userID)
        res.status(201).send('you accepted a new order')
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

router.get('/user/:userID', function (req, res)
{
        Order.getAllOrdersbyCustomer(req.params.userID).then( (orders) => {
            res.json(orders)
        })
})

router.get('/deliveryman/:userID', function (req, res)
{
    Order.getAllOrdersbyDeliveryman(req.params.userID).then( (orders) => {
        res.json(orders)
    })
})

router.post('/', function (req, res)
{
    if(req.body.roleToken === 1) {
        Order.createOrder(RoleController.getBody(req.body)).then((data) => {
            res.json(data)
        })
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

router.put('/:id', function (req, res)
{
    if(req.body.roleToken === 1) {
        Order.updateOneOrder(req.params.id,RoleController.getBody(req.body))
        res.status(201).send('you updated an order')
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

router.delete('/:id', function (req, res)
{
    if(req.body.roleToken === 1) {
        Order.deleteOrder(req.params.id)
        res.status(201).send('you deleted an order')
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

module.exports = router;