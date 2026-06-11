const http = require('http');
const fs = require('fs');

http.get('http://localhost:5000/api/dishes', (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            fs.writeFileSync('api_dump.json', JSON.stringify(parsedData, null, 2));
            console.log('Dumped to api_dump.json');
        } catch (e) {
            console.error('Parse error:', e.message);
        }
    });
}).on('error', (e) => {
    console.error('Request error:', e.message);
});
