const mongoose = require('mongoose');
const Dish = require('./models/Dish');
const User = require('./models/User');
require('dotenv').config();

const seedDishes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gharkakhana');

        // Find diverse cooks (created by rich_seed.js)
        const cookData = [
            { name: 'Lakshmi Amma', email: 'lakshmi@example.com', city: 'Vijayawada' },
            { name: 'Rajeswari Garu', email: 'rajeswari@example.com', city: 'Hyderabad' },
            { name: 'Srinivasa Rao', email: 'srinu@example.com', city: 'Guntur' },
            { name: 'Venkatesh', email: 'venky@example.com', city: 'Visakhapatnam' }
        ];

        const cooks = [];
        for (const data of cookData) {
            const cook = await User.findOne({ email: data.email });
            if (!cook) {
                console.error(`Cook not found: ${data.email}. Run seed_rich.js first.`);
                process.exit(1);
            }
            cooks.push(cook);
        }

        const getCook = (city) => cooks.find(c => c.address.city === city)._id;

        const newDishes = [
            // Pickles
            {
                name: 'Avakaya Pachadi (Mango Pickle)',
                description: 'Traditional Andhra spicy mango pickle made with raw mangoes, mustard powder, and red chilly powder.',
                price: 250,
                image: 'http://localhost:5000/uploads/avakayapachadi.jpg',
                category: 'veg',
                tags: ['Pickles', 'Spicy', 'Andhra', 'Seasonal'],
                cook: getCook('Guntur'),
                ingredients: ['Raw Mango', 'Mustard Powder', 'Red Chili Powder', 'Gingelly Oil', 'Garlic'],
                healthBenefits: ['Probiotic', 'Aids digestion', 'Rich in Vitamin C'],
                nutritionalInfo: { calories: 150, protein: '2g', fats: '12g', carbs: '8g' },
                healthTips: 'Consume in moderation as it is high in salt/oil.',
                whyChooseThis: 'Hand-cut mangoes and sun-dried spices.',
                deliveryTime: '24 hrs',
                rating: 4.8,
                reviewsCount: 320
            },
            {
                name: 'Gongura Pachadi',
                description: 'Tangy sorrel leaves pickle, a staple in every Andhra household.',
                price: 200,
                image: 'http://localhost:5000/uploads/gongurapachadi.jpg',
                category: 'veg',
                tags: ['Pickles', 'Tangy', 'Gongura'],
                cook: getCook('Vijayawada'),
                ingredients: ['Gongura leaves', 'Red Chilies', 'Garlic', 'Tamarind'],
                healthBenefits: ['Iron rich', 'Good for anemia', 'Leafy green benefits'],
                nutritionalInfo: { calories: 120, protein: '3g', fats: '10g', carbs: '5g' },
                healthTips: 'Great with hot rice and ghee.',
                whyChooseThis: 'Made with organic Gongura from our farm.',
                deliveryTime: '24 hrs',
                rating: 4.7,
                reviewsCount: 145
            },

            // Ice Creams / Cool
            {
                name: 'Homemade Sitaphal Ice Cream',
                description: 'Creamy custard apple ice cream made with fresh pulp and milk. No artificial flavors.',
                price: 180,
                image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                category: 'veg',
                tags: ['Ice Cream', 'Dessert', 'Fruit'],
                cook: getCook('Hyderabad'),
                ingredients: ['Sitaphal (Custard Apple) Pulp', 'Full Cream Milk', 'Sugar', 'Cream'],
                healthBenefits: ['High in Vitamin C', 'Natural sugars', 'Cooling'],
                nutritionalInfo: { calories: 250, protein: '6g', fats: '15g', carbs: '30g' },
                healthTips: 'A perfect summer treat.',
                whyChooseThis: 'Using hand-scooped pulp, not frozen.',
                deliveryTime: '30-45 min',
                rating: 4.9,
                reviewsCount: 78
            },
            {
                name: 'Kulfi Falooda',
                description: 'Rose flavored milk with vermicelli, basil seeds, and homemade malai kulfi.',
                price: 150,
                image: 'http://localhost:5000/uploads/kulfifalooda.jpg',
                category: 'veg',
                tags: ['Dessert', 'Cool', 'Sweet'],
                cook: getCook('Hyderabad'),
                ingredients: ['Milk', 'Rose Syrup', 'Sabja Seeds', 'Vermicelli', 'Kulfi'],
                healthBenefits: ['Cooling (Sabja)', 'Calcium rich'],
                nutritionalInfo: { calories: 350, protein: '8g', fats: '12g', carbs: '50g' },
                healthTips: 'Sabja seeds help in reducing body heat.',
                whyChooseThis: 'Layered beautifully and served chilled.',
                deliveryTime: '30 min',
                rating: 4.6,
                reviewsCount: 54
            }
        ];

        await Dish.insertMany(newDishes);
        console.log('Menu expanded with Pickles and Ice Creams from diverse locations!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDishes();
