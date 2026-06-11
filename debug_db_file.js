const mongoose = require('mongoose');
const Dish = require('./models/Dish');
const User = require('./models/User');
const fs = require('fs');
require('dotenv').config();

const checkData = async () => {
    let output = '';
    const log = (msg) => { output += msg + '\n'; };

    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gharkakhana');

        const dishes = await Dish.find().populate('cook');
        log(`Total dishes: ${dishes.length}`);

        dishes.forEach((dish, i) => {
            log(`\nDish ${i + 1}: ${dish.name}`);
            log(`Cook Name: ${dish.cook?.name || 'MISSING'}`);
            log(`City in DB: "${dish.cook?.address?.city || 'MISSING'}"`);
        });

        const allCooks = await User.find({ role: 'cook' });
        log(`\nAll Cooks in DB: ${allCooks.length}`);
        allCooks.forEach(c => {
            log(`- ${c.name}: "${c.address?.city}" (${c.email})`);
        });

        fs.writeFileSync('db_dump.txt', output);
        console.log('Dumped to db_dump.txt');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkData();
