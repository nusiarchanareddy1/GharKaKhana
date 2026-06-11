const axios = require('axios');

const checkDishes = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/dishes');
        console.log(`Total dishes returned: ${res.data.length}`);
        res.data.forEach((dish, i) => {
            console.log(`\nDish ${i + 1}: ${dish.name}`);
            console.log(`City: ${dish.cook?.address?.city || 'MISSING'}`);
            console.log(`Cook Name: ${dish.cook?.name || 'MISSING'}`);
        });
    } catch (err) {
        console.error('Error fetching dishes:', err.message);
    }
};

checkDishes();
