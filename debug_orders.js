const mongoose = require('mongoose');
require('dotenv').config();

const Order = require('./models/Order');

async function checkOrders() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gharkakhana');
        console.log('Connected to MongoDB');

        const orders = await Order.find({});
        console.log(`Found ${orders.length} orders in the database.`);

        if (orders.length > 0) {
            console.log('Sample Order:', JSON.stringify(orders[0], null, 2));
        } else {
            console.log('No orders found. The collection is empty.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

checkOrders();
