import {Schema, model} from 'mongoose';

interface OrderModel {
    cid: number,
    did: number
    delivered : boolean,
    content: string[],
    price: number,
    date: number
}

const orderSchema = new Schema<OrderModel>({
    cid: {
        type :Number,
        required: true
    },
    did: {
        type :Number,
        required: false,
        default: 0
    },
    delivered: {
        type :Boolean,
        required: false,
        default: false
    },
    content: {
        type :Array,
        required: true
    },
    price: {
        type :Number,
        required: true
    },
    orderedAt: {
        type: Date,
        default: Date.now()
    },
    deliveredAt: {
        type: Date
    }
})

const orderModel = model('Order', orderSchema)

exports.getAllOrders = async () => {
    const orders = await orderModel.find();
    return orders;
}

exports.getAllOrdersbyCustomer = async (cid:number) => {
    const orders = await orderModel.find( {cid: cid});
    return orders;
}

exports.getAllOrdersbyDeliveryman = async (did:number) => {
    const orders = await orderModel.find( {did: did});
    return orders;
}

exports.getOneOrder = async (req:any) => {
    const order = await orderModel.findOne( {_id: req.params.id})
    return order
}

exports.createOrder = (orderData:any) => {
    orderData['orderedAt'] = Date.now()
    orderData['deliveredAt'] = null
    orderData['did'] = 0
    orderData['delivered'] = false

    const order = new orderModel(orderData);
    return order.save();
};

exports.updateOneOrder = async (id:any, body:any) => {
    const order = await orderModel.findOneAndUpdate({_id: id}, body, {
        new: true
    });
    order.save();
    return order
}

exports.acceptOrder = async (orderID:any, UID: any) => {
    const order = await orderModel.findOneAndUpdate({_id: orderID}, {did: UID}, {
        new: true
    });
    order.save();
    return order
}

exports.deliverOrder = async (orderID:any) => {
    const order = await orderModel.findOneAndUpdate({_id: orderID}, {delivered: true, deliveredAt: Date.now()}, {
        new: true
    });
    order.save();
    return order
}

exports.deleteOrder = async (orderID:any) => {
    const order = await orderModel.deleteOne({_id:orderID})
    return order
};

exports.getOrderCount = async () => {
    const count = await orderModel.countDocuments()
    return count
}

exports.getOrderTotalPrice = async () => {
    const total = await orderModel.aggregate([{
        $group: {
            _id: '',
            totalAmount: { $sum: '$price' }
        }
    }, {
        $project: {
            _id: 0
        }
    }])
    return total[0].totalAmount
}

export default orderModel;
