chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startScraping') {
        // Make a request to your Node.js server to trigger Puppeteer scraping
        fetch('http://localhost:4000/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                profiles: [
                    "https://www.linkedin.com/in/jayesh-karma-3a65b0229"
                ]
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Scraping started:', data);
            sendResponse({ success: true });
        })
        .catch(error => {
            console.error('Error starting scraping:', error);
            sendResponse({ success: false, error });
        });

        // Return true to keep the message channel open for async response
        return true;
    }
});
