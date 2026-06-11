const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    deliveryAddress: {
        street: String,
        city: String
    },
    startDate: { type: Date, required: true },
    days: { type: Number, required: true }, // e.g., 7 days
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // Track generated orders
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
