const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

const campgroundImages = require('./images');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 30; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const random20 = Math.floor(Math.random() * 14);
        const randomPrice = Math.floor(Math.random() * 20) + 20;
        const camp = new Campground({
            author : '612ac10f6ab6c31480b1e537',
            title: `${sample(descriptors)} ${sample(places)}`,
            price: randomPrice,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing mmodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum ollit anim id est laborum.',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: campgroundImages[random20].URL,
                    filename: campgroundImages[random20].fileName
                },
                {
                    url: campgroundImages[random20].URL,
                    filename: campgroundImages[random20].fileName
                }

            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});


