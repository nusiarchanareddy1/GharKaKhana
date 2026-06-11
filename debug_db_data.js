const mongoose = require('mongoose');
const Dish = require('./models/Dish');
const User = require('./models/User');
require('dotenv').config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gharkakhana');

        const dishes = await Dish.find().populate('cook');
        console.log(`Total dishes: ${dishes.length}`);

        dishes.forEach((dish, i) => {
            console.log(`\nDish ${i + 1}: ${dish.name}`);
            console.log(`Cook: ${dish.cook?.name || 'MISSING'}`);
            console.log(`City in DB: "${dish.cook?.address?.city || 'MISSING'}"`);
        });

        const allCooks = await User.find({ role: 'cook' });
        console.log(`\nAll Cooks in DB: ${allCooks.length}`);
        allCooks.forEach(c => {
            console.log(`- ${c.name}: "${c.address?.city}"`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkData();
