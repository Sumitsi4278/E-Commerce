const mongoose = require('mongoose');
const Product = require('./models/product');


mongoose.connect('mongodb+srv://test124:test124@cluster0.dux00uw.mongodb.net/?retryWrites=true&w=majority')
    .then(() => { console.log('DB connected!') })
    .catch(e => console.log(e));

const dummy_products = [
    {
        name: 'Iphone 15',
        img: 'https://images.unsplash.com/photo-1695048132790-baebe5b7e975?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        price: 300,
        desc: 'The iPhone 15 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc.'
    },

    {
        name: 'MacBook Pro',
        img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price: 700,
        desc: 'Mac Pro is a series of workstations and servers for professionals made by Apple Inc. since 2006. The Mac Pro, by some performance benchmarks, is the most powerful computer that Apple offers.'
    },

    {
        name: 'Nike Air Force 1',
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price: 50,
        desc: 'he best selling shoes ever made by Nike are the Air Force 1, approximately 10 million pairs are sold around the world in a year.'
    },

    {
        name: 'Galaxy watch 6',
        img: 'https://images.unsplash.com/photo-1680113727062-8a118574b782?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhbGF4eSUyMHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price: 50,
        desc: 'es, the Samsung Galaxy Watch 6 Classic is waterproof, as well as dustproof, sporting an IP68 resistance rating.',
    },

    {
        name: 'Apple Watch Series 7',
        img: 'https://images.unsplash.com/photo-1653407814551-16370b2d18b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QXBwbGUlMjBXYXRjaCUyMFNlcmllcyUyMDd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price: 99,
        desc: 'Apple Watch Series 7 features the largest, most advanced display yet, breakthrough health innovations, and is the most durable Apple Watch ever.',
    },

    {
        name: 'Apple TV',
        img: 'https://images.unsplash.com/photo-1621685950846-9323d993bbf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXBwbGUlMjBUVnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price: 119,
        desc: 'Browse all movies, TV shows, and more from Apple TV+. Watch all Apple Originals here and on the Apple TV app across your devices.',
    },

    {
        name: 'Canon camera',
        img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price: 119,
        desc: 'Browse all movies, TV shows, and more from Apple TV+. Watch all Apple Originals here and on the Apple TV app across your devices.',
    }
];

async function seedDB(){
    await Product.deleteMany({});
    await Product.insertMany(dummy_products);
    console.log('DB successfully seeded..!')
}

seedDB();