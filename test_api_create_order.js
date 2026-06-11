const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Dish = require('./models/Dish');

async function testOrder() {
    try {
        console.log("Connecting to DB to fetch valid IDs...");
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gharkakhana');

        const user = await User.findOne();
        const dish = await Dish.findOne();

        if (!user || !dish) {
            console.error("❌ database is empty (no user or dish found). Verification failed.");
            return;
        }

        console.log(`✅ Found User: ${user.name} (${user._id})`);
        console.log(`✅ Found Dish: ${dish.name} (${dish._id})`);

        await mongoose.disconnect();

        console.log("Attempting to create order via API...");

        const payload = {
            customer: user._id,
            items: [{
                dish: dish._id,
                quantity: 1,
                price: dish.price
            }],
            totalAmount: dish.price + 40,
            deliveryAddress: { city: 'Test City', street: 'Test Street' },
            paymentMethod: 'cod',
            deliveryType: 'standard'
        };

        const res = await axios.post('http://localhost:5000/api/orders', payload);
        console.log("✅ API Response: Order Created!", res.data._id);

    } catch (err) {
        console.error("❌ API Test Failed:", err.response ? err.response.data : err.message);
    }
}

testOrder();
