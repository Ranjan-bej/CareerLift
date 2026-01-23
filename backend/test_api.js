const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
    console.log('Starting API Tests...');

    // 1. Register User
    console.log('\n--- Testing Registration ---');
    const user = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
    };
    try {
        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        const regData = await regRes.json();
        console.log('Registration Status:', regRes.status);
        console.log('Registration Response:', regData);

        if (regRes.status !== 201) throw new Error('Registration failed');

        // 2. Login User
        console.log('\n--- Testing Login ---');
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, password: user.password })
        });
        const loginData = await loginRes.json();
        console.log('Login Status:', loginRes.status);
        console.log('Login Token Present:', !!loginData.token);

        if (loginRes.status !== 200) throw new Error('Login failed');

        // 3. Fetch Jobs
        console.log('\n--- Testing Fetch Jobs ---');
        const jobsRes = await fetch(`${BASE_URL}/jobs`);
        const jobsData = await jobsRes.json();
        console.log('Jobs Status:', jobsRes.status);
        console.log('Number of Jobs:', jobsData.length);

        if (jobsRes.status !== 200) throw new Error('Fetch jobs failed');

        // 4. Test Job Filtering
        console.log('\n--- Testing Job Filtering (Software Engineer) ---');
        const searchRes = await fetch(`${BASE_URL}/jobs?title=Software`);
        const searchData = await searchRes.json();
        console.log('Filtered Jobs Count:', searchData.length);
        if (searchData.length > 0) {
            console.log('First result title:', searchData[0].title);
        }

        console.log('\nAll Tests Passed!');

    } catch (error) {
        console.error('\nTest Failed:', error.message);
    }
}

// Check if fetch is available (Node 18+)
if (!globalThis.fetch) {
    console.error('This script requires Node.js v18+ or a fetch polyfill.');
} else {
    runTests();
}
