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