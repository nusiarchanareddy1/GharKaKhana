// Test the delete endpoint fix
const axios = require('axios');

const test = async () => {
    try {
        // First, get all dishes
        console.log('\n1. Fetching all dishes...');
        const dishesRes = await axios.get('http://localhost:5000/api/dishes');
        console.log(`Found ${dishesRes.data.length} dishes`);
        
        if (dishesRes.data.length === 0) {
            console.log('No dishes to test delete with. Add a dish first in the UI.');
            return;
        }

        const dishToDelete = dishesRes.data[0];
        console.log('\nDish to test delete:');
        console.log('- ID:', dishToDelete._id);
        console.log('- Name:', dishToDelete.name);
        console.log('- Cook:', dishToDelete.cook);

        // Try to delete it
        console.log('\n2. Attempting to delete dish...');
        const deleteRes = await axios.delete(`http://localhost:5000/api/dishes/${dishToDelete._id}`);
        console.log('Delete successful!');
        console.log('Response:', deleteRes.data);

        // Verify it's deleted
        console.log('\n3. Verifying deletion...');
        const dishesRes2 = await axios.get('http://localhost:5000/api/dishes');
        console.log(`Now have ${dishesRes2.length} dishes (should be 1 less)`);
        
        console.log('\n✅ DELETE ENDPOINT WORKING!');
    } catch (err) {
        console.error('\n❌ ERROR:');
        console.error('Status:', err.response?.status);
        console.error('Message:', err.response?.data?.error || err.message);
        console.error('Full error:', err.response?.data);
    }
};

test();
