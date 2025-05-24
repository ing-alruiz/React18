import apiConfig from './apiConfig';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchData = async (apiObject, body = null, retries = 3, delayMs = 1000) => {
    const { endpoint, method } = apiObject;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const options = {
                method,
                headers: apiConfig.headers,
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(`${apiConfig.baseURL}${endpoint}`, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);

            if (attempt < retries) {
                console.log(`Retrying in ${delayMs}ms...`);
                await delay(delayMs);
            } else {
                console.error('All attempts failed.');
                throw error;
            }
        }
    }
};

// Helper to hash a string using SHA-256 and return hex
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export const loginUser = async (identifier, password) => {
    const hashedPassword = await hashPassword(password);
    // Fetch all users (for demo; in real apps, use backend filtering)
    const response = await fetch(`${apiConfig.baseURL}/users`);
    const users = await response.json();
    // Find user by email or username and compare hashed password
    const user = users.find(
        u =>
            (u.email === identifier || u.username === identifier || u.name === identifier) &&
            u.password === hashedPassword
    );
    return user || null;
};
export const registerUser = async (userData) => {
    // Hash the password before sending
    const hashedPassword = await hashPassword(userData.password);
    const response = await fetch(`${apiConfig.baseURL}/users`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({ ...userData, password: hashedPassword }),
    });
    if (!response.ok) throw new Error('Registration failed');
    return await response.json();
};