# hackacode2.0-backend

This project is the API for the backend of the TodoCode Hackacode Project. This project constist in a Booking Management System for Sales. 

## Requirements

-  "node": "^14.17.0 || ^16.13.0 || >=18.0.0",
-  "npm": ">=6.14.13"

## Setup

1 - After cloning the reposirtory, change your directory to the correct path of the project in your terminal

```
cd <your_path>/hackacode2.0-backend
``` 

2 - Install dependencies and packages by running:

```
npm install
```

or

```
yarn add
```

3 - Add a config folder in the root of the proyect with the following files and structure:

config.env

```
PORT=5000
NODE_ENV=development
JWT_SECRET=secreteKey
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```

config.json

```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "hackacode2.0",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

db.js

```
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'hackacode2.0',
 'root',
 '',
 {
   host: 'localhost',
   dialect: 'mysql',
   logging: console.log,
   insecureAuth: true 
 }
);

module.exports = sequelize;
```

### Seeders and migrations:

1 - Run migrations:

```
# using npm
npx sequelize-cli db:migrate
# using yarn
yarn sequelize-cli db:migrate
```

2 - Running seeders:

```
# using npm
npx sequelize-cli db:seed:all
# using yarn
yarn sequelize-cli db:seed:all
```

### Run server

```
npm run dev
```

###Authentication

After running the seeders you can get any email from the users table to try and login with a password '123456'
