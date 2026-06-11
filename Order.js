const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true } // Snapshot of price at time of order
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['placed', 'accepted', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'placed'
    },
    deliveryAddress: {
        street: String,
        city: String,
        zip: String,
        phone: String
    },
    deliveryType: { type: String, enum: ['standard', 'express'], default: 'standard' },
    paymentMethod: { type: String, enum: ['cod', 'online'], default: 'cod' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
