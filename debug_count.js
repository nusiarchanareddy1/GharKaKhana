const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('./models/Order');
const Dish = require('./models/Dish');

async function checkCounts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gharkakhana');
        console.log('Connected to MongoDB');

        const orderCount = await Order.countDocuments();
        const dishCount = await Dish.countDocuments();

        console.log(`TOTAL ORDERS: ${orderCount}`);
        console.log(`TOTAL DISHES: ${dishCount}`);

        if (orderCount > 0) {
            const lastOrder = await Order.findOne().sort({ createdAt: -1 });
            console.log('LAST ORDER TIME:', lastOrder.createdAt);
        }

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}
checkCounts();
