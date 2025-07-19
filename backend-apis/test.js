const axios = require('axios');


const API_URL = 'http://localhost:3000/api/mint';


const to = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const amount = '1000';

async function testMint() {
    try {
        const response = await axios.post(API_URL, { to, amount });
        console.log('Success:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('API Error:', error.response.data);
        } else {
            console.error('Request Error:', error.message);
        }
    }
}

testMint();