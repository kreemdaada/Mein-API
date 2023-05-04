const express = require ('express');
const rp = require('request-promise');


const app = express();
const PORT = process.env.PORT || 5000; 

const generateSraperUrl = (apikey) =>`http://api.scraperapi.com?api_key=${apikey}&autoparse-true`;

app.use(express.json());

app.get('/',(req,res) => {
    res.send('Welcome to Scraper API');
});

// GET product Details
app.get('/products/:productId',async (req,res)=>{
    const {productId} =  req.params; // um products id zu holen
    const {apikey}= req.query;
    try {
        const response = await request(`${generateSraperUrl(apikey)}&url=https://www.amazon.com/dp/${productId}`);
        console.log('response:', response);
        res.json(json.parse(response));
    } catch (error) {
        res.json(error);
    }
});


// GET product Reviews
app.get('/products/:productId/reviews',async (req,res)=>{
    const {productId} =  req.params; // um products id zu holen
    const {apikey}= req.query;
    try {
        const response = await request(`${generateSraperUrl(apikey)}&url=https://www.amazon.com/product-reviews/${productId}`);
        console.log('response:', response);
        res.json(json.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// GET product Offers
app.get('/products/:productId/offers',async (req,res)=>{
    const {productId} =  req.params; // um products id zu holen
    const {apikey}= req.query;
    try {
        const response = await request(`${generateSraperUrl(apikey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        console.log('response:', response);
        res.json(json.parse(response));
    } catch (error) {
        res.json(error);
    }
});



//implemting search querry // modifi the request s?k=${apikey}
// GET product search
app.get('/search/:searchQuery',async (req,res)=>{
    const {searchQuery} =  req.params; // um products id zu holen
    const {apikey}= req.query;
    try {
        const response = await request(`${generateSraperUrl(apikey)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        console.log('response:', response);
        res.json(json.parse(response));
    } catch (error) {
        res.json(error);
    }
});


app.listen(PORT,()=>console.log(`Server Running on Port ${PORT}`));
