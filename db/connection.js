const Sequelize = require("sequelize");

// Option 1: Passing parameters separately

// var PropertiesReader = require("properties-reader");
// var properties = PropertiesReader("./db/config.properties");

const sequelize = new Sequelize("aulo", "admin", "12qw3e", {
    host: "localhost",
    dialect: "mariadb",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;