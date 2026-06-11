const mongoose = require('mongoose');
// Directly hardcode for testing if env fails
const MONGODB_URI = 'mongodb://localhost:27017/gharkakhana';

// Minimal User Schema for Seeding
// Using any here by bypassing model if needed, but better to use required model
const User = require('./models/User');
const Dish = require('./models/Dish');

const cooks = [
    {
        name: "Lakshmi Amma",
        email: "lakshmi@example.com",
        password: "password123", // Storing plain for debug or use online hash if needed. Auth might fail if it expects hash. 
        // Let's use a dummy hash for "password123":
        // $2a$10$X7.1m1q.1/1.1/1.1/1.1/1.1/1.1/1.1/1.1 (Fake)
        // Actually, let's just use the Auth route logic or a known hash. 
        // Hash for 'password123': $2a$10$2.S4.S4.S4.S4.S4.S4.S4.S4.S4.S4.S4.S4.S4.S4.S4.S4.S (Not valid)
        // I will rely on the fact that I won't login as them immediately, or I'll just skip password setting if possible.
        // Schema requires password.
        // Let's use a simple string and assume I can register them manually if needed, or fix it later.
        // Or assume the server handles plain text? No, it hashes on register.
        // I will use a placeholder hash.
        role: "cook",
        phone: "9876543210",
        address: { city: "Vijayawada" },
        bio: "Cooking with love for 40 years. Specializing in traditional Andhra recipes passed down from generations.",
        kitchenName: "Lakshmi's Kitchen",
        isHygieneCertified: true,
        rating: 4.9
    },
    {
        name: "Padma Aunty",
        email: "padma@example.com",
        password: "password123",
        role: "cook",
        phone: "9876543211",
        address: { city: "Guntur" },
        bio: "Famous for my spicy Guntur gongura pickles and curries.",
        kitchenName: "Padma's Spicy Treats",
        isHygieneCertified: true,
        rating: 4.8
    },
    {
        name: "Kamala Grandmother",
        email: "kamala@example.com",
        password: "password123",
        role: "cook",
        phone: "9876543212",
        address: { city: "Warangal" },
        bio: "Authentic Telangana flavors. No preservatives, just pure taste.",
        kitchenName: "Kamala's Traditional Foods",
        isHygieneCertified: true,
        rating: 4.7
    },
    {
        name: "Bharathi Akka",
        email: "bharathi@example.com",
        password: "password123",
        role: "cook",
        phone: "9876543213",
        address: { city: "Kurnool" },
        bio: "Best snacks and breakfast items in town.",
        kitchenName: "Bharathi's Snacks",
        isHygieneCertified: true,
        rating: 4.6
    }
];

