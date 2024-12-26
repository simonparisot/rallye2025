const https = require('https');

exports.handler = async (event) => {
    // Log the received event
    console.log('Received event:', event);

    // Get the term from query parameters
    const term = event.queryStringParameters && event.queryStringParameters.term;

    console.log('Testing:', term);

    const url = `https://tinyurl.com/RH2025-${term}`;

    console.log('Testing:', url);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 404) {
                resolve({
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ error: 'Not found' }),
                });
            } else {
                resolve({
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url }),
                });
            }
        }).on('error', (e) => {
            reject({
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ error: e.message }),
            });
        });
    });
};