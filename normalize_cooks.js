const mongoose = require('mongoose');
const User = require('./models/User');
const Dish = require('./models/Dish');
require('dotenv').config();

const cities = ['Hyderabad', 'Vijayawada', 'Guntur', 'Visakhapatnam'];

async function normalize() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gharkakhana');
        console.log('Connected to MongoDB');

        // 1. Normalize Cooks
        const cooks = await User.find({ role: 'cook' });
        console.log(`Found ${cooks.length} cooks`);

        for (const cook of cooks) {
            let updated = false;

            // Set Verification
            if (cook.verificationStatus !== 'verified' && cook.verificationStatus !== 'trusted') {
                cook.verificationStatus = 'verified';
                updated = true;
            }

            // Set Badges
            if (!cook.badges || cook.badges.length === 0) {
                cook.badges = ['Hygiene Star', 'Local Hero'];
                updated = true;
            }

            // Set Specific City if missing or generic
            const currentCity = cook.address?.city;
            if (!currentCity || currentCity.toLowerCase() === 'andhra pradesh') {
                const randomCity = cities[Math.floor(Math.random() * cities.length)];
                if (!cook.address) cook.address = {};
                cook.address.city = randomCity;
                cook.address.state = 'Andhra Pradesh';
                updated = true;
            }

            if (updated) {
                await cook.save();
                console.log(`Normalized cook: ${cook.name}`);
            }
        }

        // 2. Normalize Dishes (Rating/Reviews)
        const dishes = await Dish.find();
        console.log(`Found ${dishes.length} dishes`);

        for (const dish of dishes) {
            let updated = false;

            if (!dish.rating || dish.rating === 0) {
                dish.rating = 4.5 + Math.random() * 0.5; // Random between 4.5 and 5.0
                dish.rating = Math.round(dish.rating * 10) / 10;
                updated = true;
            }

            if (!dish.reviewsCount || dish.reviewsCount === 0) {
                dish.reviewsCount = Math.floor(Math.random() * 200) + 50; // Random 50-250
                updated = true;
            }

            if (updated) {
                await dish.save();
                console.log(`Normalized dish: ${dish.name}`);
            }
        }

        console.log('Normalization complete!');
        process.exit(0);
    } catch (err) {
        console.error('Normalization failed:', err);
        process.exit(1);
    }
}

normalize();