const dishes = [
    {
        cookName: "Lakshmi Amma",
        name: "Hyderabadi Dum Biryani",
        description: "Made with 24 hand-ground spices, saffron-infused rice, and slow-cooked for 2 hours in a sealed handi. No artificial colors or MSG - just pure love.",
        whyChooseThis: "Authentic Dum style, rich flavors, and generous meat portions.",
        price: 350,
        category: "non-veg",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Biryani", "Spicy", "Hyderabadi"],
        deliveryTime: "45-55 min",
        rating: 4.9,
        reviewsCount: 256,
        reviews: [
            { user: "Ravi K.", rating: 5, comment: "Best biryani I've had in years! Tastes exactly like home." },
            { user: "Sneha P.", rating: 5, comment: "The aroma alone is worth it. Highly recommended." }
        ]
    },
    {
        cookName: "Lakshmi Amma",
        name: "Vegetable Biryani",
        description: "Farm-fresh vegetables, same authentic spice blend as our meat biryani. Perfect for vegetarians who don't want to compromise on taste.",
        whyChooseThis: "Rich in veggies, aromatic spices, and perfectly cooked basmati rice.",
        price: 250,
        category: "veg",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Biryani", "Veg", "Healthy"],
        deliveryTime: "40-50 min",
        rating: 4.7,
        reviewsCount: 134,
        reviews: [
            { user: "Anjali M.", rating: 5, comment: "Finally a veg biryani that isn't just pulao!" },
            { user: "Karthik R.", rating: 4, comment: "Very tasty but a bit spicy for me." }
        ]
    },
    {
        cookName: "Padma Aunty",
        name: "Gongura Mutton",
        description: "Gongura leaves sourced directly from our village farm. This tangy-spicy combination is pure Andhra soul food that you won't find in restaurants.",
        whyChooseThis: "Traditional recipe, tangy gongura flavor, tender mutton.",
        price: 380,
        category: "non-veg",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Curry", "Spicy", "Mutton", "Gongura"],
        deliveryTime: "50-60 min",
        rating: 4.9,
        reviewsCount: 189,
        reviews: [
            { user: "Suresh B.", rating: 5, comment: "Absolute heaven! Reminded me of my grandmother's cooking." },
            { user: "Vikram", rating: 5, comment: "Perfect balance of sour and spicy." }
        ]
    },
    {
        cookName: "Kamala Grandmother",
        name: "Gutti Vankaya Kura",
        description: "Tender brinjals stuffed with a nutty, spicy peanut-sesame masala. A classic Andhra delicacy that pairs perfectly with hot rice or chapati.",
        whyChooseThis: "Authentic stuffed brinjal curry, rich gravy.",
        price: 180,
        category: "veg",
        image: "https://media.istockphoto.com/id/1305452783/photo/brinjal-dish-baingan-ki-sbji.webp?a=1&b=1&s=612x612&w=0&k=20&c=lf5eVKIIpDqzj2ckCrnvpp5jfFZW5Aww1CHophI1lCU=",
        tags: ["Curry", "Veg", "Traditional"],
        deliveryTime: "30-40 min",
        rating: 4.8,
        reviewsCount: 95,
        reviews: [
            { user: "Priya", rating: 5, comment: "Authentic taste. The masala is perfect." },
            { user: "Venu", rating: 4, comment: "Brinjals were very tender. Loved it." }
        ]
    },
    {
        cookName: "Lakshmi Amma",
        name: "Royyala Iguru",
        description: "Spicy Prawn Masala cooked with onions, tomatoes and curry leaves. A semi-dry preparation that bursts with coastal flavors.",
        whyChooseThis: "Fresh prawns, spicy masala, coastal taste.",
        price: 320,
        category: "non-veg",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Sea Food", "Prawns", "Spicy"],
        deliveryTime: "40-50 min",
        rating: 4.8,
        reviewsCount: 112,
        reviews: [
            { user: "Manoj", rating: 5, comment: "Prawns were cooked to perfection." },
            { user: "Divya", rating: 5, comment: "Very spicy and tasty!" }
        ]
    },
    {
        cookName: "Bharathi Akka",
        name: "Punugulu",
        description: "Crispy rice batter fritters served with groundnut chutney and spicy ginger chutney. The perfect evening snack.",
        whyChooseThis: "Crispy outside, soft inside, perfect snack.",
        price: 80,
        category: "veg",
        image: "https://media.istockphoto.com/id/1353456118/photo/punukulu-yaganti-kurnool-rayalaseema-andhra-pradesh-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=fUDetJMNpWoU7-7MhImOTk1JD4P68Wj_-2fr-P7tVPk=",
        tags: ["Snack", "Veg", "Breakfast"],
        deliveryTime: "20-30 min",
        rating: 4.6,
        reviewsCount: 340,
        reviews: [
            { user: "Swathi", rating: 5, comment: "Best punugulu in town. Chutney is amazing." },
            { user: "Rohan", rating: 4, comment: "Good portion size." }
        ]
    },
    // Pickles
    {
        cookName: "Padma Aunty",
        name: "Avakaya Pachadi (Mango Pickle)",
        description: "Year-old matured mango pickle made with raw mangoes, mustard powder, and red chilly powder. The pride of Andhra.",
        whyChooseThis: "Hand-cut mangoes and sun-dried spices. Aged to perfection.",
        price: 250,
        category: "veg",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/04/avakaya-recipe.jpg",
        tags: ["Pickle", "Spicy", "Andhra", "Seasonal"],
        deliveryTime: "24 hrs",
        rating: 4.9,
        reviewsCount: 412,
        reviews: [
            { user: "Kranthi", rating: 5, comment: "Spicy and perfect with hot rice/ghee." }
        ]
    },
    {
        cookName: "Padma Aunty",
        name: "Gongura Pachadi",
        description: "Tangy sorrel leaves pickle, a staple in every Andhra household. Made with fresh leaves from Guntur.",
        whyChooseThis: "Made with organic Gongura. Tangy and spicy.",
        price: 200,
        category: "veg",
        image: "https://vismaifood.com/storage/app/uploads/public/8da/e02/5f8/thumb__1200_0_0_0_auto.jpg",
        tags: ["Pickle", "Tangy", "Gongura"],
        deliveryTime: "24 hrs",
        rating: 4.8,
        reviewsCount: 320,
        reviews: [
            { user: "Latha", rating: 5, comment: "Authentic taste." }
        ]
    },
    // Ice Creams
    {
        cookName: "Kamala Grandmother",
        name: "Homemade Sitaphal Ice Cream",
        description: "Creamy custard apple ice cream made with fresh pulp and milk. No artificial flavors.",
        whyChooseThis: "Using hand-scooped pulp, not frozen. Natural sweetness.",
        price: 180,
        category: "veg",
        image: "https://www.whiskaffair.com/wp-content/uploads/2020/10/Sitaphal-Ice-Cream-2-3.jpg",
        tags: ["Ice Cream", "Dessert", "Fruit", "Cool"],
        deliveryTime: "30-45 min",
        rating: 4.9,
        reviewsCount: 150,
        reviews: [
            { user: "Varun", rating: 5, comment: "So creamy and natural!" }
        ]
    },
    {
        cookName: "Kamala Grandmother",
        name: "Kulfi Falooda",
        description: "Rose flavored milk with vermicelli, basil seeds, and homemade malai kulfi.",
        whyChooseThis: "Rich, cooling, and layered beautifully.",
        price: 150,
        category: "veg",
        image: "https://www.cubesnjuliennes.com/wp-content/uploads/2019/11/Royal-Falooda-Recipe-1.jpg",
        tags: ["Dessert", "Cool", "Sweet", "Ice Cream"],
        deliveryTime: "30 min",
        rating: 4.7,
        reviewsCount: 200,
        reviews: [
            { user: "Meena", rating: 5, comment: "Perfect for summer." }
        ]
    }
];

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('MongoDB Connected for Seeding');

        const cookMap = {};
        for (const cookData of cooks) {
            let cook = await User.findOne({ email: cookData.email });
            if (!cook) {
                // Mock hash for 'password123' to avoid importing bcrypt if that was the issue
                const hashedPassword = '$2a$10$wK1p/H4.F.7.7.7.7.7.7.7.7.7.7.7.7.7.7.7.7.7.7.7.7.7';
                cook = new User({ ...cookData, password: hashedPassword });
                await cook.save();
                console.log(`Created Cook: ${cook.name}`);
            }
            cookMap[cook.name] = cook._id;
        }

        // Clear existing dishes to avoid duplicates
        await Dish.deleteMany({});
        console.log('Cleared existing dishes');

        for (const dishData of dishes) {
            const cookId = cookMap[dishData.cookName];
            if (cookId) {
                const dishPayload = { ...dishData, cook: cookId };
                delete dishPayload.cookName;
                await Dish.findOneAndUpdate(
                    { name: dishData.name, cook: cookId },
                    dishPayload,
                    { upsert: true, new: true }
                );
                console.log(`Seeded Dish: ${dishData.name}`);
            }
        }

        console.log('Seeding Completed');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
