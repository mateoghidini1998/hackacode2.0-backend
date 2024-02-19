const { faker } = require('@faker-js/faker/locale/en');
const sequelize = require('./config/db');
const bcrypt = require('bcryptjs');
const Employee = require('./models/Employee.model');
const Customer = require('./models/Customer.model');
const User = require('./models/User.model');

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

    
    await Employee.bulkCreate(employees);
    await Customer.bulkCreate(customers);

}

seedDatabase();