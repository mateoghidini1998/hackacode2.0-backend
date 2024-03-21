# using npm

npx sequelize-cli db:migrate

# seed

npx sequelize-cli db:seed:all

# create container

docker run -d --name backend-container -p 5000:5000 --link hackacode2.0:mysql backend-app
