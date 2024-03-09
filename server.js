const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser');
const User = require('./models/User.model');
const Employee = require('./models/Employee.model');
const Customer = require('./models/Customer.model');
const Sale = require('./models/Sale.model');
const Service = require('./models/Service.model');


const app = express();
//CORS
app.use(cors());

//Body parser
app.use(express.json({ extended:false }));

//Cookie parser
app.use(cookieParser());

//Route files
const auth = require('./routes/auth');
const employees = require('./routes/employees');

//Define routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/employees', employees);


//Sequelize connection to DB
sequelize.authenticate()
 .then(() => {
   console.log('Connection to DB successfully stablished.');
 })
 .catch(err => {
   console.error('Erro while trying to connect to DB:', err);
 });

sequelize.sync()

/*  sequelize.query('SET FOREIGN_KEY_CHECKS =  0')
 .then(() => sequelize.sync({ force: true }))
 .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS =  1'))
 .then(() => console.log('Database synchronized.'))
 .catch(error => console.error('Error while synchronizing table:', error)); */




app.get('/', (req, res) => res.send('API Running'));

// Load env variables
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});