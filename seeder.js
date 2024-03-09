const { faker } = require('@faker-js/faker/locale/en');
const sequelize = require('./config/db');
const bcrypt = require('bcryptjs');
const Employee = require('./models/Employee.model');
const Customer = require('./models/Customer.model');
const User = require('./models/User.model');
const Sale = require('./models/Sale.model');
const Service = require('./models/Service.model');
const SaleService = require('./models/Sale_Services.model');

function generateDni(){
    const dni = faker.string.numeric(8);
    return dni;
}

async function seedDatabase(){

    //Deactivate Foreing Keys
    await sequelize.query('SET FOREIGN_KEY_CHECKS=0;');

    //Truncate tables
    await User.destroy({ where: {}, truncate: true });
    await Employee.destroy({ where: {}, truncate: true });
    await Customer.destroy({ where: {}, truncate: true });
    await Sale.destroy({ where: {}, truncate: true });
    await Service.destroy({ where: {}, truncate: true });

    // Reactivate Foreign Keys
    await sequelize.query('SET FOREIGN_KEY_CHECKS=1;');

    const users = await Promise.all(Array.from({length:   10}, async () => {
        const password = '123456';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return {
            email: faker.internet.email().toLowerCase(),
            password: hashedPassword,
        };
    }));

    const seededUsers = await User.bulkCreate(users);
    

    const employees = seededUsers.map( (user, index ) => ({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        birthdate: faker.date.past(),
        country: faker.location.country(),
        dni: generateDni(),
        position: faker.person.jobTitle(),
        salary: faker.string.numeric(4),
        user_id: user.id
    }));

    const customers = Array.from({length: 10}, () => ({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        birthdate: faker.date.past(),
        country: faker.location.country(),
        dni: generateDni(),
    }));

    const servicesItems = ['Hotel Room', 'Flight', 'Car Rental', 'Ski Passes'];

    const services = servicesItems.map(item => ({
        name: item,
    }));

    const sales = Array.from({length: 10}, () => ({
        customer_id: faker.number.int({min: 1, max: 10}),
        employee_id: faker.number.int({min: 1, max: 10}),
    }));


    await Employee.bulkCreate(employees);
    await Customer.bulkCreate(customers);
    await Service.bulkCreate(services);
    await Sale.bulkCreate(sales);

    const savedSales = await Sale.findAll();
    const savedServices = await Service.findAll();

    await Promise.all(savedSales.map(async (sale) => {
        const numServices = faker.number.int({ min: 1, max: 3 });
        const selectedServices = faker.helpers.shuffle(savedServices).slice(0, numServices);

        // Crear registros en la tabla intermedia Sale_Services
        await Promise.all(selectedServices.map(async (service) => {
            await SaleService.create({
                sale_id: sale.id,
                service_id: service.id,
            });
        }));
    }));
}

seedDatabase();