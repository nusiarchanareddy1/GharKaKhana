const mongoose = require('mongoose');
const Dish = require('./models/Dish');
const User = require('./models/User');
require('dotenv').config();

const seedDishes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gharkakhana');

        // CLEAR ALL DATA to ensure clean state
        await Dish.deleteMany({});
        await User.deleteMany({ role: 'cook' });
        console.log('Cleared all dishes and cooks.');

        // Create diverse cooks
        const cookData = [
            { name: 'Lakshmi Amma', email: 'lakshmi@example.com', city: 'Vijayawada', bio: 'Expert in traditional Andhra snacks and sweets.' },
            { name: 'Rajeswari Garu', email: 'rajeswari@example.com', city: 'Hyderabad', bio: 'Specialist in authentic Hyderabadi biryani and curries.' },
            { name: 'Srinivasa Rao', email: 'srinu@example.com', city: 'Guntur', bio: 'Known for the spiciest and most flavorful Guntur style dishes.' },
            { name: 'Venkatesh', email: 'venky@example.com', city: 'Visakhapatnam', bio: 'Coastal Andhra seafood and traditional Rayalaseema specials.' }
        ];

        const cooks = [];
        for (const data of cookData) {
            const cook = new User({
                name: data.name,
                email: data.email,
                password: 'hashed_password',
                role: 'cook',
                address: { city: data.city, state: 'Andhra Pradesh' },
                bio: data.bio,
                verificationStatus: 'verified',
                badges: ['Hygiene Star', 'Local Hero']
            });
            await cook.save();
            cooks.push(cook);
        }

        const getCook = (city) => cooks.find(c => c.address.city === city)._id;

        const newDishes = [
            {
                name: 'Hyderabadi Chicken Dum Biryani',
                description: 'Authentic dum style biryani cooked with basmati rice and tender chicken marinated in exotic spices.',
                price: 350,
                image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                category: 'non-veg',
                tags: ['Biryani', 'Spicy', 'Hyderabadi', 'Telangana'],
                cook: getCook('Hyderabad'),
                ingredients: ['Basmati Rice', 'Chicken', 'Saffron', 'Ghee', 'Cardamom', 'Cloves', 'Mint Leaves'],
                healthBenefits: ['Protein-rich', 'Mood booster (Saffron)', 'Digestive spices'],
                nutritionalInfo: { calories: 450, protein: '25g', fats: '15g', carbs: '60g' },
                healthTips: 'Best eaten with raita to balance the spice levels.',
                whyChooseThis: 'Cooked in traditional clay pot for authentic earthy flavor.',
                deliveryTime: '45-60 min',
                rating: 4.9,
                reviewsCount: 156
            },
            {
                name: 'Gongura Mutton',
                description: 'Spicy and tangy mutton curry made with sorrel leaves, a specialty of Andhra Pradesh.',
                price: 420,
                image: 'http://localhost:5000/uploads/mutton.jpg',
                category: 'non-veg',
                tags: ['Curries', 'Spicy', 'Andhra', 'Mutton'],
                cook: getCook('Guntur'),
                ingredients: ['Mutton', 'Gongura (Sorrel leaves)', 'Red Chilies', 'Garlic', 'Mustard Seeds'],
                healthBenefits: ['Rich in Iron (Gongura)', 'High Protein', 'Vitamin C'],
                nutritionalInfo: { calories: 380, protein: '28g', fats: '22g', carbs: '10g' },
                healthTips: 'Excellent for boosting hemoglobin levels.',
                whyChooseThis: 'The gongura leaves are sourced fresh from my own garden.',
                deliveryTime: '40-50 min',
                rating: 4.8,
                reviewsCount: 89
            },
            {
                name: 'Ragi Sangati with Natu Kodi Pulusu',
                description: 'Finger millet balls served with spicy country chicken curry. A Rayalaseema delicacy.',
                price: 390,
                image: 'http://localhost:5000/uploads/raagisangati.jpg',
                category: 'non-veg',
                tags: ['Traditional', 'Rayalaseema', 'Curries'],
                cook: getCook('Visakhapatnam'),
                ingredients: ['Ragi (Finger Millet)', 'Rice', 'Country Chicken', 'Onions', 'Coriander'],
                healthBenefits: ['High Calcium (Ragi)', 'Good for bones', 'Gluten-free option'],
                nutritionalInfo: { calories: 410, protein: '30g', fats: '10g', carbs: '50g' },
                healthTips: 'Perfect meal for lunch to sustain energy all day.',
                whyChooseThis: 'Using organic antibiotic-free country chicken.',
                deliveryTime: '50-60 min',
                rating: 4.7,
                reviewsCount: 65
            },
            {
                name: 'Gutti Vankaya Curry',
                description: 'Stuffed brinjal curry cooked in a nutty peanut and sesame masala base. Pure Andhra style.',
                price: 220,
                image: 'http://localhost:5000/uploads/guttivankaya.jpg',
                category: 'veg',
                tags: ['Curries', 'Veg', 'Andhra'],
                cook: getCook('Vijayawada'),
                ingredients: ['Purple Brinjals', 'Peanuts', 'Sesame Seeds', 'Tamarind', 'Jaggery'],
                healthBenefits: ['Low calorie', 'Rich in antioxidants', 'Heart healthy fats (nuts)'],
                nutritionalInfo: { calories: 250, protein: '6g', fats: '15g', carbs: '20g' },
                healthTips: 'Great with hot steamed rice and ghee.',
                whyChooseThis: 'Made with baby brinjals hand-picked from local market.',
                deliveryTime: '30-40 min',
                rating: 4.6,
                reviewsCount: 42
            },
            {
                name: 'Chepala Pulusu (Nellore Fish Curry)',
                description: 'Tangy and spicy fish curry made in traditional tamarind sauce.',
                price: 380,
                image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                category: 'non-veg',
                tags: ['Curries', 'Seafood', 'Coastal Andhra'],
                cook: getCook('Visakhapatnam'),
                ingredients: ['Rohu Fish', 'Tamarind', 'Fenugreek', 'Mustard Seeds', 'Curry Leaves'],
                healthBenefits: ['Omega-3 Fatty Acids', 'Lean Protein', 'Good for eyes'],
                nutritionalInfo: { calories: 300, protein: '22g', fats: '10g', carbs: '8g' },
                healthTips: 'Fish is easier to digest than red meat.',
                whyChooseThis: 'Cooked in mud vessel for 4 hours for depth of flavor.',
                deliveryTime: '45 min',
                rating: 4.9,
                reviewsCount: 112
            },
            {
                name: 'punugulu',
                description: 'Crispy deep-fried rice batter fritters served with peanut chutney and ginger chutney.',
                price: 120,
                image: 'http://localhost:5000/uploads/punugulu.jpg',
                category: 'veg',
                tags: ['Snacks', 'Andhra', 'Street Food'],
                cook: getCook('Vijayawada'),
                ingredients: ['Idli Batter', 'Onions', 'Green Chilies', 'Cumin'],
                healthBenefits: ['Fermented batter (Gut health)', 'Freshly made'],
                nutritionalInfo: { calories: 200, protein: '4g', fats: '8g', carbs: '30g' },
                healthTips: 'Enjoy as an evening snack with tea.',
                whyChooseThis: 'Crunchy outside, soft inside - served piping hot.',
                deliveryTime: '20-30 min',
                rating: 4.5,
                reviewsCount: 230
            },
            {
                name: 'Mirchi Bajji',
                description: 'Stuffed green chili fritters, a favorite street snack of Vijayawada.',
                price: 100,
                image: 'http://localhost:5000/uploads/mirchibajji.jpg',
                category: 'veg',
                tags: ['Snacks', 'Spicy', 'Vijayawada'],
                cook: getCook('Guntur'),
                ingredients: ['Green Chilies', 'Besan (Gram flour)', 'Carom seeds', 'Onions', 'Lemon'],
                healthBenefits: ['Metabolism booster (Chilies)', 'Gluten free batter'],
                nutritionalInfo: { calories: 180, protein: '5g', fats: '10g', carbs: '15g' },
                healthTips: 'Squeeze lemon to cut through the spice.',
                whyChooseThis: 'Using special less-spicy Bajji chilies.',
                deliveryTime: '20 min',
                rating: 4.8,
                reviewsCount: 195
            },
            {
                name: 'Pootharekulu',
                description: 'Paper-thin rice starch sheets stuffed with jaggery and ghee. A royal sweet from Atreyapuram.',
                price: 500,
                image: 'http://localhost:5000/uploads/putarekulu.jpg',
                category: 'veg',
                tags: ['Sweets', 'Traditional', 'Coastal Andhra'],
                cook: getCook('Vijayawada'),
                ingredients: ['Rice starch', 'Jaggery', 'Ghee', 'Cashews'],
                healthBenefits: ['Instant energy', 'Iron from Jaggery'],
                nutritionalInfo: { calories: 300, protein: '2g', fats: '10g', carbs: '50g' },
                healthTips: 'One piece is enough to satisfy cravings!',
                whyChooseThis: 'Authentic Atreyapuram recipe.',
                deliveryTime: '1 day',
                rating: 5.0,
                reviewsCount: 45
            }
        ];

        await Dish.insertMany(newDishes);
        console.log('Dishes seeded with expanded menu and diverse locations!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDishes();
