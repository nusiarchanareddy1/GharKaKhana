const http = require('http');

http.get('http://localhost:5000/api/dishes', (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                const dish = parsedData[0];
                console.log('Dish name:', dish.name);
                console.log('Cook name:', dish.cook?.name);
                console.log('Cook address:', JSON.stringify(dish.cook?.address, null, 2));
            } else {
                console.log('No dishes found or invalid format.');
            }
        } catch (e) {
            console.error('Parse error:', e.message);
        }
    });
}).on('error', (e) => {
    console.error('Request error:', e.message);
});
