const { faker } = require('@faker-js/faker/locale/en');
const Service = require('../models/Service.model');
'use strict';

function memoizeUnique(callback) {
 let store = {};
 return function(...args) {
    let result;
    do {
      result = callback(...args);
      const key = JSON.stringify(args) + JSON.stringify(result);
      if (!store.hasOwnProperty(key)) {
        store[key] = result;
        break;
      }
    } while (true);
    return result;
 };
}

const services = [
 { 
  name: "Plane ticket to Miami",
   description: "Plane ticket to Miami through LATAM"
 },
 {
  name: "2-day Stay in Faena Buenos Aires",
  description: "Two day stay with all meals included"
 },
 { 
  name: "Car Rental",
  description: "Toyota Car Rental"
 },
 { 
  name: "1 Week stay at Grand Oasis Cancun All Inclusive",
  description: "Grand Oasis Cancun All Inclusive"
 },
 { 
  name: "1 Week stay at Four Seasons Buenos Aires",
  description: "Includes all breakfasts"
 },
 { 
  name: "1 Week stay at Wyndham Buenos Aires",
  description: "All inclusive stay"
 },
 { 
  name: "Plane ticket to Boston",
  description: "Plane ticket to Bostom through LATAM"
 },
 { 
  name: "Plane ticket to Cordoba",
  description: "Plane ticket to Cordoba through Aerolineas Argentina"
 },
 { 
  name: "Plane ticket to Buenos Aires",
  description: "Plane ticket to Buenos Aires through Aerolineas Argentina"
 },
 { 
  name: "Disneyland Ticket",
  description: "Orlando - Disneyland Ticket"
 },
 {
  name: "Universal Ticket",
  description: "Orlando - Universal Ticket"
 },
 {
  name: "Wet & Wild Ticket",
  description: "Orlando - Wet & Wild Ticket"
 },
 {
  name: "Plane ticket to Moscu",
  description: "Plane ticket to Moscu through Iberia"
 },
 {
  name: "Buenos Aires City Tour Ticket", 
  description: "Civtatis city tour"
 },
]

const uniqueUuid = memoizeUnique(faker.string.uuid);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Services', null, {});

    for(var i = 0; i < services.length; i++){
      const service = await Service.create({
        service_code: uniqueUuid(),
        name: services[i].name,
        description: services[i].description,
        price: faker.commerce.price(),
        service_date: faker.date.future()
      })
    }

 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
 }
};
