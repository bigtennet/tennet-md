const axios = require('axios');

const API_BASE = 'https://tennet-md.pxxl.click';

async function testAPIs() {
    console.log('🧪 Testing TENNET-MD API Endpoints...\n');

    try {
        // Test Health Check
        console.log('1. Testing Health Check...');
        const healthResponse = await axios.get(`${API_BASE}/api/health`);
        console.log('✅ Health Check:', JSON.stringify(healthResponse.data, null, 2));
        console.log('');

        // Test Bot Info
        console.log('2. Testing Bot Info...');
        const infoResponse = await axios.get(`${API_BASE}/api/info`);
        console.log('✅ Bot Info:', JSON.stringify(infoResponse.data, null, 2));
        console.log('');

        // Test Pairing Code (Simple)
        console.log('3. Testing Simple Pairing Code...');
        const codeResponse = await axios.get(`${API_BASE}/api/code?number=2347078379027`);
        console.log('✅ Simple Code:', JSON.stringify(codeResponse.data, null, 2));
        console.log('');

        // Test Pairing Code (Detailed)
        console.log('4. Testing Detailed Pairing Code...');
        const detailedCodeResponse = await axios.get(`${API_BASE}/api/pairing-code?number=2347078379027`);
        console.log('✅ Detailed Code:', JSON.stringify(detailedCodeResponse.data, null, 2));
        console.log('');

        console.log('🎉 All API tests passed successfully!');
        console.log('\n📋 Integration Examples:');
        console.log('JavaScript:');
        console.log(`const response = await fetch('${API_BASE}/api/code?number=2347078379027');`);
        console.log('const data = await response.json();');
        console.log('console.log(data.code); // Your pairing code');
        console.log('');
        console.log('PHP:');
        console.log(`$response = file_get_contents('${API_BASE}/api/code?number=2347078379027');`);
        console.log('$data = json_decode($response, true);');
        console.log('echo $data["code"]; // Your pairing code');

    } catch (error) {
        console.error('❌ API Test Failed:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }
}

// Run the tests
testAPIs();
