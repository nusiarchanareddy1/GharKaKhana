const axios = require('axios');
const fs = require('fs');

const verifyAPI = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/dishes');
        fs.writeFileSync('api_response.json', JSON.stringify(res.data, null, 2));
        console.log('API response saved to api_response.json');

        const firstDish = res.data[0];
        console.log(`\nSample Dish: ${firstDish.name}`);
        console.log(`Cook Object keys: ${Object.keys(firstDish.cook || {}).join(', ')}`);
        console.log(`Address Object: ${JSON.stringify(firstDish.cook?.address || 'MISSING')}`);
    } catch (err) {
        console.error('API Error:', err.message);
    }
};

verifyAPI();
