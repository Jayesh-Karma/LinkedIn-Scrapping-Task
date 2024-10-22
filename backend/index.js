const express = require("express");
const userModel = require("./userModel");
const connect = require("./databaseConfig");
const app = express();
const cors = require("cors")
const puppeteer = require("puppeteer")

app.use(express.json());
app.use(cors({
    origin: 'chrome-extension://fojkckhldlkgolckjmfeigokioalkjkc', 
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}));
connect(); // database connection


app.get("/", async(req,res) =>{
    res.send("Server is running");
})

// post method
app.post("/save-data", async(req, res) => {
    const { profiles } = req.body;

    try {
        const browser = await puppeteer.launch({ headless: false });
        
        const page = await browser.newPage()
        setTimeout(() => {}, 2000)

        for (let profile of profiles) {
            setTimeout(() => {}, 2000)
            await page.goto(profile);
            
            setTimeout(() => {}, 5000)
            // Scrape the data from the LinkedIn profile
            const profileData = await page.evaluate(() => {
                const getText = (selector) => document.querySelector(selector)?.innerText || "N/A";

                return {
                    name: getText('.top-card-layout__title'),
                    url: window.location.href,
                    about: getText('.core-section-container__content'),
                    location: getText('.not-first-middot'),
                 
                };
            });

            console.log('Scraped Profile Data:', profileData);

            await userModel.create(profileData);
        }

        await browser.close();
        res.json({ message: 'Scraping completed successfully' });
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ error: 'Scraping failed' });
    }

})


const port = 4000;
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})